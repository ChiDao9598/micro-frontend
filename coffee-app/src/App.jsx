import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CoffeeCanvas from './components/CoffeeCanvas';
import img1 from './assets/images/coffee-1.jpg';
import img2 from './assets/images/coffee-2.webp';
import img3 from './assets/images/coffee-3.webp';
import img4 from './assets/images/coffee-4.webp';
import img5 from './assets/images/coffee-5.webp';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const MENU = [
  { name: 'Signature Espresso', tag: 'SINGLE ORIGIN', img: img1, price: '$6' },
  { name: 'Cold Brew Reserve',  tag: 'BARREL AGED',   img: img2, price: '$8' },
  { name: 'Highland Pour-Over', tag: 'ETHIOPIAN',     img: img3, price: '$9' },
  { name: 'Ceremonial Latte',   tag: 'SPECIALTY',     img: img4, price: '$7' },
];

const STEPS = [
  { val: '200°C', name: 'Roast Temperature', desc: 'Full-bodied dark roast perfection',     img: img3 },
  { val: '12min', name: 'Roast Duration',    desc: 'Precision timing for consistent flavor', img: img4 },
  { val: '48h',   name: 'Rest Period',       desc: 'Gases dissipate, character develops',    img: img5 },
];

const STATS = [
  { display: '2,400', unit: 'm', label: 'ALTITUDE' },
  { display: '12',    unit: '',  label: 'PARTNER FARMS' },
  { display: '4',     unit: '',  label: 'COUNTRIES' },
];

export default function CoffeeApp() {
  useEffect(() => {
    gsap.fromTo('.cff-char',
      { opacity: 0, y: 90, rotateX: -80 },
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.065, duration: 1.15, ease: 'expo.out', delay: 0.5 }
    );
    gsap.fromTo('.cff-hero-sub',     { opacity: 0, y: 28 },                   { opacity: 1, y: 0,     duration: 1.1, ease: 'power3.out', delay: 1.05 });
    gsap.fromTo('.cff-hero-cta',     { opacity: 0, y: 20 },                   { opacity: 1, y: 0,     duration: 1.0, ease: 'power3.out', delay: 1.4  });
    gsap.fromTo('.cff-hero-img-wrap',{ opacity: 0, scale: 0.88, rotateZ: 6 },{ opacity: 1, scale: 1, rotateZ: 0, duration: 1.5, ease: 'expo.out', delay: 0.2 });
    gsap.fromTo('.cff-scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out', delay: 1.8 });

    const reveal = (selector, fromVars, toVars) => {
      gsap.utils.toArray(selector).forEach((el) => {
        gsap.fromTo(el, fromVars, { ...toVars, scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    };
    reveal('.cff-reveal-up',    { opacity: 0, y:  55 }, { opacity: 1, y: 0,     duration: 1.0, ease: 'power3.out' });
    reveal('.cff-reveal-left',  { opacity: 0, x: -60 }, { opacity: 1, x: 0,     duration: 1.0, ease: 'power3.out' });
    reveal('.cff-reveal-right', { opacity: 0, x:  60 }, { opacity: 1, x: 0,     duration: 1.0, ease: 'power3.out' });
    reveal('.cff-reveal-scale', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' });

    gsap.fromTo('.cff-step',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.cff-steps', start: 'top 80%' } }
    );

    gsap.fromTo('.cff-menu-card',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.cff-menu-grid', start: 'top 80%' } }
    );

    gsap.utils.toArray('.cff-divider').forEach((el) => {
      gsap.fromTo(el,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.2, ease: 'expo.inOut',
          scrollTrigger: { trigger: el, start: 'top 88%' } }
      );
    });

    gsap.to('.cff-origins-img', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: '.cff-origins', start: 'top bottom', end: 'bottom top', scrub: true },
    });

    gsap.to('.cff-experience-bg', {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: { trigger: '.cff-experience', start: 'top bottom', end: 'bottom top', scrub: true },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="cff-app">
      <CoffeeCanvas />
      <div className="cff-vignette" aria-hidden="true" />

      <div className="cff-content">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="cff-section cff-hero">
          <div className="cff-hero-grid">
            <div className="cff-hero-left">
              <p className="cff-hero-label">ARTISAN ROASTERS · EST. 2018</p>
              <h1 className="cff-hero-title">
                {'COFFEE'.split('').map((ch, i) => (
                  <span key={i} className="cff-char">{ch}</span>
                ))}
              </h1>
              <p className="cff-hero-sub">An experience worth savoring</p>
              <button className="cff-cta cff-hero-cta">Explore Our Menu ↗</button>
            </div>
            <div className="cff-hero-right">
              <div className="cff-hero-img-wrap">
                <img src={img1} alt="Artisan coffee" className="cff-hero-img" />
                <div className="cff-hero-img-ring" />
                <div className="cff-hero-badge">
                  <span className="cff-hero-badge-origin">Ethiopian Yirgacheffe</span>
                  <span className="cff-hero-badge-note">★ 97 pts · Single Origin</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cff-scroll-indicator">
            <span className="cff-scroll-text">SCROLL</span>
            <div className="cff-scroll-line" />
          </div>
        </section>

        {/* ── Origins ───────────────────────────────────────────────────── */}
        <section className="cff-section cff-origins">
          <div className="cff-origins-inner">
            <div className="cff-origins-img-wrap cff-reveal-left">
              <img src={img3} alt="Coffee highlands" className="cff-origins-img" />
              <div className="cff-origins-img-badge">
                <span>SOURCED FROM</span>
                <strong>Ethiopia · Colombia · Yemen</strong>
              </div>
            </div>
            <div className="cff-text-block cff-reveal-right">
              <span className="cff-num-label">01 — ORIGINS</span>
              <hr className="cff-divider" />
              <h2 className="cff-section-title">From the<br />Highlands</h2>
              <p className="cff-section-body">
                Every cup begins thousands of meters above sea level,
                where thin air and centuries-old soil tell their story.
                We source only from farms that share our obsession with perfection.
              </p>
              <div className="cff-stats">
                {STATS.map(({ display, unit, label }) => (
                  <div key={label} className="cff-stat">
                    <div className="cff-stat-row">
                      <span className="cff-stat-value">{display}</span>
                      {unit && <span className="cff-stat-unit">{unit}</span>}
                    </div>
                    <span className="cff-stat-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Menu ──────────────────────────────────────────────────────── */}
        <section className="cff-section cff-menu">
          <div className="cff-menu-inner">
            <div className="cff-menu-header cff-reveal-up">
              <span className="cff-num-label">02 — OUR MENU</span>
              <hr className="cff-divider" />
              <h2 className="cff-section-title">Crafted<br />with Care</h2>
            </div>
            <div className="cff-menu-grid">
              {MENU.map(({ name, tag, img: menuImg, price }) => (
                <div key={name} className="cff-menu-card">
                  <div className="cff-menu-card-img-wrap">
                    <img src={menuImg} alt={name} className="cff-menu-card-img" />
                    <div className="cff-menu-card-overlay" />
                    <span className="cff-menu-card-price">{price}</span>
                  </div>
                  <div className="cff-menu-card-info">
                    <span className="cff-menu-card-tag">{tag}</span>
                    <h3 className="cff-menu-card-name">{name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────────────── */}
        <section className="cff-section cff-process">
          <div className="cff-process-inner">
            <div className="cff-process-header cff-reveal-up">
              <span className="cff-num-label">03 — THE CRAFT</span>
              <hr className="cff-divider" />
              <h2 className="cff-section-title">The Art of<br />Roasting</h2>
            </div>
            <div className="cff-steps">
              {STEPS.map(({ val, name, desc, img: stepImg }) => (
                <div key={val} className="cff-step">
                  <div className="cff-step-img-wrap">
                    <img src={stepImg} alt={name} className="cff-step-img" />
                    <div className="cff-step-img-overlay" />
                  </div>
                  <div className="cff-step-body">
                    <span className="cff-step-val">{val}</span>
                    <span className="cff-step-name">{name}</span>
                    <p className="cff-step-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Experience ────────────────────────────────────────────────── */}
        <section className="cff-section cff-experience">
          <div className="cff-experience-bg-wrap" aria-hidden="true">
            <img src={img5} alt="" className="cff-experience-bg" />
            <div className="cff-experience-bg-overlay" />
          </div>
          <div className="cff-experience-inner cff-reveal-up">
            <span className="cff-num-label">04 — THE EXPERIENCE</span>
            <hr className="cff-divider" />
            <h2 className="cff-section-title">Taste the<br />Difference</h2>
            <p className="cff-section-body">
              Notes of dark chocolate, toasted caramel, and a lingering
              warmth that stays with you long after the last sip.
            </p>
            <button className="cff-cta">Order Now ↗</button>
          </div>
        </section>

      </div>
    </div>
  );
}
