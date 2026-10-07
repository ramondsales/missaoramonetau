"use client";
import { useEffect, useRef, useState } from "react";
export default function Video({ url }: { url: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (!url || !box.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setPlay(true); io.disconnect(); } }, { threshold: 0.5 });
    io.observe(box.current);
    return () => io.disconnect();
  }, [url]);
  if (!url) return <div className="grid aspect-video place-items-center rounded-sm border border-dashed border-ink/40 p-4 text-center text-ink/60">[PLACEHOLDER] Vídeo principal — defina site.videoUrl em lib/content.ts</div>;
  const q = /youtube|vimeo/.test(url) ? `${url}${url.includes("?") ? "&" : "?"}autoplay=1&mute=1&playsinline=1&rel=0` : url;
  return (
    <div ref={box} className="aspect-video w-full overflow-hidden rounded-sm bg-ink">
      {play ? <iframe className="size-full" src={q} title="Vídeo de Ramon e Tau" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        : <button onClick={() => setPlay(true)} className="size-full text-lg text-paper">▶ Assistir ao vídeo</button>}
    </div>);
}
