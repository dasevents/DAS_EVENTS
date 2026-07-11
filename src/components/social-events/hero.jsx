import HeroSection from '../ui/hero-section';
import { socialHero } from '../../data/social-events';

export default function Hero() {
  return (
    <HeroSection
      tag={socialHero.tag}
      title={socialHero.title}
      subtitle={socialHero.subtitle}
      accent="accent"
    />
  );
}
