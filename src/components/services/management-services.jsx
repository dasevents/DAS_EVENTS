import { motion } from 'framer-motion';
import { eventManagementServices } from '../../data/services';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import { fadeUp, stagger } from '../ui/animations';

export default function ManagementServicesSection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-section">
      <Container>
        <SectionHeader
          tag="Full-Service"
          title="Event Management Services"
          description="We handle every aspect of your event, from initial concept to post-event evaluation."
        />
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {eventManagementServices.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-3 p-4 rounded-xl bg-bg-main border border-border/50 hover:border-primary/30 transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <service.icon size={18} className="text-primary" />
              </span>
              <div>
                <div className="text-sm font-medium text-text-main">{service.label}</div>
                <div className="text-xs text-text-secondary mt-0.5">{service.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
