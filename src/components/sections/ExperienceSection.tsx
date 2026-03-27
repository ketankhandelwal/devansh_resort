import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrnamentDivider from '../common/OrnamentDivider';

gsap.registerPlugin(ScrollTrigger);

const AMENITIES = [
  {
    icon: '🏊',
    title: 'Infinity Pool',
    desc: 'Floating above Lake Pichola with three heated pools and a poolside bar.',
  },
  {
    icon: '💆',
    title: 'Royal Spa',
    desc: 'Ancient Ayurvedic rituals blended with modern wellness therapies.',
  },
  {
    icon: '🎴',
    title: 'Cultural Evenings',
    desc: 'Nightly Rajasthani folk performances, puppet shows, and royal banquets.',
  },
  {
    icon: '🏇',
    title: 'Equestrian Club',
    desc: 'Heritage horse riding through Aravalli trails at sunrise and sunset.',
  },
  {
    icon: '🎾',
    title: 'Sports Complex',
    desc: 'Floodlit tennis courts, squash, and professional training facilities.',
  },
  {
    icon: '🍸',
    title: 'Rooftop Bar',
    desc: 'Open-air sunset cocktails with 360° views of the City of Lakes.',
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animate amenity cards
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 50, opacity: 0, scale: 0.95, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        });
      });

      // Parallax bg
      gsap.to('.exp-bg', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', end: 'bottom top',
          scrub: 2,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experiences" style={{ position: 'relative', padding: '8rem 0', overflow: 'hidden', background: '#111' }}>
      {/* Parallax background image */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div
          className="exp-bg"
          style={{
            position: 'absolute', inset: '-20%', zIndex: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1920)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.06,
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.5em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '1rem' }}>
            Amenities & Experiences
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#fff', marginBottom: '1rem' }}>
            Beyond the <span style={{ fontStyle: 'italic', color: '#c5a059' }}>Ordinary</span>
          </h2>
          <OrnamentDivider dark className="my-6" />
        </div>

        {/* 2-column feature + grid layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 300, color: '#fff', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Meetings &<br /><span style={{ fontStyle: 'italic', color: '#c5a059' }}>Grand Events</span>
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', fontWeight: 300, marginBottom: '2rem' }}>
              From intimate gatherings to grand royal banquets, our palatial venues with hand-painted frescoes set an unparalleled stage for your most cherished moments.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                className="btn-gold"
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
              >
                Request Proposal
              </button>
              <button
                className="btn-outline"
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
              >
                View Venues
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=500',
              'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=500',
              'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=500',
              'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=500',
            ].map((src, i) => (
              <div key={i} style={{ overflow: 'hidden', height: i % 2 === 0 ? '180px' : '140px', marginTop: i % 2 === 1 ? '2rem' : 0 }}>
                <img
                  src={src}
                  alt="Event"
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.08, duration: 0.5 })}
                  onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.5 })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Amenity cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
          {AMENITIES.map((amenity, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              style={{ background: '#111', padding: '2.5rem 2rem', cursor: 'none' }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { background: '#1a1611', duration: 0.3 });
                gsap.to(e.currentTarget.querySelector('.amenity-icon'), { scale: 1.2, y: -4, duration: 0.3 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { background: '#111', duration: 0.3 });
                gsap.to(e.currentTarget.querySelector('.amenity-icon'), { scale: 1, y: 0, duration: 0.3 });
              }}
            >
              <div className="amenity-icon" style={{ fontSize: '2rem', marginBottom: '1.25rem', display: 'inline-block' }}>
                {amenity.icon}
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 400, color: '#fff', marginBottom: '0.75rem' }}>
                {amenity.title}
              </h4>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 300 }}>
                {amenity.desc}
              </p>
              <div style={{ width: '2rem', height: '1px', background: '#c5a059', marginTop: '1.5rem', transition: 'width 0.4s ease' }}
                className="amenity-line"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
