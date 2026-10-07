"use client";
import { useState } from "react";
export default function CopyPix({ value }: { value: string }) {
  const [ok, setOk] = useState(false);
  return <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(value); setOk(true); setTimeout(() => setOk(false), 2500); } catch {} }}
    className="rounded-full bg-moss px-6 py-3 text-paper"><span aria-live="polite">{ok ? "Chave copiada" : "Copiar chave Pix"}</span></button>;
}
