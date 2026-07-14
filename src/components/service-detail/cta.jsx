import GradientCTA from '../ui/gradient-cta';

export default function CTA({ service }) {
  const isEntertainment = service.slug === 'entertainment-events';

  return (
    <GradientCTA
      title={isEntertainment ? "Let\u2019s Create the Show" : "Ready to Get Started?"}
      description={isEntertainment ? "Share your vision and let us bring your entertainment event to life." : `Let's discuss how we can create an exceptional ${service.title.toLowerCase()} experience for you.`}
      primaryLabel="Get a Quote"
      secondaryLabel="All Services"
      secondaryLink="/services"
    />
  );
}
