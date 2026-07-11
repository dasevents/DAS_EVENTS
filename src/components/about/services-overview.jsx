import { motion } from 'framer-motion';
import { ArrowRight, Building2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { corporateServices, socialServices } from '../../data/about';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';

export default function ServicesOverview() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <SectionHeader
          tag="Our Expertise"
          title="Services We Offer"
          description="Comprehensive event management across every occasion."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Corporate Events', icon: Building2, data: corporateServices, to: '/corporate-events' },
            { title: 'Social Events', icon: Heart, data: socialServices, to: '/social-events' },
          ].map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col p-8 rounded-2xl bg-bg-section border border-border/50"
            >
              <h3 className="[font-family:var(--font-title)] text-xl font-semibold text-text-main mb-5 flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <section.icon size={18} className="text-primary" />
                </span>
                {section.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                {section.data.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-bg-main border border-border/50 text-sm text-text-secondary">
                    <s.icon size={14} className="text-primary shrink-0" />
                    <span className="truncate">{s.label}</span>
                  </div>
                ))}
              </div>
              <Link to={section.to} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-6 hover:gap-2.5 transition-all">
                View all <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
