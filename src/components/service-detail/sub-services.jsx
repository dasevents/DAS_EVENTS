import { motion } from 'framer-motion';
import Container from '../ui/container';
import { fadeUp, stagger } from '../ui/animations';

export default function SubServicesSection({ service }) {
  let headingText;
  switch (service.slug) {
    case 'hotel-booking':
      headingText = 'Our Hotel Booking Services';
      break;
    case 'entertainment-events':
      headingText = 'Our Entertainment Events Services';
      break;
      case 'event-management':
      headingText = 'Our Event Management Services';
      break;
    default:
      headingText = `Our ${service.title} Services`;
  }
  return (
    <section className="py-[var(--space-section)] bg-bg-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            What We Offer
          </span>
          <h2 className="[font-family:var(--font-title)] text-3xl md:text-4xl font-semibold text-text-main leading-tight">
            {headingText}
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {service.subServices.map((sub, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-bg-main border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <span className="[font-family:var(--font-title)] text-lg font-bold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="[font-family:var(--font-title)] text-lg font-semibold text-text-main mb-2">
                {sub.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {sub.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
