import { motion } from 'framer-motion';
import { socialEvents } from '../../data/social-events';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import { stagger } from '../ui/animations';
import ImageCard from '../ui/image-card';

function EventsSection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <SectionHeader
          tag="Celebrations"
          title="Social Events Managed by DAS events"
          description="As a leading Social Event Planner in Bangalore, we turn every celebration into a memorable experience with personalized planning and seamless execution."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {socialEvents.map((event) => (
            <ImageCard
              key={event.id}
              linkTo={`/social-events/${event.id}`}
              image={event.image}
              title={event.title}
              icon={event.icon}
              description={event.shortDescription}
              features={event.features.slice(0, 4)}
              accent="accent"
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default EventsSection;
