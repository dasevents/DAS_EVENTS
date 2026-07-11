import { motion } from 'framer-motion';
import { stats } from '../../data/home';
import Container from './container';
import CountUp from './count-up';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Stats() {
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
          <h2 className="[font-family:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-semibold text-text-main leading-tight">
            The Numbers Behind the Magic
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <stat.icon size={24} className="text-primary" />
              </div>
              <div className="[font-family:var(--font-title)] text-3xl md:text-4xl font-bold text-text-main">
                <CountUp value={stat.value} />
              </div>
              <div className="text-sm text-text-secondary mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
