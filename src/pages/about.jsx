import Divider from '../components/ui/divider';
import HeroSection from '../components/about/hero';
import StorySection from '../components/about/story';
import ValuesSection from '../components/about/values';
import FounderSection from '../components/about/founder';
import Stats from '../components/ui/stats';
import CTASection from '../components/about/cta';

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <Divider spacing="none" />
      <StorySection />
      <Divider spacing="none" />
      <ValuesSection />
      <Divider spacing="none" />
      <FounderSection />
      <Divider spacing="none" />
      <Stats />
      <Divider spacing="none" />
      <CTASection />
    </>
  );
}
