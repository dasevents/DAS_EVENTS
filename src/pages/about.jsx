import Divider from '../components/ui/divider';
import HeroSection from '../components/about/hero';
import StorySection from '../components/about/story';
import ValuesSection from '../components/about/values';
import FounderSection from '../components/about/founder';
import Stats from '../components/ui/stats';
import CTASection from '../components/about/cta';
import { useEffect } from 'react';

export default function AboutPage() {
  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Learn about DAS Events, a trusted event management company in Bangalore committed to delivering innovative, memorable, and seamless events.'
      );
    }
  }, []);

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
