import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../ui/container';
import Button from '../ui/button';

export default function CTASection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto"
        >
          <h2 className="[font-family:var(--font-title)] text-3xl md:text-4xl font-semibold text-text-main mb-4">
            Ready to Plan Your Event?
          </h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Let's bring your vision to life. Get in touch and let's create something extraordinary together.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" icon={ArrowRight} iconPosition="right">
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
