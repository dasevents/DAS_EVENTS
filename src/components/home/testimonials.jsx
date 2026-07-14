import { Star } from 'lucide-react';
import { testimonials } from '../../data/home';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import LogoLoop from '../ui/logo-loop';

const reviewCards = testimonials.map((t) => ({
  ...t,
  node: (
    <div className="w-[340px] shrink-0 bg-bg-section border border-border/50 rounded-2xl p-6 flex flex-col">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-text-secondary text-sm leading-relaxed flex-1">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-xs font-semibold text-primary">
            {t.name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="text-sm font-semibold text-text-main">{t.name}</div>
          <div className="text-xs text-text-secondary">{t.role}</div>
        </div>
      </div>
    </div>
  ),
}));

export default function Testimonials() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main overflow-hidden">
      <Container>
        <SectionHeader
          tag="Testimonials"
          title="What Our Clients Say"
          description="Real experiences from people who trusted us with their special moments."
          className="!mb-0 !md:mb-0"
        />
      </Container>

      <div className="mt-0">
        <LogoLoop
          logos={reviewCards}
          speed={60}
          direction="left"
          hoverSpeed={0}
          gap={16}
          logoHeight={200}
          fadeOut
          fadeOutColor="var(--bg-main)"
          ariaLabel="Client testimonials"
        />
      </div>
    </section>
  );
}
