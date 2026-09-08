import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { getServiceBySlug } from '../data/service-details';
import Divider from '../components/ui/divider';
import HeroSection from '../components/service-detail/hero';
import OverviewSection from '../components/service-detail/overview';
import SubServicesSection from '../components/service-detail/sub-services';
import CTASection from '../components/service-detail/cta';
import OtherServicesSection from '../components/service-detail/other-services';

const SLUG = 'entertainment-events';

export default function ServiceEntertainmentEvents() {
  const service = getServiceBySlug(SLUG);

  useEffect(() => {
    document.title = 'Entertainment Event Management | DAS Events Bangalore';
    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription?.setAttribute(
      'content',
      'Elevate your event with professional entertainment event management, live performances, artists, celebrity management, and engaging experiences.'
    );
  }, []);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection service={service} />
      <Divider spacing="none" />
      <OverviewSection service={service} />
      <Divider spacing="none" />
      <SubServicesSection service={service} />
      <Divider spacing="none" />
      <CTASection service={service} />
      <Divider spacing="none" />
      <OtherServicesSection currentSlug={SLUG} />
    </motion.div>
  );
}
