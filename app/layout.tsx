import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";
const serif = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const title = "Ramon & Tau | Uma história, uma missão";
const description = "Conheça a história de Ramon e Tau Sales, seu chamado, sua caminhada ministerial e como você pode caminhar com eles nesta nova etapa.";
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title, description,
  openGraph: { title, description, type: "website", locale: "pt_BR", url: "/", images: [{ url: "/images/familia.jpg", alt: "Ramon, Tau e os filhos" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/familia.jpg"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>;
}
