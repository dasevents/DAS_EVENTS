import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { fadeUp } from './animations';

export default function ImageCard({
  title,
  image,
  icon: Icon,
  description,
  features = [],
  linkTo,
  linkLabel = 'Explore service',
  accent = 'primary',
}) {
  return (
    <motion.div variants={fadeUp} className="h-full">
      <Link
        to={linkTo}
        className="group relative flex flex-col h-full rounded-3xl bg-bg-section border border-border/40 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute top-4 right-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white transition-all duration-300 group-hover:bg-white/25 group-hover:scale-110">
              <Icon size={18} />
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="[font-family:var(--font-title)] text-xl font-semibold text-white leading-tight">
              {title}
            </h3>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5">
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {description}
          </p>

          {features.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5">
              {features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 shrink-0">
                    <Check size={10} className="text-primary" />
                  </span>
                  <span className="truncate">{f}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-border/30">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
              {linkLabel}
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                <ArrowUpRight size={14} />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
