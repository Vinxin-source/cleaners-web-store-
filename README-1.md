# ClearGlass — Cleaning Business Website Template

## Files
- `index.html` — page structure
- `styles.css` — glassmorphism design system (theme driven by CSS variables)
- `config.js` — **the only file you edit to rebrand for a new client**
- `script.js` — theming engine, quote calculator, sounds, animations (don't need to touch this per client)
- `TEMPLATE-LICENSE.md` — usage terms if you're reselling this template itself to other designers

## Rebrand a new client in 2 minutes
Open `config.js` and change:
- `brandColor` — the one hex code that reskins every button, glow, and accent
- `business` — name, phone, email, service area, hours
- `hero`, `services`, `testimonials` — their copy
- `pricing` — their real starting price and per-room rates (this feeds BOTH the calculator and the booking form's service list automatically)

Nothing else needs to change. The theme engine derives every light/dark/hover state from `brandColor` automatically, and the two dropdowns (quote calculator + booking form) stay in sync from one list.

## ⚠️ Required step before going live: connect the booking form
Out of the box, the form will show a visible warning until this is done — **this is intentional**, so nobody accidentally ships a form that goes nowhere.

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form, copy the endpoint URL it gives you (looks like `https://formspree.io/f/xxxxxxxx`)
3. Paste it into `config.js` as `formEndpoint`
4. Submit a real test booking on the live site to confirm the client actually receives the email

Formspree's free tier covers 50 submissions/month, which is plenty for a small cleaning business — client can upgrade later if they outgrow it.

## Deploy on GitHub + Vercel
1. Create a new GitHub repo, push these files to it.
2. Go to vercel.com → **New Project** → import that GitHub repo.
3. Framework preset: **Other** (it's plain static HTML, no build step needed).
4. Click **Deploy** — live URL in under a minute.
5. To rebrand for a new client: duplicate the repo (or edit `config.js` and redeploy) — each client is its own Vercel project pointing at its own repo.

## Pre-launch checklist (run through this before handing off to any client)
- [ ] `formEndpoint` set to a real URL — the warning banner is gone
- [ ] Submitted one real test booking and confirmed the client received it
- [ ] `brandColor`, business name, phone, email, hours all updated in `config.js`
- [ ] Replaced the 3 placeholder before/after gallery blocks with real photos
- [ ] Replaced testimonial text with real reviews (or clearly-fine placeholder ones — don't present made-up quotes as real client reviews)
- [ ] Checked the site on an actual phone, not just desktop browser resize
- [ ] Custom domain connected in Vercel (optional but recommended upsell)

## Notes
- The click sound is synthesized in-browser (no audio file to host).
- Everything is mobile-responsive and respects `prefers-reduced-motion`.
- If `config.js` ever has a typo, the site shows a visible red error banner instead of silently breaking — check the browser console for the specific error.
