import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

const posts = [
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400"
];

const SocialGrid = () => {
  return (
    <section className="py-32 bg-cream/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Show us your @Devansh</h2>
          <p className="text-sm text-gray-500 tracking-widest uppercase">Share your moments with us using #DevanshMoments</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square overflow-hidden group"
            >
              <img src={post} className="w-full h-full object-cover" alt="Social" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white w-8 h-8" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialGrid;
