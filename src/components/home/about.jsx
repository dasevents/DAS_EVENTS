import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { about } from '../../data/home';
import Container from '../ui/container';

export default function About() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-base md:text-lg font-semibold border border-primary/20">
            {about.tag}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="[font-family:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-semibold text-text-main leading-tight">
              {about.title}
            </h2>
            <p className="mt-6 text-text-secondary text-lg leading-relaxed">
              {about.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {about.highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-bg-section border border-border/50"
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check size={16} className="text-primary" />
                </div>
                <span className="text-text-main text-sm font-medium leading-snug">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
