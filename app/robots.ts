import { site } from "@/lib/content";
export default function robots() { return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${site.url}/sitemap.xml` }; }
