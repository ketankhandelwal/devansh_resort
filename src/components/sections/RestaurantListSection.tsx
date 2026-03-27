import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const restaurants = [
  { name: 'The Grand Pavilion', type: 'Fine Dining' },
  { name: 'Azure Sky Bar', type: 'Rooftop Lounge' },
  { name: 'Spice Route', type: 'Authentic Indian' },
  { name: 'The Courtyard Café', type: 'All-Day Dining' },
  { name: 'Royal Terrace', type: 'Outdoor Dining' },
];

const RestaurantListSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-white px-6 py-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-[700px]">

        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden w-full h-[500px] md:h-auto"
        >
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=900"
            alt="Restaurants & Bars"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col justify-center px-10 md:px-16 py-16"
        >
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-serif text-ink mb-6 leading-tight">
            Restaurants &amp; Bars
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-500 font-light leading-relaxed mb-10 max-w-md">
            Embark on a culinary journey through the flavours of Rajasthan and beyond. 
            Let us inspire you with the indulgent elegance of royal recipes, artisan 
            cocktails, and authentic farm-to-table dining experiences curated exclusively 
            for our guests.
          </p>

          {/* Divider */}
          <div className="w-12 h-[1px] bg-gold/40 mb-8" />

          {/* Restaurant list */}
          <ul className="divide-y divide-gray-100">
            {restaurants.map((r, idx) => (
              <li key={r.name}>
                <button
                  className="w-full text-left py-5 flex items-center justify-between group"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <span
                    className={`text-2xl md:text-3xl font-serif transition-colors duration-300 ${
                      hoveredIdx === idx ? 'text-gold' : 'text-ink'
                    }`}
                  >
                    {r.name}
                  </span>

                  {/* Arrow appears on hover */}
                  <AnimatePresence>
                    {hoveredIdx === idx && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center space-x-2 shrink-0 ml-4"
                      >
                        <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                          {r.type}
                        </span>
                        <ArrowRight className="w-5 h-5 text-gold" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            ))}
          </ul>

          {/* Show All button */}
          <div className="mt-10">
            <button className="border border-ink text-ink px-10 py-4 text-xs uppercase tracking-[0.25em] font-bold hover:bg-ink hover:text-white transition-all duration-300">
              Show All
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default RestaurantListSection;
