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
          title="Corporate Events We Manage in Bangalore"
          description="As a trusted Corporate Event Management Company in Bangalore, we plan and execute everything from intimate board meetings to large-scale annual celebrations. Our team delivers every event with creativity, professionalism, and flawless execution."
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