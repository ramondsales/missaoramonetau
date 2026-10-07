# Ramon & Tau — site
`npm install && npm run dev`. Deploy: importe o repositório na Vercel e defina as variáveis de `.env.example`.
- Textos, links, vídeo, Pix e formulário: `lib/content.ts`. Fotos em `public/images`.
- Fotos: coloque em `public/images` e liste em `gallery`.
- Leads: `app/api/lead/route.ts` (Resend, Formspree ou webhook para Sheets/Supabase/HubSpot/Mailchimp via Zapier/Make). Chaves só no servidor.
