import { motion } from 'motion/react';
import SectionHeader from '../common/SectionHeader';
import OrnamentDivider from '../common/OrnamentDivider';

const suites = [
  {
    name: "Presidential Suite",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800",
    desc: "The pinnacle of luxury with panoramic views."
  },
  {
    name: "Luxury Suite",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
    desc: "Refined elegance for the discerning traveler."
  },
  {
    name: "Executive Suite",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800",
    desc: "Perfect balance of comfort and style."
  }
];

const StaySection = () => {
  return (
    <section className="py-32 bg-cream/30 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Stay &amp; Revel" subtitle="Accommodations" />

        <OrnamentDivider className="mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {suites.map((suite, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-6 shadow-xl">
                <img
                  src={suite.image}
                  alt={suite.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button className="w-full bg-white text-ink py-4 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-white transition-colors">
                    Explore Suite
                  </button>
                </div>
              </div>
              <h3 className="text-2xl font-serif text-center mb-2">{suite.name}</h3>
              <p className="text-center text-sm text-gray-500 font-light italic">{suite.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaySection;
