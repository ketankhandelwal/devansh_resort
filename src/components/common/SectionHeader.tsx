import { motion } from 'motion/react';
import OrnamentDivider from './OrnamentDivider';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="text-center mb-16">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-serif text-ink mb-4"
    >
      {title}
    </motion.h2>
    <OrnamentDivider lineWidth="w-12" />
    <p className="mt-4 text-xs uppercase tracking-[0.4em] text-gold font-medium">{subtitle}</p>
  </div>
);

export default SectionHeader;
