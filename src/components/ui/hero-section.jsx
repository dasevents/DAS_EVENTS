import { motion } from 'framer-motion';
import Container from './container';

const accents = {
  primary: {
    bg: 'bg-primary/5',
    badge: 'bg-primary/10 border-primary/20 text-primary',
  },
  accent: {
    bg: 'bg-accent/5',
    badge: 'bg-accent/10 border-accent/20 text-accent',
  },
};

export default function HeroSection({ tag, title, subtitle, accent = 'primary' }) {
  const a = accents[accent];

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-section overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/4 right-0 w-96 h-96 ${a.bg} rounded-full blur-3xl`} />
        <div className={`absolute bottom-0 left-1/4 w-64 h-64 ${a.bg} rounded-full blur-3xl`} />
      </div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {tag && (
            <span className={`inline-block px-4 py-1.5 rounded-full ${a.badge} border text-sm font-medium mb-5`}>
              {tag}
            </span>
          )}
          <h1 className="[font-family:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-semibold text-text-main leading-tight mb-4">
            {title}
          </h1>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
