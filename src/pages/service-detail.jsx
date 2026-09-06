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
    if (!service) return;
    const metaDescription = document.querySelector('meta[name="description"]');

    const overrides = {
      'corporate-events': {
        title: 'Corporate Event Management Services | DAS Events Bangalore',
        description: 'End-to-end corporate event management in Bangalore, from conferences and product launches to employee engagement and annual day celebrations.',
      },
      'social-events': {
        title: 'Social Event Management Services | DAS Events Bangalore',
        description: 'Weddings, engagements, anniversaries, and receptions planned and executed with elegance by DAS Events in Bangalore.',
      },
      'entertainment-events': {
        title: 'Entertainment Event Management | DAS Events Bangalore',
        description: 'Elevate your event with professional entertainment event management, live performances, artists, celebrity management, and engaging experiences.',
      },
      'event-management': {
        title: 'Professional Event Management Services | DAS Events',
        description: 'From planning to execution, DAS Events delivers professional event management services for corporate, social, and entertainment events.',
      },
      'hotel-booking': {
        title: 'Corporate Hotel Booking Services | DAS Events',
        description: 'Simplify corporate travel with our hotel booking services for conferences, business meetings, exhibitions, and group event accommodations.',
      },
    };

    // Every slug must have an entry here, else its title/description leaks from the previously visited page.
    const meta = overrides[service.slug] ?? { title: `${service.title} | DAS Events`, description: service.description };
    document.title = meta.title;
    metaDescription?.setAttribute('content', meta.description);
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
