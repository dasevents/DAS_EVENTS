import GradientCTA from '../ui/gradient-cta';

export default function CTA({ service }) {
  return (
    <GradientCTA
      title="Ready to Get Started?"
      description={`Let's discuss how we can create an exceptional ${service.title.toLowerCase()} experience for you.`}
      primaryLabel="Get a Quote"
      secondaryLabel="All Services"
      secondaryLink="/services"
    />
  );
}
