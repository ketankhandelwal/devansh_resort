import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrnamentDivider from '../common/OrnamentDivider';

gsap.registerPlugin(ScrollTrigger);

const DISHES = [
  {
    id: 'd1',
    name: 'Dal Baati Churma',
    category: 'Heritage',
    desc: 'The royal Rajasthani classic — charred wheat bread, slow-cooked lentils, and sweet churma drizzled with ghee.',
    price: '₹1,200',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=700',
    tags: ['Vegetarian', 'Heritage Recipe'],
  },
  {
    id: 'd2',
    name: 'Laal Maas',
    category: 'Signature',
    desc: 'A fiery, aromatic lamb curry cooked with mathania chilies — the pride of Rajasthani non-vegetarian cuisine.',
    price: '₹2,800',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=700',
    tags: ['Non-Veg', 'Chef\'s Special'],
  },
  {
    id: 'd3',
    name: 'Ghewar with Rabri',
    category: 'Dessert',
    desc: 'Delicate honeycomb-textured fried dough, soaked in sugar syrup and crowned with malai rabri.',
    price: '₹850',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=700',
    tags: ['Vegetarian', 'Traditional'],
  },
  {
    id: 'd4',
    name: 'Tandoori Lobster',
    category: 'Seafood',
    desc: 'Fresh sea lobster marinated in mustard and yogurt, grilled in our clay tandoor with saffron butter.',
    price: '₹4,500',
    image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&q=80&w=700',
    tags: ['Seafood', 'Premium'],
  },
  {
    id: 'd5',
    name: 'Mawa Kachori',
    category: 'Heritage',
    desc: "Jodhpur's iconic sweet street food elevated — deep-fried pastry stuffed with saffron mawa and dry fruits.",
    price: '₹650',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=700',
    tags: ['Vegetarian', 'Street-Inspired'],
  },
  {
    id: 'd6',
    name: 'Saffron Kulfi Tower',
    category: 'Dessert',
    desc: 'Artisanal saffron kulfi, served architecturally with gulkand rose petals and pistachio dust.',
    price: '₹750',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=700',
    tags: ['Vegetarian', 'Artistic'],
  },
];

const DISH_CATEGORIES = ['All', 'Heritage', 'Signature', 'Seafood', 'Dessert'];

const DiningSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState('All');
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered = active === 'All' ? DISHES : DISHES.filter(d => d.category === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from('.dining-heading', {
        y: 50, opacity: 0, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate cards when filter changes
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { y: 30, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: i * 0.07, ease: 'power3.out' }
      );
    });
  }, [active]);

  // 3D rotation effect on dish card
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = (-(e.clientY - rect.top) / rect.height + 0.5) * 12;
    gsap.to(card, { rotationY: x, rotationX: y, duration: 0.4, ease: 'power2.out', transformPerspective: 700 });
    gsap.to(card.querySelector('.dish-img'), { scale: 1.06, duration: 0.5, ease: 'power2.out' });
    gsap.to(card.querySelector('.dish-overlay'), { opacity: 0.6, duration: 0.3 });
  };

  const onMouseLeave = (i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.7, ease: 'elastic.out(1, 0.7)' });
    gsap.to(card.querySelector('.dish-img'), { scale: 1, duration: 0.5, ease: 'power2.out' });
    gsap.to(card.querySelector('.dish-overlay'), { opacity: 0, duration: 0.3 });
  };

  return (
    <section ref={sectionRef} id="dining" style={{ background: '#0d0d0d', padding: '8rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div className="dining-heading" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.5em', color: '#c5a059', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '1rem' }}>
            Restaurant & Dining
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#fff', marginBottom: '1rem' }}>
            Culinary <span style={{ fontStyle: 'italic', color: '#c5a059' }}>Journeys</span>
          </h2>
          <OrnamentDivider dark className="my-6" />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontWeight: 300, maxWidth: '50ch', margin: '0 auto' }}>
            An exploration of authentic Rajasthani flavours, reimagined by our award-winning chefs with artisanal finesse.
          </p>
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '4rem' }}>
          {DISH_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '0.6rem 1.8rem',
                fontSize: '0.65rem', letterSpacing: '0.25em',
                textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 500,
                cursor: 'none', border: '1px solid',
                borderColor: active === cat ? '#c5a059' : 'rgba(255,255,255,0.12)',
                background: active === cat ? 'rgba(197,160,89,0.12)' : 'transparent',
                color: active === cat ? '#c5a059' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dishes grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((dish, i) => (
            <div
              key={dish.id}
              ref={el => { cardRefs.current[i] = el; }}
              className="tilt-card"
              onMouseMove={e => onMouseMove(e, i)}
              onMouseLeave={() => onMouseLeave(i)}
              style={{
                background: '#161616',
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Image */}
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  className="dish-img"
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  className="dish-overlay"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(197,160,89,0.25), transparent)',
                    opacity: 0,
                  }}
                />
                <div style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  fontSize: '0.55rem', letterSpacing: '0.3em', color: '#c5a059',
                  textTransform: 'uppercase', fontFamily: 'var(--font-sans)',
                  background: 'rgba(0,0,0,0.6)', padding: '0.25rem 0.7rem', backdropFilter: 'blur(8px)',
                }}>
                  {dish.category}
                </div>
                <div className="price-badge" style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                  {dish.price}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 400, color: '#fff', marginBottom: '0.5rem' }}>
                  {dish.name}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.25rem' }}>
                  {dish.desc}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {dish.tags.map(t => (
                    <span key={t} style={{
                      fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(197,160,89,0.7)',
                      border: '1px solid rgba(197,160,89,0.2)', padding: '0.2rem 0.6rem',
                      textTransform: 'uppercase', fontFamily: 'var(--font-sans)',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View full menu */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button className="btn-gold">View Full Menu</button>
        </div>
      </div>
    </section>
  );
};

export default DiningSection;
