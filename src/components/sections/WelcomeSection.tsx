import { motion } from 'motion/react';
import OrnamentDivider from '../common/OrnamentDivider';

const WelcomeSection = () => {
  return (
    <section className="pt-48 pb-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-serif text-ink mb-10">Stay &amp; Revel</h2>
          <OrnamentDivider lineWidth="w-24" className="mb-10" />
          <p className="text-lg text-gray-600 font-light leading-relaxed italic">
            "Discover a world where timeless elegance meets modern luxury. At Devansh, we curate experiences that transcend the ordinary, offering you a sanctuary of peace and refinement in the heart of Udaipur's majestic landscape."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;
