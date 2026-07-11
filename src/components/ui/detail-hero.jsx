import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Container from './container';

export default function DetailHero({ title, tagline, icon: Icon, heroImage, backLink, backLabel, badgeLabel }) {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-section overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <Link
            to={backLink}
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            {backLabel}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon size={24} className="text-white" />
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
              {badgeLabel}
            </span>
          </div>
          <h1 className="[font-family:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            {tagline}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
