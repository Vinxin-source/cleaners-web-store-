/* ============================================================
   CLEARGLASS — script.js
   Reads everything from config.js. Do not hardcode brand content here.
   ============================================================ */

const ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l3 3"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  mute: '<path d="M11 5 6 9H2v6h4l5 4z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>',
  sound: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
};
function svgIcon(name, size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}

/* ---------- color math: derive light/dark/glow from one brand hex ---------- */
function hexToRgb(hex) {
  const h = String(hex).replace('#', '');
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const int = parseInt(n, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}
function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
}
function mix(hex, targetHex, amount) {
  const a = hexToRgb(hex), b = hexToRgb(targetHex);
  return rgbToHex({
    r: a.r + (b.r - a.r) * amount,
    g: a.g + (b.g - a.g) * amount,
    b: a.b + (b.b - a.b) * amount,
  });
}
function applyTheme(brandHex) {
  const light = mix(brandHex, '#ffffff', 0.35);
  const dark = mix(brandHex, '#000000', 0.35);
  const { r, g, b } = hexToRgb(brandHex);
  const root = document.documentElement.style;
  root.setProperty('--brand', brandHex);
  root.setProperty('--brand-light', light);
  root.setProperty('--brand-dark', dark);
  root.setProperty('--brand-glow', `rgba(${r},${g},${b},0.32)`);
}

/* ---------- click sound (synthesized, no audio file needed) ---------- */
let audioCtx = null;
let soundOn = true;
function playClick() {
  if (!soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.06);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.13);
  } catch (e) { /* audio not available, fail silently */ }
}

/* ---------- render content from CONFIG ---------- */
function renderContent() {
  document.title = CONFIG.business.name;
  document.querySelectorAll('[data-biz-name]').forEach(el => el.textContent = CONFIG.business.name);
  document.querySelectorAll('[data-biz-phone]').forEach(el => el.textContent = CONFIG.business.phone);
  document.querySelectorAll('[data-biz-phone-href]').forEach(el => el.href = 'tel:' + CONFIG.business.phoneHref);
  document.querySelectorAll('[data-biz-area]').forEach(el => el.textContent = CONFIG.business.serviceArea);
  document.querySelectorAll('[data-biz-hours]').forEach(el => el.textContent = CONFIG.business.hours);
  document.querySelectorAll('[data-hero-eyebrow]').forEach(el => el.textContent = CONFIG.hero.eyebrow);
  document.querySelectorAll('[data-hero-headline]').forEach(el => el.textContent = CONFIG.hero.headline);
  document.querySelectorAll('[data-hero-subhead]').forEach(el => el.textContent = CONFIG.hero.subhead);
  document.querySelectorAll('[data-cta-primary]').forEach(el => el.textContent = CONFIG.hero.ctaPrimary);
  document.querySelectorAll('[data-cta-secondary]').forEach(el => el.textContent = CONFIG.hero.ctaSecondary);

  const badgesRow = document.getElementById('badges-row');
  if (badgesRow) {
    badgesRow.innerHTML = CONFIG.trustBadges.map(b => `
      <div class="badge glass wipe">${svgIcon('check', 16)}<span>${b.label}</span></div>
    `).join('');
  }

  const servicesGrid = document.getElementById('services-grid');
  if (servicesGrid) {
    servicesGrid.innerHTML = CONFIG.services.map(s => `
      <div class="service-card glass tilt wipe">
        <div class="service-icon">${svgIcon(s.icon, 22)}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  const testiGrid = document.getElementById('testi-grid');
  if (testiGrid) {
    testiGrid.innerHTML = CONFIG.testimonials.map(t => `
      <div class="testi-card glass wipe">
        <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="testi-quote">&#8220;${t.quote}&#8221;</p>
        <div class="testi-name">${t.name}</div>
        <div class="testi-meta">${t.meta}</div>
      </div>
    `).join('');
  }

  // Calculator "type" dropdown AND booking form "service" dropdown both
  // pull from CONFIG.pricing.types — one list, two places, always in sync.
  const calcTypeEl = document.getElementById('calc-type');
  if (calcTypeEl) {
    calcTypeEl.innerHTML = CONFIG.pricing.types.map(t => `<option value="${t.key}">${t.label}</option>`).join('');
  }
  const bookingServiceEl = document.getElementById('booking-service');
  if (bookingServiceEl) {
    const extra = CONFIG.services
      .filter(s => !CONFIG.pricing.types.some(t => t.label === s.title))
      .map(s => `<option>${s.title}</option>`).join('');
    bookingServiceEl.innerHTML =
      `<option value="">Select a service</option>` +
      CONFIG.pricing.types.map(t => `<option>${t.label}</option>`).join('') +
      extra;
  }
}

/* ---------- instant quote calculator (also feeds the booking form) ---------- */
let lastQuote = null;

function initCalculator() {
  const state = { bedrooms: 2, bathrooms: 1, type: CONFIG.pricing.types[0].key, zip: '' };
  const bedroomsEl = document.getElementById('calc-bedrooms');
  const bathroomsEl = document.getElementById('calc-bathrooms');
  const typeEl = document.getElementById('calc-type');
  const zipEl = document.getElementById('calc-zip');
  const priceEl = document.getElementById('calc-price');

  function currentTypeLabel() {
    const t = CONFIG.pricing.types.find(t => t.key === state.type);
    return t ? t.label : '';
  }

  function calcPrice() {
    const p = CONFIG.pricing;
    const t = p.types.find(t => t.key === state.type);
    const multiplier = t ? t.multiplier : 1;
    const base = p.basePrice + state.bedrooms * p.perBedroom + state.bathrooms * p.perBathroom;
    return Math.round(base * multiplier);
  }

  function render() {
    bedroomsEl.textContent = state.bedrooms;
    bathroomsEl.textContent = state.bathrooms;
    const price = calcPrice();
    animatePrice(price);
    lastQuote = {
      price,
      type: currentTypeLabel(),
      bedrooms: state.bedrooms,
      bathrooms: state.bathrooms,
      zip: state.zip,
    };
  }

  function animatePrice(target) {
    const current = parseInt(priceEl.dataset.val || '0', 10);
    const start = performance.now();
    const duration = 350;
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.round(current + (target - current) * eased);
      priceEl.innerHTML = `${CONFIG.pricing.currency}${val}<sup>+</sup>`;
      if (t < 1) requestAnimationFrame(step);
      else priceEl.dataset.val = target;
    }
    requestAnimationFrame(step);
  }

  document.querySelectorAll('[data-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.target;
      const dir = parseInt(btn.dataset.step, 10);
      state[key] = Math.max(1, Math.min(10, state[key] + dir));
      playClick();
      render();
    });
  });

  if (typeEl) {
    typeEl.addEventListener('change', () => {
      state.type = typeEl.value;
      playClick();
      render();
    });
  }
  if (zipEl) {
    zipEl.addEventListener('input', () => { state.zip = zipEl.value; });
  }

  render();

  // Connect the calculator to the booking form: clicking the primary
  // CTA carries the quote forward instead of dropping it.
  document.querySelectorAll('[data-cta-primary]').forEach(cta => {
    cta.addEventListener('click', () => {
      if (!lastQuote) return;
      const summaryEl = document.getElementById('quote-summary');
      const hiddenEl = document.getElementById('quote-summary-hidden');
      const text = `${lastQuote.type} · ${lastQuote.bedrooms} bed / ${lastQuote.bathrooms} bath` +
        (lastQuote.zip ? ` · ${lastQuote.zip}` : '') +
        ` · Estimated ${CONFIG.pricing.currency}${lastQuote.price}`;
      if (summaryEl) summaryEl.textContent = `Your quote: ${text}`;
      if (hiddenEl) hiddenEl.value = text;
      const bookingServiceEl = document.getElementById('booking-service');
      if (bookingServiceEl && lastQuote.type) bookingServiceEl.value = lastQuote.type;
    });
  });
}

/* ---------- wipe-clean scroll reveal ---------- */
function initWipeReveal() {
  if (!CONFIG.ui.enableWipeReveal) {
    document.querySelectorAll('.wipe').forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 60);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  requestAnimationFrame(() => {
    document.querySelectorAll('.wipe').forEach(el => io.observe(el));
  });
}

/* ---------- mobile nav ---------- */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    playClick();
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

/* ---------- sound toggle ---------- */
function initSoundToggle() {
  const btn = document.getElementById('sound-toggle');
  if (!btn) return;
  soundOn = CONFIG.ui.enableClickSound;
  btn.innerHTML = svgIcon(soundOn ? 'sound' : 'mute', 18);
  btn.addEventListener('click', () => {
    soundOn = !soundOn;
    btn.innerHTML = svgIcon(soundOn ? 'sound' : 'mute', 18);
    if (soundOn) playClick();
  });
}

function initGlobalClickSound() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn, .nav-cta, .badge, .service-card')) playClick();
  });
}

/* ---------- booking form: real submission + unconfigured-endpoint warning ---------- */
function isEndpointConfigured() {
  return typeof CONFIG.formEndpoint === 'string' &&
    CONFIG.formEndpoint.startsWith('http') &&
    !CONFIG.formEndpoint.includes('REPLACE_ME');
}

function showFormEndpointWarning() {
  const form = document.getElementById('booking-form');
  if (!form) return;
  const warn = document.createElement('div');
  warn.className = 'form-warning';
  warn.innerHTML = '&#9888;&nbsp; Form is not connected yet — set <code>formEndpoint</code> in config.js (see README) before sharing this site with real customers.';
  form.prepend(warn);
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  if (!isEndpointConfigured()) {
    showFormEndpointWarning();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    playClick();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;

    if (!isEndpointConfigured()) {
      btn.textContent = 'Form not connected — see README';
      setTimeout(() => { btn.textContent = original; }, 3000);
      return;
    }

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const formData = new FormData(form);
      const res = await fetch(CONFIG.formEndpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) {
        btn.textContent = 'Request sent — we\u2019ll text you shortly';
        form.reset();
      } else {
        btn.textContent = 'Something went wrong — please call us instead';
      }
    } catch (err) {
      btn.textContent = 'Network error — please call us instead';
    } finally {
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 4000);
    }
  });
}

/* ---------- global error-safe boot ----------
   If config.js has a typo or a render step throws, the visitor (and the
   person who just edited the file) sees a clear on-page message instead
   of a silently blank/broken site. */
function showBootError(err) {
  console.error('ClearGlass failed to load content:', err);
  const banner = document.createElement('div');
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:#b3261e;color:#fff;padding:12px 16px;font-family:sans-serif;font-size:13px;text-align:center;';
  banner.textContent = 'This site failed to load its content — check config.js for a typo (missing comma or quote is the usual cause).';
  document.body.prepend(banner);
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (typeof CONFIG === 'undefined') throw new Error('CONFIG is not defined — config.js did not load or has a syntax error.');
    applyTheme(CONFIG.brandColor);
    renderContent();
    initCalculator();
    initMobileNav();
    initSoundToggle();
    initGlobalClickSound();
    initBookingForm();
    initWipeReveal();
  } catch (err) {
    showBootError(err);
  }
});
