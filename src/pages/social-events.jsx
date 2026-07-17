import { motion } from 'framer-motion';
import Divider from '../components/ui/divider';
import HeroSection from '../components/social-events/hero';
import EventsSection from '../components/social-events/events';
import CTASection from '../components/social-events/cta';
import { useEffect } from 'react';

export default function SocialEvents() {
  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Create unforgettable social events with DAS Events. We organize birthdays, anniversaries, private celebrations, and customized social gatherings.'
      );
    }
  }, []);

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
