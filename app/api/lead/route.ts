import { NextResponse } from "next/server";
const hits = new Map<string, number[]>(); // rate limit simples em memória (troque por Upstash/Vercel KV em escala)
const s = (v: unknown, max = 2000) => String(v ?? "").trim().slice(0, max);
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now(); const recent = (hits.get(ip) ?? []).filter(t => now - t < 600_000);
  if (recent.length >= 5) return NextResponse.json({ errors: { form: "Muitas tentativas. Aguarde alguns minutos." } }, { status: 429 });
  hits.set(ip, [...recent, now]);
  let b: Record<string, unknown>; try { b = await req.json(); } catch { return NextResponse.json({ errors: { form: "Requisição inválida." } }, { status: 400 }); }
  if (b.company || Number(b.elapsed) < 2500) return NextResponse.json({ ok: true }); // honeypot/tempo: finge sucesso para bots
  const kind = b.kind === "news" ? "news" : "partner"; const errors: Record<string, string> = {};
  const lead = { kind, name: s(b.name, 120), email: s(b.email, 160), whatsapp: s(b.whatsapp, 30), city: s(b.city, 120), church: s(b.church, 160),
    source: s(b.source, 300), ways: Array.isArray(b.ways) ? b.ways.map(x => s(x, 100)).slice(0, 6) : [], message: s(b.message), at: new Date().toISOString() };
  if (lead.name.length < 2) errors.name = "Informe seu nome.";
  if (!/^\S+@\S+\.\S+$/.test(lead.email)) errors.email = "Informe um e-mail válido.";
  if (kind === "partner") { if (lead.whatsapp.replace(/\D/g, "").length < 10) errors.whatsapp = "Informe o WhatsApp com DDD."; if (lead.city.length < 2) errors.city = "Informe cidade e estado."; }
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });
  try { await deliver(lead); } catch (e) { console.error("lead delivery failed", e); return NextResponse.json({ errors: { form: "Não foi possível enviar agora. Tente novamente." } }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}
// ---- Adaptadores: ative por variável de ambiente (chaves ficam só no servidor) ----
async function deliver(lead: Record<string, unknown>) {
  const jobs: Promise<Response>[] = [];
  const { RESEND_API_KEY: rk, LEAD_TO_EMAIL: to, LEAD_FROM_EMAIL: from, FORMSPREE_URL: fs, LEAD_WEBHOOK_URL: wh } = process.env;
  if (rk && to) jobs.push(fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${rk}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: from ?? "onboarding@resend.dev", to, reply_to: lead.email, subject: `Novo contato (${lead.kind}): ${lead.name}`,
      text: Object.entries(lead).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("\n") }) }));
  if (fs) jobs.push(fetch(fs, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(lead) }));
  if (wh) jobs.push(fetch(wh, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) }));
  if (!jobs.length) { console.log("[lead] nenhum destino configurado:", lead); return; }
  const res = await Promise.all(jobs);
  if (res.some(r => !r.ok)) throw new Error("provider error");
}
