import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCorporateEventBySlug } from '../data/corporate-event-details';
import Divider from '../components/ui/divider';
import HeroSection from '../components/corporate-event-detail/hero';
import OverviewSection from '../components/corporate-event-detail/overview';
import CTASection from '../components/corporate-event-detail/cta';
import OtherEventsSection from '../components/corporate-event-detail/other-events';

export default function CorporateEventDetail() {
  const { slug } = useParams();
  const event = getCorporateEventBySlug(slug);

  if (!event) {
    return <Navigate to="/corporate-events" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection event={event} />
      <Divider spacing="none" />
      <OverviewSection event={event} />
      <Divider spacing="none" />
      <CTASection event={event} />
      <Divider spacing="none" />
      <OtherEventsSection currentSlug={slug} />
    </motion.div>
  );
}
