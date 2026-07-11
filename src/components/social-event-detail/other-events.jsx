import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { socialEventDetails } from '../../data/social-event-details';
import Container from '../ui/container';
import { fadeUp, stagger } from '../ui/animations';

export default function OtherEventsSection({ currentSlug }) {
  const others = socialEventDetails.filter((e) => e.slug !== currentSlug);

  return (
    <section className="py-[var(--space-section)] bg-bg-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            Explore More
          </span>
          <h2 className="[font-family:var(--font-title)] text-3xl md:text-4xl font-semibold text-text-main leading-tight">
            Other Social Events
          </h2>
        </motion.div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {others.slice(0, 4).map((other) => {
            const Icon = other.icon;
            return (
              <motion.div key={other.slug} variants={fadeUp}>
                <Link
                  to={`/social-events/${other.slug}`}
                  className="group block rounded-2xl bg-bg-main border border-border/50 overflow-hidden hover:border-accent/30 transition-all duration-300"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={other.images[0]}
                      alt={other.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon size={16} className="text-white" />
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="[font-family:var(--font-title)] text-base font-semibold text-text-main mb-1">
                      {other.title}
                    </h3>
                    <p className="text-text-secondary text-xs leading-relaxed mb-2 line-clamp-2">
                      {other.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:gap-1.5 transition-all">
                      View details <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
