import { motion } from 'framer-motion';
import HeroSection from '../components/ui/hero-section';
import Divider from '../components/ui/divider';
import Container from '../components/ui/container';
import SectionHeader from '../components/ui/section-header';
import { Building2, Users, Award, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Building2, value: '200+', label: 'Corporate Clients' },
  { icon: Users, value: '500+', label: 'Events Delivered' },
  { icon: Award, value: '50+', label: 'Industry Awards' },
  { icon: TrendingUp, value: '95%', label: 'Client Retention' },
];

export default function ClientelePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection
        tag="Our Clientele"
        title="Trusted by Leading Brands"
        subtitle="We partner with industry leaders to create extraordinary corporate experiences that drive results."
      />
      <Divider spacing="none" />

      <section className="py-16 md:py-20 lg:py-[var(--space-section)] bg-bg-main">
        <Container>
          <SectionHeader
            tag="Our Partners"
            title="Brands We've Worked With"
            description="Our client showcase is coming soon. We're excited to share our work with industry leaders."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Building2 size={32} className="text-primary" />
            </div>
            <h3 className="[font-family:var(--font-title)] text-2xl md:text-3xl font-bold text-text-main mb-3">
              Coming Soon
            </h3>
            <p className="text-text-secondary max-w-md">
              We're showcasing our impressive portfolio of clients. Stay tuned for exciting updates!
            </p>
          </motion.div>
        </Container>
      </section>

      <Divider spacing="none" />

      <section className="py-16 md:py-20 bg-bg-section">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                  <stat.icon size={24} className="text-primary" />
                </div>
                <div className="[font-family:var(--font-title)] text-3xl md:text-4xl font-bold text-text-main">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </motion.div>
  );
}
