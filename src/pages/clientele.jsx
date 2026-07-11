import { motion } from 'framer-motion';
import HeroSection from '../components/ui/hero-section';
import Divider from '../components/ui/divider';
import Container from '../components/ui/container';
import SectionHeader from '../components/ui/section-header';
import { Building2, Users, Award, TrendingUp } from 'lucide-react';

const clients = [
  { name: 'TechCorp India', industry: 'Technology', events: 'Annual Conferences, Product Launches' },
  { name: 'Infosys', industry: 'IT Services', events: 'Team Building, Corporate Retreats' },
  { name: 'Wipro', industry: 'Technology', events: 'Annual Days, Business Dinners' },
  { name: 'TCS', industry: 'IT Services', events: 'Conferences, Award Ceremonies' },
  { name: 'Reliance', industry: 'Conglomerate', events: 'Product Launches, Galas' },
  { name: 'HDFC Bank', industry: 'Banking', events: 'Corporate Events, Seminars' },
  { name: 'Mahindra', industry: 'Automobile', events: 'Dealer Meets, Launches' },
  { name: 'Flipkart', industry: 'E-Commerce', events: 'Team Events, Town Halls' },
];

const stats = [
  { icon: Building2, value: '200+', label: 'Corporate Clients' },
  { icon: Users, value: '500+', label: 'Events Delivered' },
  { icon: Award, value: '50+', label: 'Industry Awards' },
  { icon: TrendingUp, value: '95%', label: 'Client Retention' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
            description="Proud to serve leading organizations across diverse industries."
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {clients.map((client, i) => (
              <motion.div
                key={i}
                variants={item}
                className="p-5 md:p-6 rounded-2xl bg-bg-section border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 size={22} className="text-primary" />
                </div>
                <h3 className="[font-family:var(--font-title)] text-lg font-semibold text-text-main mb-1">
                  {client.name}
                </h3>
                <p className="text-xs text-primary font-medium mb-2">{client.industry}</p>
                <p className="text-sm text-text-secondary">{client.events}</p>
              </motion.div>
            ))}
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
