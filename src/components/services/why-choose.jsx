import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { whyChooseUs } from '../../data/services';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import Button from '../ui/button';
import CountUp from '../ui/count-up';

export default function WhyChooseSection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              tag="Why DAS EVENTS"
              title="Why Choose Us"
              align="left"
            />
            <div className="space-y-4">
              {whyChooseUs.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-primary" />
                  </span>
                  <span className="text-text-secondary leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/contact">
                <Button variant="primary" size="lg">
                  Get a Quote <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 p-10 md:p-14">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '450+', label: 'Events Managed' },
                  { value: '2000+', label: 'Happy Clients' },
                  { value: '4+', label: 'Years of Excellence' },
                  { value: '95%', label: 'Satisfaction Rate' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="[font-family:var(--font-title)] text-3xl font-bold text-primary mb-1">
                      <CountUp value={stat.value} />
                    </div>
                    <div className="text-text-secondary text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
