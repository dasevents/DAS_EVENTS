import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSocialEventBySlug } from '../data/social-event-details';
import Divider from '../components/ui/divider';
import HeroSection from '../components/social-event-detail/hero';
import OverviewSection from '../components/social-event-detail/overview';
import CTASection from '../components/social-event-detail/cta';
import OtherEventsSection from '../components/social-event-detail/other-events';

export default function SocialEventDetail() {
  const { slug } = useParams();
  const event = getSocialEventBySlug(slug);

  if (!event) {
    return <Navigate to="/social-events" replace />;
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
