import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrnamentDivider from '../common/OrnamentDivider';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '1997', label: 'Established' },
  { value: '120+', label: 'Luxury Suites' },
  { value: '5★', label: 'AAA Rating' },
  { value: '14', label: 'Dining Venues' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left text reveal
      if (headRef.current) {
        const words = headRef.current.querySelectorAll('.about-word');
        gsap.from(words, {
          y: 60,
          opacity: 0,
          stagger: 0.06,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
        });
      }

      gsap.from(leftRef.current?.querySelector('.about-text'), {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 75%', once: true },
      });

      // Stats stagger
      const stats = statsRef.current?.querySelectorAll('.stat-item');
      if (stats) {
        gsap.from(stats, {
          y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
        });
      }

      // Image parallax
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
      if (img2Ref.current) {
        gsap.to(img2Ref.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

      // Right image clip reveal
      gsap.fromTo(rightRef.current, {
        clipPath: 'inset(0 100% 0 0)',
      }, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2, ease: 'power4.inOut',
        scrollTrigger: { trigger: rightRef.current, start: 'top 75%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const wrapWords = (text: string) =>
    text.split(' ').map((w, i) => (
      <span key={i} className="about-word" style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.35em' }}>
        <span style={{ display: 'inline-block' }}>{w}</span>
      </span>
    ));

  return (
    <section ref={sectionRef} id="about" style={{ background: '#0d0d0d', padding: '8rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.5em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '1.5rem' }}>
            — Our Story —
          </div>
          <OrnamentDivider dark className="mb-0" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>

          {/* Left */}
          <div ref={leftRef}>
            <h2 ref={headRef} style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              color: '#fff',
              marginBottom: '2rem',
            }}>
              {wrapWords('Devansh Palace')}
              <br />
              <span style={{ fontStyle: 'italic', color: '#c5a059' }}>
                {wrapWords('Udaipur')}
              </span>
            </h2>

            <p className="about-text" style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              lineHeight: 1.9,
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 300,
              maxWidth: '42ch',
              marginBottom: '2.5rem',
            }}>
              Discover our 5-star luxury palace hotel, nestled on the shores of Lake Pichola
              in the City of Lakes. Each corner tells stories of Rajasthani heritage, woven
              seamlessly with modern luxury. From panoramic hilltop suites to curated
              culinary journeys, Devansh is your gateway to a life well-lived.
            </p>

            <p className="about-text" style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              lineHeight: 1.9,
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 300,
              maxWidth: '42ch',
              marginBottom: '3rem',
            }}>
              Established in 1997, our property has welcomed heads of state, celebrated artists,
              and discerning travellers from across the globe who seek the extraordinary.
            </p>

            <div className="about-text" style={{ display: 'flex', gap: '1.5rem' }}>
              <button
                className="btn-gold"
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
              >
                Our Story
              </button>
              <button
                className="btn-outline"
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
              >
                Hotel Details
              </button>
            </div>
          </div>

          {/* Right: stacked images */}
          <div ref={rightRef} style={{ position: 'relative', height: '600px' }}>
            {/* Main image */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '75%', height: '80%',
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}>
              <img
                ref={imgRef}
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800"
                alt="Devansh Palace exterior"
                referrerPolicy="no-referrer"
                style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            {/* Accent image */}
            <div style={{
              position: 'absolute',
              bottom: 0, right: 0,
              width: '55%', height: '50%',
              overflow: 'hidden',
              border: '3px solid rgba(197,160,89,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
            }}>
              <img
                ref={img2Ref}
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600"
                alt="Luxury suite"
                referrerPolicy="no-referrer"
                style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            {/* Gold accent badge */}
            <div className="glass-gold" style={{
              position: 'absolute',
              top: '50%',
              left: '60%',
              transform: 'translate(-50%, -50%)',
              padding: '1.25rem 1.75rem',
              textAlign: 'center',
              zIndex: 5,
            }}>
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: '#c5a059', fontWeight: 300 }}>
                Since
              </div>
              <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: '#fff', fontWeight: 300, lineHeight: 1 }}>
                1997
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
          marginTop: '7rem',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', fontWeight: 300, color: '#c5a059', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginTop: '0.75rem', fontFamily: 'var(--font-sans)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
