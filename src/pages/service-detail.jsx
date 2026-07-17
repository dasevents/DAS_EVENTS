import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getServiceBySlug } from '../data/service-details';
import Divider from '../components/ui/divider';
import HeroSection from '../components/service-detail/hero';
import OverviewSection from '../components/service-detail/overview';
import SubServicesSection from '../components/service-detail/sub-services';
import CTASection from '../components/service-detail/cta';
import OtherServicesSection from '../components/service-detail/other-services';
import { useEffect } from 'react';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      if (service?.slug === 'entertainment-events') {
        document.title = 'Entertainment Event Management | DAS Events Bangalore';
      
        metaDescription.setAttribute(
          'content',
          'Elevate your event with professional entertainment event management, live performances, artists, celebrity management, and engaging experiences.'
        );
      }
      if (service?.slug === 'event-management') {
        document.title = 'Professional Event Management Services | DAS Events';
      
        metaDescription.setAttribute(
          'content',
          'From planning to execution, DAS Events delivers professional event management services for corporate, social, and entertainment events.'
        );
      }
      if (service?.slug === 'hotel-booking') {
        document.title = 'Corporate Hotel Booking Services | DAS Events';
      
        metaDescription.setAttribute(
          'content',
          'Simplify corporate travel with our hotel booking services for conferences, business meetings, exhibitions, and group event accommodations.'
        );
      }
    }
  }, [service]);

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
      <OtherServicesSection currentSlug={slug} />
    </motion.div>
  );
}
