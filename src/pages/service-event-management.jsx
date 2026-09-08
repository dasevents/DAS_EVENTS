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

const SLUG = 'event-management';

export default function ServiceEventManagement() {
  const service = getServiceBySlug(SLUG);

  useEffect(() => {
    document.title = 'Professional Event Management Services | DAS Events';
    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription?.setAttribute(
      'content',
      'From planning to execution, DAS Events delivers professional event management services for corporate, social, and entertainment events.'
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
