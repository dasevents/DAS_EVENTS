import { motion } from 'framer-motion';
import socials from '../../data/social-links';

export default function SocialFloat() {
  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col items-center gap-3">
      {socials.map((s, i) => (
        <motion.a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.35, ease: 'easeOut' }}
          whileHover={{ scale: 1.15 }}
          className="group relative w-8 h-8 flex items-center justify-center hover:scale-125 transition-transform duration-300"
        >
          <img src={s.logo} alt={s.name} className="w-8 h-8 object-contain" />
          <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-bg-section border border-border text-xs text-text-main font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
            {s.name}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
