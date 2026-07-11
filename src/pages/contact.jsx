import { motion } from 'framer-motion';
import Divider from '../components/ui/divider';
import HeroSection from '../components/contact/hero';
import ContactFormSection from '../components/contact/form';
import MapSection from '../components/contact/map';

export default function Contact() {
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
