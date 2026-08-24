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

    const schemaScript = document.createElement('script');
    schemaScript.id = 'homepage-schema';
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://www.dasevents.in/#business',
      name: 'DAS Events',
      url: 'https://www.dasevents.in/',
      logo: 'https://www.dasevents.in/assets/DAS-EVENT-logo-Bz9jGpRV.png',
      image: 'https://www.dasevents.in/assets/DAS-EVENT-logo-Bz9jGpRV.png',
      description:
        'DAS Events is an event management company in Bangalore offering wedding planning, wedding decoration, corporate events and other event management services.',
      telephone: '+91-95910-36303',
      email: 'asitkumar@dasevents.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2nd Floor, 13/1, 2nd B Cross Rd, near SBI Bank, Sultanpalya, RT Nagar',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560032',
        addressCountry: 'IN',
      },
      areaServed: {
        '@type': 'City',
        name: 'Bengaluru',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '09:00',
          closes: '21:00',
        },
      ],
      sameAs: ['https://www.instagram.com/dasevents_official'],
    });
    document.head.appendChild(schemaScript);

    return () => {
      schemaScript.remove();
    };
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
