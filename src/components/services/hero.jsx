import HeroSection from '../ui/hero-section';
import { servicesHero } from '../../data/services';

export default function Hero() {
  return <HeroSection tag={servicesHero.tag} title={servicesHero.title} subtitle={servicesHero.subtitle} />;
}
