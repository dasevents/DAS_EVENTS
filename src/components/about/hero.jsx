import { aboutHero } from '../../data/about';
import HeroSection from '../ui/hero-section';

export default function AboutHero() {
  return (
    <HeroSection tag={aboutHero.tag} title={aboutHero.title} subtitle={aboutHero.subtitle} />
  );
}
