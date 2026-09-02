import { motion } from 'framer-motion';
import { corporateFaqs } from '../../data/corporate-events';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import Accordion from '../ui/accordion';
import { fadeUp } from '../ui/animations';

export default function FaqSection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <SectionHeader
          tag="FAQs"
          title="Frequently Asked Questions"
          description="Answers to common questions about our corporate event management services in Bangalore."
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Accordion items={corporateFaqs} columns={2} />
        </motion.div>
      </Container>
    </section>
  );
}
