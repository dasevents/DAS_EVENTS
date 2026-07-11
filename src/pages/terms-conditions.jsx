import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { termsContent } from '../data/terms';
import Container from '../components/ui/container';
import Divider from '../components/ui/divider';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export default function TermsConditions() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-section overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>
            <h1 className="[font-family:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-semibold text-text-main leading-tight mb-3">
              {termsContent.title}
            </h1>
            <p className="text-text-secondary text-sm">
              Last updated: {termsContent.lastUpdated}
            </p>
          </motion.div>
        </Container>
      </section>

      <Divider spacing="none" />

      <section className="py-[var(--space-section)] bg-bg-main">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-3xl space-y-8"
          >
            {termsContent.sections.map((section, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <div>
                    <h2 className="[font-family:var(--font-title)] text-xl font-semibold text-text-main mb-3">
                      {section.title}
                    </h2>
                    <p className="text-text-secondary leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </motion.div>
  );
}
