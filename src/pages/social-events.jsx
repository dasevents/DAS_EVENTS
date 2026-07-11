import { motion } from 'framer-motion';
import Divider from '../components/ui/divider';
import HeroSection from '../components/social-events/hero';
import EventsSection from '../components/social-events/events';
import CTASection from '../components/social-events/cta';

export default function SocialEvents() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection />
      <Divider spacing="none" />
      <EventsSection />
      <Divider spacing="none" />
      <CTASection />
    </motion.div>
  );
}
