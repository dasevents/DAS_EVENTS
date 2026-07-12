import { motion } from 'framer-motion';
import HeroSection from '../components/ui/hero-section';
import Divider from '../components/ui/divider';
import Container from '../components/ui/container';
import SectionHeader from '../components/ui/section-header';
import { clienteleLogos } from '../data/clientele';

export default function Portfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection
        tag="Portfolio"
        title="Our Portfolio"
        subtitle="Explore our collection of successful events and memorable moments we've created for our clients."
      />
      <Divider spacing="none" />

      <section className="py-16 md:py-20 lg:py-[var(--space-section)] bg-bg-main">
        <Container>
          <SectionHeader
            tag="Our Clients"
            title="Trusted by Leading Brands"
            description="We've had the privilege of working with some of the most respected brands in the industry."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
            {clienteleLogos.map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-center p-6 rounded-2xl bg-bg-section border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 md:h-14 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </motion.div>
  );
}
