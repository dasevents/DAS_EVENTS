import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { featuredEvents } from '../../data/home';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import Badge from '../ui/badge';
import Card from '../ui/cards';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturedEvents() {
  return (
    <section className="py-[var(--space-section)] bg-bg-section">
      <Container>
        <SectionHeader
          tag="Featured Events"
          title="Moments We've Created"
          description="Discover some of our most memorable events that left lasting impressions."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {featuredEvents.map((event) => (
            <motion.div key={event.id} variants={item}>
              <Card variant="elevated" padding="lg" hoverable className="h-full group">
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-xl bg-${event.color}/10 flex items-center justify-center`}>
                    <event.icon size={24} className={`text-${event.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge color={event.color === 'accent' ? 'accent' : event.color === 'secondary' ? 'secondary' : 'primary'} size="sm">
                        {event.category}
                      </Badge>
                      <span className="text-xs text-text-secondary">{event.date}</span>
                    </div>
                    <h3 className="[font-family:var(--font-title)] text-xl font-semibold text-text-main mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                      {event.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-300">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
