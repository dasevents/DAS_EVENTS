import { motion } from 'framer-motion';
import { corporateServices } from '../../data/corporate-events';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import { fadeUp, stagger } from '../ui/animations';

export default function ServicesSection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-section">
      <Container>
        <SectionHeader
          tag="Full-Service"
          title="Our Corporate Services"
          description="We handle every aspect of your corporate event, from initial planning to post-event evaluation."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {corporateServices.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-center gap-3 p-4 rounded-xl bg-bg-main border border-border/50 hover:border-primary/30 transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <service.icon size={18} className="text-primary" />
              </span>
              <span className="text-sm font-medium text-text-main">{service.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}