import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Container from './container';

export default function OverviewSection({
  slug,
  title,
  description,
  longDescription,
  highlights = [],
  images = [],
  accent = 'primary',
  showAboutPrefix = true,
}) {
  let headingText;
  const isHotel = title?.toLowerCase().includes('hotel booking service');
  const isEventManagement = title?.toLowerCase().includes('event management service');
  if (isEventManagement) {
    headingText = 'About Event Management Services';
  }
  else if (isHotel) {
    headingText = 'Hotel Accommodation Assistance';
  }
  else if (showAboutPrefix) {
    headingText = `About ${title}`;
  }
  else {
    headingText = title;
  }
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
            <span className={`inline-block px-4 py-1.5 rounded-full bg-${accent}/10 border border-${accent}/20 text-${accent} text-sm font-medium mb-5`}>
              Overview
            </span>
            <h2 className="[font-family:var(--font-title)] text-3xl md:text-4xl font-semibold text-text-main leading-tight mb-6">
              {headingText}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">{description}</p>
            <p className="text-text-secondary leading-relaxed mb-8">{longDescription}</p>
            <div className="space-y-3">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-full bg-${accent}/10 flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check size={12} className={`text-${accent}`} />
                  </span>
                  <span className="text-text-secondary">{h}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {images.map((img, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 h-64' : 'h-40'}`}
              >
                <img
                  src={img}
                  alt={`${title} ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
