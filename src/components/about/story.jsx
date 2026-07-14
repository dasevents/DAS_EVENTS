import { motion } from 'framer-motion';
import { aboutStory } from '../../data/about';
import Container from '../ui/container';

export default function StorySection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <div className="relative rounded-3xl bg-gradient-to-br from-primary to-primary-hover p-6 sm:p-10 md:p-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/15 text-white text-xs md:text-sm font-medium mb-4 border border-white/20">
                Our Story
              </span>
              <h2 className="[font-family:var(--font-title)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {aboutStory.title}
              </h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-medium">
                {aboutStory.subtitle}
              </p>
              <div className="space-y-4">
                {aboutStory.paragraphs.map((p, i) => (
                  <p key={i} className="text-white/70 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-lg md:text-xl font-semibold text-white italic">
                  {aboutStory.tagline}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
