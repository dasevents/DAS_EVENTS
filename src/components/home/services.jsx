import { motion } from 'framer-motion';
import { serviceDetails } from '../../data/service-details';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Services() {
  return (
    <section className="py-[var(--space-section)] bg-bg-section">
      <Container>
        <SectionHeader
          tag="What We Do"
          title="Our Services"
          description="Vision. Our Magic. One unforgettable Experience."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {serviceDetails.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.slug} variants={item} className="flex">
                <Link
                  to={`/services/${s.slug}`}
                  className="group relative flex flex-col w-full rounded-2xl bg-bg-main border border-border/40 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
                >
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={s.heroImage}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute top-3 right-3">
                      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white transition-all duration-300 group-hover:bg-white/25 group-hover:scale-110">
                        <Icon size={16} />
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="[font-family:var(--font-title)] text-lg font-semibold text-white leading-tight">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-4">
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                      {s.tagline}
                    </p>

                    <div className="mt-auto pt-3 border-t border-border/30">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
                        Learn More
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                          <ArrowUpRight size={12} />
                        </span>
                      </span>
                    </div>
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
