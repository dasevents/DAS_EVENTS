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

const SLUG = 'corporate-events';

export default function ServiceCorporateEvents() {
  const service = getServiceBySlug(SLUG);

  useEffect(() => {
    document.title = 'Corporate Event Management Services | DAS Events Bangalore';
    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription?.setAttribute(
      'content',
      'End-to-end corporate event management in Bangalore, from conferences and product launches to employee engagement and annual day celebrations.'
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
