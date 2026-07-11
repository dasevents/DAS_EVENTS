import { motion } from 'framer-motion';
import Container from '../ui/container';

export default function FounderSection() {
  return (
    <section className="py-16 md:py-20 lg:py-[var(--space-section)] bg-bg-main">
      <Container>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-3 md:mb-4 border border-primary/20">
              Meet Our Founder
            </span>
            <h2 className="[font-family:var(--font-title)] text-2xl md:text-3xl lg:text-4xl font-semibold text-text-main leading-tight mb-4 md:mb-6">
              Asit Kumar Das
            </h2>
            <div className="space-y-3 md:space-y-4 text-text-secondary text-sm md:text-base leading-relaxed">
              <p>
                Asit Kumar Das is the Founder of DAS Events, bringing with him more than two decades of experience in the hospitality and hotel industry. Having worked closely with leading hotels and managed diverse client experiences, he developed a deep understanding of guest expectations, event planning, and seamless service delivery.
              </p>
              <p>
                Driven by a passion for creating memorable experiences, Asit founded DAS Events to transform ideas into extraordinary celebrations. Combining industry expertise with a hands-on approach, he works closely with clients to turn vision into reality, delivering events that are thoughtfully planned, flawlessly executed, and truly unforgettable.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
