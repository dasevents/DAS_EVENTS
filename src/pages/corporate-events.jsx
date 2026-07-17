import { motion } from 'framer-motion';
import Divider from '../components/ui/divider';
import HeroSection from '../components/corporate-events/hero';
import StatsSection from '../components/corporate-events/stats';
import EventsSection from '../components/corporate-events/events';
import ServicesSection from '../components/corporate-events/services';
import CTASection from '../components/corporate-events/cta';
import { useEffect } from 'react';

export default function CorporateEvents() {
  useEffect(() => {
    // document.title = 'Services | DAS Events';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Plan successful corporate events with DAS Events. We specialize in conferences, product launches, annual days, employee engagement, and business events.'
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
      <StatsSection />
      <Divider spacing="none" />
      <EventsSection />
      <Divider spacing="none" />
      <ServicesSection />
      <Divider spacing="none" />
      <CTASection />
    </motion.div>
  );
}
