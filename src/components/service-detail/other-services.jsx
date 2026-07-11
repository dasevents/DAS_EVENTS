import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { serviceDetails } from '../../data/service-details';
import Container from '../ui/container';
import { fadeUp, stagger } from '../ui/animations';

export default function OtherServicesSection({ currentSlug }) {
  const others = serviceDetails.filter((s) => s.slug !== currentSlug);

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
            Explore More
          </span>
          <h2 className="[font-family:var(--font-title)] text-3xl md:text-4xl font-semibold text-text-main leading-tight">
            Other Services
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {others.map((other) => {
            const Icon = other.icon;
            return (
              <motion.div key={other.slug} variants={fadeUp}>
                <Link
                  to={`/services/${other.slug}`}
                  className="group block p-6 rounded-2xl bg-bg-main border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon size={22} className="text-primary" />
                  </span>
                  <h3 className="[font-family:var(--font-title)] text-lg font-semibold text-text-main mb-2">
                    {other.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-3">
                    {other.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
