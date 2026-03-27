import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import OrnamentDivider from '../common/OrnamentDivider';

const cards = [
  {
    name: 'The Grand Pavilion',
    type: 'Fine Dining',
    desc: 'Exquisite global flavours served in a palatial setting with panoramic lake views.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Azure Sky Bar',
    type: 'Rooftop Lounge',
    desc: 'Crafted cocktails and curated spirits under an open sky at golden hour.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Spice Route',
    type: 'Authentic Indian',
    desc: "A royal journey through India's rich culinary traditions and heritage recipes.",
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'The Courtyard Café',
    type: 'All-Day Dining',
    desc: 'Relaxed all-day dining in our sun-drenched courtyard, from chai to high tea.',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Royal Terrace',
    type: 'Outdoor Dining',
    desc: 'Al-fresco evenings with starlit skies and flavours inspired by Rajputana royalty.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
  },
];

const DiningCarousel = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-[#f9f6f1] overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-serif text-ink mb-5"
        >
          Epicurean Delights
        </motion.h2>
        <OrnamentDivider className="mb-5" />
        <p className="text-xs uppercase tracking-[0.4em] text-gold font-medium">Dining &amp; Bars</p>
      </div>

      {/* Carousel with arrows */}
      <div className="relative group/carousel">
        {/* Prev */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-gold hover:text-white text-ink transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-12 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cards.map((card, idx) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative shrink-0 w-[75vw] md:w-[30vw] lg:w-[26vw] h-[520px] overflow-hidden snap-start cursor-pointer group"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Image zoom */}
              <img
                src={card.image}
                alt={card.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                style={{ transform: hoveredIdx === idx ? 'scale(1.08)' : 'scale(1)' }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

              {/* Card content */}
              <div className="absolute bottom-0 left-0 w-full p-8">
                <span className="text-[9px] uppercase tracking-[0.35em] text-gold font-bold mb-2 block">
                  {card.type}
                </span>
                <h3 className="text-2xl font-serif text-white mb-2 leading-tight">{card.name}</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed mb-5">{card.desc}</p>

                {/* CTA slides up on hover */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredIdx === idx ? 1 : 0,
                    y: hoveredIdx === idx ? 0 : 8,
                  }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center text-white text-[10px] uppercase tracking-[0.25em] font-bold"
                >
                  View Restaurant <ArrowRight className="w-3 h-3 ml-2" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-gold hover:text-white text-ink transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default DiningCarousel;
