import { motion } from 'framer-motion';
import { values } from '../../data/about';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import { fadeUp, stagger } from '../ui/animations';

export default function ValuesSection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-section">
      <Container>
        <SectionHeader
          tag="Our Values"
          title="What Drives Us"
          description="The principles that guide every event we craft."
        />
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-bg-main border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <v.icon size={22} className="text-primary" />
              </div>
              <h3 className="[font-family:var(--font-title)] text-lg font-semibold text-text-main mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {v.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
