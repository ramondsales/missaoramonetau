import Image from "next/image";
import { site, photos, hero, historia, igreja, parceria, verse, pix } from "@/lib/content";
import Video from "@/components/Video";
import CopyPix from "@/components/CopyPix";
const nav = [["Nossa história", "#historia"], ["A igreja", "#igreja"], ["Parceria", "#parceria"], ["Pix", "#pix"]];
const wrap = "mx-auto max-w-6xl px-6";
const btn = "inline-block rounded-full px-7 py-3.5 text-center";
const h2 = "font-serif text-3xl leading-tight md:text-5xl";
const body = "text-lg leading-relaxed";
function Rich({ t }: { t: string }) {
  return <>{t.split("**").map((p, i) => (i % 2 ? <strong key={i} className="bg-hl px-1 font-semibold text-ink [box-decoration-break:clone]">{p}</strong> : p))}</>;
}
function Paras({ items, className = "" }: { items: string[]; className?: string }) {
  return <div className={`space-y-5 ${body} ${className}`}>{items.map(p => <p key={p.slice(0, 30)}><Rich t={p} /></p>)}</div>;
}
export default function Home() {
  const links = [["Instagram", site.instagram], ["WhatsApp", site.whatsapp], ["E-mail", site.email && `mailto:${site.email}`], ["YouTube", site.youtube]].filter(l => l[1]);
  return (<>
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className={`${wrap} flex h-16 items-center justify-between`}>
        <a href="#topo" className="font-serif text-lg">Ramon &amp; Tau</a>
        <nav aria-label="Principal" className="hidden gap-7 text-sm md:flex">{nav.map(([l, h]) => <a key={h} href={h} className="hover:underline">{l}</a>)}</nav>
        <a href="#parceria" className="rounded-full bg-moss px-4 py-2 text-sm text-paper">Quero caminhar com vocês</a>
      </div>
    </header>
    <main id="topo">
      <section className="bg-moss text-paper">
        <div className={`${wrap} grid items-center gap-10 py-14 md:grid-cols-2 md:py-24`}>
          <div className="hero-in">
            <p className="mb-4 text-paper/75">{hero.doc}</p>
            <h1 className="font-serif text-4xl leading-[1.1] md:text-6xl">{hero.title[0]}<br />{hero.title[1]}</h1>
            <p className={`mt-6 max-w-xl text-paper/85 ${body}`}>{hero.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#parceria" className={`${btn} bg-paper text-moss`}>Quero caminhar com vocês</a>
              <a href="#historia" className={`${btn} border border-paper/50`}>Conheça nossa história</a></div>
          </div>
          <Image src={photos.family.src} alt={photos.family.alt} width={1200} height={1600} priority sizes="(min-width:768px) 45vw, 100vw" className="max-h-[75vh] w-full rounded-sm object-cover object-top" />
        </div>
      </section>

      <section className="bg-sand py-16 md:py-24">
        <div className={`${wrap} max-w-4xl`}><h2 className={`${h2} mb-8`}>Deixe-nos contar essa história</h2><Video url={site.videoUrl} /></div>
      </section>

      <section id="historia" className={`${wrap} grid gap-12 py-20 md:grid-cols-2 md:py-28`}>
        <div><h2 className={h2}>{historia.title}</h2>
          <p className="mt-3 font-serif text-2xl text-moss">{historia.subtitle}</p>
          <Paras items={historia.paragraphs} className="mt-8" /></div>
        <Image src={photos.family.src} alt={photos.family.alt} width={1200} height={1600} loading="lazy" sizes="(min-width:768px) 45vw, 100vw" className="max-h-[640px] w-full rounded-sm object-cover object-top" />
      </section>

      <section id="igreja" className="bg-sand py-20 md:py-28">
        <div className={wrap}>
          <h2 className={h2}>{igreja.title}</h2>
          <p className="mt-5 max-w-3xl font-serif text-2xl leading-snug"><Rich t={igreja.mission} /></p>
          <Image src={photos.igreja.src} alt={photos.igreja.alt} width={1800} height={1012} loading="lazy" sizes="(min-width:1152px) 1100px, 100vw" className="mt-10 h-auto w-full rounded-sm" />
          <div className="mt-14 grid gap-12 md:grid-cols-2">
            <div><h3 className="font-serif text-2xl">{igreja.historyTitle}</h3><Paras items={igreja.history} className="mt-5" /></div>
            <div><h3 className="font-serif text-2xl">{igreja.nowTitle}</h3><Paras items={igreja.now} className="mt-5" /></div>
          </div>
        </div>
      </section>

      <section id="parceria" className={`${wrap} py-20 md:py-28`}>
        <h2 className={h2}>{parceria.title}</h2>
        <Paras items={parceria.paragraphs} className="mt-8 max-w-3xl" />
        <p className={`mt-10 max-w-3xl ${body}`}>{parceria.formIntro}</p>
        <iframe src={site.formUrl} title="Formulário de parceria" loading="lazy" className="mt-6 h-[1500px] w-full rounded-sm border border-ink/15 bg-white md:h-[1250px]">Carregando…</iframe>
        <a href={site.formUrl.replace("?embedded=true", "")} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block underline">Abrir o formulário em outra aba</a>
      </section>

      <section id="pix" className="bg-denim py-20 text-paper md:py-28">
        <div className={`${wrap} grid items-center gap-10 md:grid-cols-[auto_1fr]`}>
          <div className="w-fit rounded-sm bg-white p-4"><Image src={photos.pix.src} alt={photos.pix.alt} width={192} height={192} unoptimized style={{ imageRendering: "pixelated" }} /></div>
          <div><h2 className={h2}>{pix.title}</h2>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed">{pix.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
            <p className="mt-6 text-xl font-semibold">{pix.key}</p>
            <div className="mt-5"><CopyPix value={site.pixCopy} /></div></div>
        </div>
      </section>

      <section className={`${wrap} py-20 text-center md:py-28`}>
        <blockquote className="mx-auto max-w-3xl font-serif text-3xl leading-snug md:text-4xl">“{verse.text}”<footer className="mt-4 font-sans text-base">{verse.ref}</footer></blockquote>
      </section>
    </main>
    <footer className="bg-ink py-14 text-paper/85">
      <div className={`${wrap} flex flex-col gap-6 md:flex-row md:justify-between`}>
        <div><p className="font-serif text-2xl text-paper">Ramon &amp; Tau Sales</p><p className="mt-2">Servindo a Cristo. Cuidando de pessoas. Caminhando juntos.</p></div>
        {links.length > 0 && <ul className="flex flex-wrap gap-5">{links.map(([l, h]) => <li key={l}><a className="underline" href={h as string}>{l}</a></li>)}</ul>}
      </div>
      <p className={`${wrap} mt-10 text-sm`}>© 2026 Ramon &amp; Tau Sales</p>
    </footer></>);
}
