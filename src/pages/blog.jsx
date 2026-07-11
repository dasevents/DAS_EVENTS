import { motion } from 'framer-motion';
import HeroSection from '../components/ui/hero-section';
import Container from '../components/ui/container';
import { PenLine } from 'lucide-react';

export default function BlogPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection
        tag="Blog"
        title="Event Insights & Ideas"
        subtitle="Stay updated with the latest trends, tips, and inspiration for planning extraordinary events."
      />

      <section className="py-20 md:py-32 bg-bg-main">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <PenLine size={32} className="text-primary" />
            </div>
            <h2 className="[font-family:var(--font-title)] text-2xl md:text-3xl font-semibold text-text-main mb-4">
              Coming Soon
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              We're crafting insightful articles about event planning, industry trends, and creative ideas. Stay tuned for valuable content coming your way soon.
            </p>
          </motion.div>
        </Container>
      </section>
    </motion.div>
  );
}
