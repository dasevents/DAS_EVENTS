import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './container';
import Button from './button';

export default function GradientCTA({
  title,
  description,
  gradient = 'from-primary to-primary-hover',
  primaryLabel = 'Get a Quote',
  primaryLink = '/contact',
  secondaryLabel,
  secondaryLink,
}) {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <div className={`relative rounded-3xl bg-gradient-to-br ${gradient} p-6 sm:p-10 md:p-16 text-center overflow-hidden`}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          </div>
          <div className="relative z-10">
            <h2 className="[font-family:var(--font-title)] text-3xl md:text-4xl font-semibold text-white mb-4">
              {title}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={primaryLink}>
                <Button variant="ghost" size="lg" className="text-white bg-white/10 hover:bg-white/20 border border-white/30">
                  {primaryLabel} <ArrowRight size={16} />
                </Button>
              </Link>
              {secondaryLabel && (
                <Link to={secondaryLink}>
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    {secondaryLabel}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
