import { motion } from 'framer-motion';
import HeroSection from '../components/ui/hero-section';

export default function Portfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection
        tag="Portfolio"
        title="Our Portfolio"
        subtitle="Explore our collection of successful events and memorable moments we've created for our clients."
      />
    </motion.div>
  );
}
