import { site } from "@/lib/content";
export default function sitemap() { return [{ url: site.url, lastModified: new Date() }]; }
