import { motion } from 'framer-motion';
import Divider from '../components/ui/divider';
import HeroSection from '../components/contact/hero';
import ContactFormSection from '../components/contact/form';
import MapSection from '../components/contact/map';
import { useEffect } from 'react';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact DAS Events | Event Management Company Bangalore';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Contact DAS Events to plan your next corporate, social, or entertainment event. Get expert event management solutions in Bangalore.'
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
      <ContactFormSection />
      <Divider spacing="none" />
      <MapSection />
    </motion.div>
  );
}
