import { motion } from 'framer-motion';
import { howWeWork } from '../../data/home';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowWeWork() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <SectionHeader
          tag="Our Approach"
          title="How We Work"
          description="Thoughtfully planned and professionally executed from your first conversation to your final celebration."
        />

        <div className="relative">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12"
          >
            {howWeWork.map((step, i) => (
              <motion.div key={i} variants={item} className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                      <span className="[font-family:var(--font-title)] text-2xl font-bold text-primary">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="[font-family:var(--font-title)] text-xl font-semibold text-text-main mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed sm:max-w-[280px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
