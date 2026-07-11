import { motion } from 'framer-motion';
import { aboutStory } from '../../data/about';
import Container from '../ui/container';

export default function StorySection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="[font-family:var(--font-title)] text-4xl md:text-5xl lg:text-6xl font-bold text-text-main mb-4">
              {aboutStory.title}
            </h2>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 font-medium">
              {aboutStory.subtitle}
            </p>
            <div className="space-y-4">
              {aboutStory.paragraphs.map((p, i) => (
                <p key={i} className="text-text-secondary leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-8 text-lg md:text-xl font-semibold text-primary italic">
              {aboutStory.tagline}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
