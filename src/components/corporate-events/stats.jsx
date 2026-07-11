import { motion } from 'framer-motion';
import { corporateStats } from '../../data/corporate-events';
import Container from '../ui/container';
import { fadeUp, stagger } from '../ui/animations';
import CountUp from '../ui/count-up';

export default function StatsSection() {
  return (
    <section className="py-16 bg-bg-main">
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {corporateStats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center p-6 rounded-2xl bg-bg-section border border-border/50"
            >
              <div className="[font-family:var(--font-title)] text-3xl md:text-4xl font-bold text-primary mb-1">
                <CountUp value={stat.value} />
              </div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}