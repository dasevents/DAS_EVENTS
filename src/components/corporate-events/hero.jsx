import HeroSection from '../ui/hero-section';
import { corporateHero } from '../../data/corporate-events';

export default function Hero() {
  return (
    <HeroSection
      tag={corporateHero.tag}
      title={corporateHero.title}
      subtitle={corporateHero.subtitle}
    />
  );
}
