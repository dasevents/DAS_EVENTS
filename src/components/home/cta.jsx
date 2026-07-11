import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../ui/container';
import Button from '../ui/button';

export default function CTA() {
  return (
    <section className="py-[var(--space-section)] bg-bg-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-14 lg:p-20"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="[font-family:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              Ready to create something extraordinary?
            </h2>
            <p className="mt-4 text-white/80 text-lg leading-relaxed">
              Let's bring your vision to life. Get in touch today and let's start planning your next unforgettable event.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/contact">
                <Button
                  variant="accent"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="shadow-lg"
                >
                  Get a Quote
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="lg"
                icon={Phone}
                className="text-white hover:bg-white/10"
              >
                Call Us
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
