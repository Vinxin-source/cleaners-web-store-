/* ============================================================
   BRAND CONFIG
   Edit this file only to re-skin this site for a new client.
   Every color, name, price, and word on the page pulls from here.
   ============================================================ */

const CONFIG = {
  business: {
    name: "ClearGlass Cleaning",
    tagline: "Spotless homes, booked in under a minute.",
    phone: "(555) 010-2020",
    phoneHref: "+15550102020",
    email: "hello@clearglasscleaning.com",
    serviceArea: "Serving the Greater Riverside Area",
    addressLine: "Riverside, CA",
    hours: "Mon–Sat, 8am–6pm",
  },

  // Where booking-form submissions get sent. Create a free endpoint at
  // https://formspree.io (or similar) and paste the URL here.
  // Until this is a real URL, the site shows a small on-page warning
  // so nobody accidentally launches a form that goes nowhere.
  formEndpoint: "https://formspree.io/f/REPLACE_ME",

  // The ONE color that reskins the whole site. Everything else
  // (light/dark variants, glow, hover states) is derived from it.
  brandColor: "#0EA5A8", // teal — swap this hex for any brand color

  ambientTint: true,

  hero: {
    eyebrow: "Residential & Commercial Cleaning",
    headline: "A cleaner home shouldn't take longer to book than to clean.",
    subhead: "Get an instant price, pick a time, and we show up spotless-ready.",
    ctaPrimary: "Get My Instant Quote",
    ctaSecondary: "Call Now",
  },

  trustBadges: [
    { label: "Insured & Bonded" },
    { label: "Background-Checked Staff" },
    { label: "Satisfaction Guarantee" },
    { label: "Eco-Friendly Products" },
  ],

  // Pricing used by BOTH the instant-quote calculator and the
  // "Select a service" dropdown on the booking form — one list,
  // used in two places, so they can never fall out of sync.
  pricing: {
    currency: "$",
    basePrice: 89,
    perBedroom: 18,
    perBathroom: 22,
    types: [
      { key: "standard", label: "Standard Cleaning", multiplier: 1 },
      { key: "deep", label: "Deep Cleaning", multiplier: 1.45 },
      { key: "moveInOut", label: "Move-In / Move-Out", multiplier: 1.65 },
    ],
  },

  services: [
    {
      icon: "home",
      title: "Standard Cleaning",
      desc: "Recurring upkeep — kitchens, bathrooms, floors, dusting, and surfaces refreshed every visit.",
    },
    {
      icon: "sparkle",
      title: "Deep Cleaning",
      desc: "A top-to-bottom reset — baseboards, inside appliances, grout, and every overlooked corner.",
    },
    {
      icon: "key",
      title: "Move-In / Move-Out",
      desc: "Empty-home detail cleaning so you hand over — or step into — a truly spotless space.",
    },
    {
      icon: "building",
      title: "Office & Commercial",
      desc: "Scheduled cleaning for offices, studios, and small commercial spaces around your hours.",
    },
  ],

  testimonials: [
    {
      quote: "Booked in two minutes on my phone and they showed up exactly on time. House has never looked better.",
      name: "Priya M.",
      meta: "Recurring biweekly client",
    },
    {
      quote: "The instant quote was spot on — no surprises when they arrived. Deep clean before we listed the house sold it faster.",
      name: "Daniel R.",
      meta: "Move-out cleaning",
    },
    {
      quote: "Our office finally feels like a place clients want to sit in. Reliable, quiet, thorough.",
      name: "Aisha K.",
      meta: "Commercial client",
    },
  ],

  ui: {
    enableClickSound: true,
    enableWipeReveal: true,
  },
};
