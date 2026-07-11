import { motion } from 'framer-motion';
import { corporateEvents } from '../../data/corporate-events';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import ImageCard from '../ui/image-card';
import { stagger } from '../ui/animations';

export default function EventsSection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <SectionHeader
          tag="What We Offer"
          title="Corporate Event Types"
          description="From intimate board meetings to grand annual celebrations, we handle every corporate occasion with professionalism and creativity."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {corporateEvents.map((event) => (
            <ImageCard
              key={event.id}
              linkTo={`/corporate-events/${event.id}`}
              image={event.image}
              title={event.title}
              icon={event.icon}
              description={event.shortDescription}
              features={event.features.slice(0, 4)}
              linkLabel="View details"
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}