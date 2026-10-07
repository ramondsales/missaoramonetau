"use client";
import { useState } from "react";
export default function Video({ url }: { url: string }) {
  const [on, setOn] = useState(false);
  if (!url) return <div className="grid aspect-video place-items-center rounded-sm border border-dashed border-ink/40 p-4 text-center text-ink/60">[PLACEHOLDER] Vídeo principal — defina site.videoUrl em lib/content.ts</div>;
  return on ? <iframe className="aspect-video w-full rounded-sm" src={url.includes("youtube") || url.includes("vimeo") ? `${url}${url.includes("?") ? "&" : "?"}autoplay=1` : url} title="Vídeo de Ramon e Tau" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
    : <button onClick={() => setOn(true)} className="grid aspect-video w-full place-items-center rounded-sm bg-ink text-lg text-paper">▶ Assistir ao vídeo</button>;
}
