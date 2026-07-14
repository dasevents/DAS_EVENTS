import { motion } from 'framer-motion';
import { serviceDetails } from '../data/service-details';
import Divider from '../components/ui/divider';
import HeroSection from '../components/services/hero';
import Container from '../components/ui/container';
import SectionHeader from '../components/ui/section-header';
import GradientCTA from '../components/ui/gradient-cta';
import { fadeUp, stagger } from '../components/ui/animations';
import { corporateServices } from '../data/corporate-events';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Services() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection />
      <Divider spacing="none" />

      <section className="py-[var(--space-section)] bg-bg-main">
        <Container>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {serviceDetails.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.slug} variants={item}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="group relative flex flex-col h-full rounded-3xl bg-bg-section border border-border/40 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
                  >
                    <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden">
                      <img
                        src={s.heroImage}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      <div className="absolute top-3 right-3">
                        <span className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white transition-all duration-300 group-hover:bg-white/25 group-hover:scale-110">
                          <Icon size={14} className="md:size-4" />
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <h3 className="[font-family:var(--font-title)] text-base md:text-lg font-semibold text-white leading-tight">
                          {s.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 p-3 md:p-4">
                      <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-3">
                        {s.tagline}
                      </p>

                      <div className="mt-auto pt-3 border-t border-border/30">
                        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
                          Explore More
                          <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                            <ArrowUpRight size={10} className="md:size-3" />
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

      <Divider spacing="none" />

      <section className="py-[var(--space-section)] bg-bg-section">
        <Container>
          <SectionHeader
            tag="Full-Service"
            title="Event management Services"
            description="We handle every aspect of your corporate event, from initial planning to post-event evaluation."
          />
          <motion.div
            variants={stagger()}
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

      <Divider spacing="none" />
      <GradientCTA
        title="Let's Create the Show"
        description="Share your vision, let us bring your entertainment event to life."
        primaryLabel="Call Us"
        primaryLink="/contact"
        secondaryLabel="All Services"
        secondaryLink="/services"
      />
    </motion.div>
  );
}
