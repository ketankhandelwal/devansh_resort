import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import OrnamentDivider from '../common/OrnamentDivider';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: 'Priya Mehta',
    title: 'Creative Director, Mumbai',
    rating: 5,
    text: 'Devansh Palace redefined what luxury means to me. The suite overlooking Lake Pichola was an ethereal experience — every sunset felt like a private painting. The staff anticipated every need before I even voiced it.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
  },
  {
    name: 'James Worthington',
    title: 'CEO, London',
    rating: 5,
    text: 'We chose Devansh for our annual leadership retreat and it exceeded every expectation. The culinary team crafted a bespoke Rajasthani menu that our global team still speaks of. A truly world-class property.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
  },
  {
    name: 'Aiko Yamamoto',
    title: 'Wellness Traveller, Tokyo',
    rating: 5,
    text: 'The Royal Spa at Devansh is unlike any wellness experience I\'ve had globally. The Ayurvedic therapists are world-class and the meditation courtyard at dawn is soul-restoring.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100',
  },
  {
    name: 'Arjun & Neha Kapoor',
    title: 'Honeymooners, Delhi',
    rating: 5,
    text: 'Our honeymoon at the Maharaja Suite was the most magical week of our lives. The private rooftop dinner they arranged, with the lit city below and stars above, will remain etched in our hearts forever.',
    avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=100',
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const goTo = (idx: number) => {
    if (isAnimating.current) return;
    if (!trackRef.current) return;
    isAnimating.current = true;

    const dir = idx > current ? 1 : -1;
    const cards = trackRef.current.querySelectorAll<HTMLDivElement>('.testimonial-card');
    const outCard = cards[current];
    const inCard = cards[idx];

    gsap.set(inCard, { x: dir * 80, opacity: 0, display: 'block' });
    gsap.to(outCard, { x: -dir * 80, opacity: 0, duration: 0.5, ease: 'power3.in', onComplete: () => {
      gsap.set(outCard, { display: 'none' });
    }});
    gsap.to(inCard, { x: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: 'power3.out', onComplete: () => {
      isAnimating.current = false;
    }});

    setCurrent(idx);
  };

  const prev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((current + 1) % TESTIMONIALS.length);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, [current]);

  useEffect(() => {
    // Hide all but first
    if (trackRef.current) {
      const cards = trackRef.current.querySelectorAll<HTMLDivElement>('.testimonial-card');
      cards.forEach((card, i) => {
        if (i !== 0) card.style.display = 'none';
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" style={{ background: '#0a0a0a', padding: '8rem 0', overflow: 'hidden', position: 'relative' }}>
      {/* Gold ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(197,160,89,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.5em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '1rem' }}>
            Guest Stories
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#fff', marginBottom: '1rem' }}>
            Voices of <span style={{ fontStyle: 'italic', color: '#c5a059' }}>Devansh</span>
          </h2>
          <OrnamentDivider dark className="my-6" />
        </div>

        {/* Testimonial slider */}
        <div ref={trackRef} style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              style={{ textAlign: 'center', display: i === 0 ? 'block' : 'none' }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '2.5rem' }}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={18} fill="#c5a059" color="#c5a059" />
                ))}
              </div>

              {/* Quote */}
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'rgba(197,160,89,0.3)', lineHeight: 0.5, marginBottom: '1rem' }}>"</div>
              <blockquote style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.7,
                marginBottom: '3rem',
              }}>
                {t.text}
              </blockquote>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(197,160,89,0.4)' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#fff', fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#c5a059', textTransform: 'uppercase' }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '4rem' }}>
          <button
            onClick={prev}
            style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.3)', color: '#c5a059', padding: '0.75rem', cursor: 'none', transition: 'all 0.3s ease' }}
            onMouseEnter={e => gsap.to(e.currentTarget, { background: 'rgba(197,160,89,0.2)', scale: 1.1, duration: 0.3 })}
            onMouseLeave={e => gsap.to(e.currentTarget, { background: 'rgba(197,160,89,0.08)', scale: 1, duration: 0.3 })}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: current === i ? '2rem' : '0.5rem', height: '2px',
                  background: current === i ? '#c5a059' : 'rgba(255,255,255,0.2)',
                  border: 'none', padding: 0, cursor: 'none',
                  transition: 'all 0.4s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.3)', color: '#c5a059', padding: '0.75rem', cursor: 'none', transition: 'all 0.3s ease' }}
            onMouseEnter={e => gsap.to(e.currentTarget, { background: 'rgba(197,160,89,0.2)', scale: 1.1, duration: 0.3 })}
            onMouseLeave={e => gsap.to(e.currentTarget, { background: 'rgba(197,160,89,0.08)', scale: 1, duration: 0.3 })}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
