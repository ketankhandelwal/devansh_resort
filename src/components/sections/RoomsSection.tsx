import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import OrnamentDivider from '../common/OrnamentDivider';

gsap.registerPlugin(ScrollTrigger);

const ROOMS = [
  {
    id: 'r1',
    category: 'Suite',
    name: 'Royal Heritage Suite',
    desc: 'Panoramic Lake Pichola views with 19th-century Rajasthani decor, private plunge pool and butler service.',
    price: '₹45,000',
    size: '120 m²',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=900',
    features: ['Plunge Pool', 'Lake View', 'Butler Service'],
  },
  {
    id: 'r2',
    category: 'Villa',
    name: 'Private Garden Villa',
    desc: 'A sprawling retreat enveloped in manicured courtyards, with a private infinity pool and personal chef.',
    price: '₹85,000',
    size: '280 m²',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=900',
    features: ['Infinity Pool', 'Private Chef', 'Garden'],
  },
  {
    id: 'r3',
    category: 'Deluxe',
    name: 'Lakeside Deluxe Room',
    desc: 'Elegantly appointed interiors with hand-carved furniture, silk drapes, and sweeping sunrise views.',
    price: '₹18,000',
    size: '60 m²',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=900',
    features: ['Lake View', 'Balcony', 'Rain Shower'],
  },
  {
    id: 'r4',
    category: 'Suite',
    name: 'Maharaja Suite',
    desc: 'The pinnacle of Devansh\'s heritage — an entire palace wing dedicated to royal indulgence and grandeur.',
    price: '₹1,20,000',
    size: '450 m²',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=900',
    features: ['Rooftop Terrace', 'Jacuzzi', 'Palace Wing'],
  },
];

const RoomsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const filters = ['All', 'Suite', 'Villa', 'Deluxe'];

  const filtered = activeFilter === 'All' ? ROOMS : ROOMS.filter(r => r.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // 3D tilt on hover
  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y / rect.height) - 0.5) * -12;
    const rotY = ((x / rect.width) - 0.5) * 12;
    gsap.to(card, { rotationX: rotX, rotationY: rotY, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
  };
  const onCardMouseLeave = (i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3.out' });
  };

  return (
    <section ref={sectionRef} id="rooms" style={{ background: '#111', padding: '8rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.5em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '1rem' }}>
            Accommodations
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#fff', marginBottom: '1rem' }}>
            Rooms & <span style={{ fontStyle: 'italic', color: '#c5a059' }}>Suites</span>
          </h2>
          <OrnamentDivider dark className="my-6" />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: '50ch', margin: '0 auto' }}>
            Choose from our array of palatial accommodations, each one a masterpiece of comfort and heritage design.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '4rem' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '0.6rem 1.8rem',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                cursor: 'none',
                border: '1px solid',
                borderColor: activeFilter === f ? '#c5a059' : 'rgba(255,255,255,0.15)',
                background: activeFilter === f ? 'rgba(197,160,89,0.15)' : 'transparent',
                color: activeFilter === f ? '#c5a059' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.3s ease',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((room, i) => (
            <div
              key={room.id}
              ref={el => { cardRefs.current[i] = el; }}
              className="tilt-card"
              onMouseMove={e => onCardMouseMove(e, i)}
              onMouseLeave={() => onCardMouseLeave(i)}
              style={{ position: 'relative', borderRadius: 0, overflow: 'hidden', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={room.image}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.06, duration: 0.6, ease: 'power2.out' })}
                  onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.6, ease: 'power2.out' })}
                />
                {/* Price badge */}
                <div className="price-badge" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                  {room.price} / night
                </div>
                {/* Category */}
                <div style={{
                  position: 'absolute', bottom: '1rem', left: '1rem',
                  fontSize: '0.55rem', letterSpacing: '0.35em', color: '#c5a059',
                  textTransform: 'uppercase', fontFamily: 'var(--font-sans)',
                  background: 'rgba(0,0,0,0.5)', padding: '0.3rem 0.7rem',
                  backdropFilter: 'blur(8px)',
                }}>
                  {room.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 400, color: '#fff', marginBottom: '0.75rem' }}>
                  {room.name}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.5rem' }}>
                  {room.desc}
                </p>

                {/* Features */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {room.features.map(f => (
                    <span key={f} style={{
                      fontSize: '0.6rem', letterSpacing: '0.2em', color: '#c5a059',
                      border: '1px solid rgba(197,160,89,0.3)', padding: '0.25rem 0.75rem',
                      textTransform: 'uppercase', fontFamily: 'var(--font-sans)',
                    }}>
                      {f}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-sans)' }}>
                    {room.size}
                  </span>
                  <button
                    className="group"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      fontSize: '0.6rem', letterSpacing: '0.25em', color: '#c5a059',
                      textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 600,
                      background: 'none', border: 'none', cursor: 'none',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget.querySelector('svg'), { x: 4, duration: 0.3 });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget.querySelector('svg'), { x: 0, duration: 0.3 });
                    }}
                  >
                    View Room <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button className="btn-outline">
            View All Accommodations
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
