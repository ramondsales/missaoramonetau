"use client";
import { useRef, useState } from "react";
const ways = ["Orando por nossa família", "Recebendo notícias e atualizações", "Conversando sobre parceria financeira", "Conectando nossa história com minha igreja", "Quero apenas conhecer melhor nossa história", "Outro"];
const input = "w-full rounded-sm border border-ink/25 bg-white px-3 py-3 text-base focus:border-denim";
function Field({ n, label, type = "text", opt, error }: { n: string; label: string; type?: string; opt?: boolean; error?: string }) {
  return (<label className="block"><span className="mb-1 block text-sm">{label}{opt && " (opcional)"}</span>
    <input name={n} type={type} className={input} aria-invalid={!!error} aria-describedby={error ? `${n}-e` : undefined} />
    {error && <span id={`${n}-e`} className="mt-1 block text-sm text-red-700">{error}</span>}</label>);
}
export default function LeadForm({ kind }: { kind: "partner" | "news" }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t0 = useRef(Date.now());
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(f.entries());
    data.ways = f.getAll("ways"); data.kind = kind; data.elapsed = Date.now() - t0.current;
    const er: Record<string, string> = {};
    if (String(data.name ?? "").trim().length < 2) er.name = "Informe seu nome.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.email ?? ""))) er.email = "Informe um e-mail válido.";
    if (kind === "partner") {
      if (String(data.whatsapp ?? "").replace(/\D/g, "").length < 10) er.whatsapp = "Informe o WhatsApp com DDD.";
      if (String(data.city ?? "").trim().length < 2) er.city = "Informe cidade e estado.";
    }
    setErrors(er); if (Object.keys(er).length) return;
    setState("loading");
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json();
      if (!r.ok) { setErrors(j.errors ?? { form: "Não foi possível enviar agora. Tente novamente." }); setState("idle"); return; }
      setState("done");
    } catch { setErrors({ form: "Sem conexão. Tente novamente em instantes." }); setState("idle"); }
  }
  if (state === "done") return <p role="status" className="rounded-sm bg-sand p-6 font-serif text-xl">Obrigado por entrar em contato. Recebemos sua mensagem e entraremos em contato em breve.</p>;
  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
      <Field n="name" label="Nome" error={errors.name} /><Field n="email" label="E-mail" type="email" error={errors.email} />
      {kind === "partner" && <>
        <Field n="whatsapp" label="WhatsApp" type="tel" error={errors.whatsapp} /><Field n="city" label="Cidade/Estado" error={errors.city} />
        <Field n="church" label="Igreja ou comunidade" opt /><Field n="source" label="Como você conheceu nossa história?" opt />
        <fieldset><legend className="mb-2 text-sm">Como gostaria de caminhar conosco?</legend>
          {ways.map(w => <label key={w} className="flex items-center gap-3 py-1.5"><input type="checkbox" name="ways" value={w} className="size-5 accent-moss" />{w}</label>)}</fieldset>
        <label className="block"><span className="mb-1 block text-sm">Conte um pouco mais</span><textarea name="message" rows={4} className={input} /></label></>}
      {errors.form && <p role="alert" className="text-red-700">{errors.form}</p>}
      <button disabled={state === "loading"} className="rounded-full bg-moss px-7 py-3.5 text-paper disabled:opacity-60">
        {state === "loading" ? "Enviando…" : kind === "partner" ? "Quero conversar" : "Quero receber notícias"}</button>
    </form>);
}
