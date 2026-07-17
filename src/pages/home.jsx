import Hero from '../components/home/hero';
import About from '../components/home/about';
import Services from '../components/home/services';
import Stats from '../components/ui/stats';
import HowWeWork from '../components/home/how-we-work';
import Testimonials from '../components/home/testimonials';
import CTA from '../components/home/cta';
import Divider from '../components/ui/divider';
import Container from '../components/ui/container';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Event Management Company in Bangalore | DAS Events';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'DAS Events is a leading event management company in Bangalore, specializing in corporate, social, entertainment, and customized event planning services.'
      );
    }
  }, []);
  return (
    <>
      <Hero />
      <Container><Divider spacing="none" /></Container>
      <About />
      <Container><Divider spacing="none" /></Container>
      <Services />
      <Container><Divider spacing="none" /></Container>
      <Stats />
      <Container><Divider spacing="none" /></Container>
      <HowWeWork />
      <Container><Divider spacing="none" /></Container>
      <Testimonials />
      <Container><Divider spacing="none" /></Container>
      <CTA />
    </>
  );
}
