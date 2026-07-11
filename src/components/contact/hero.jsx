import HeroSection from '../ui/hero-section';
import { contactHero } from '../../data/contact';

export default function Hero() {
  return <HeroSection tag={contactHero.tag} title={contactHero.title} subtitle={contactHero.subtitle} />;
}
