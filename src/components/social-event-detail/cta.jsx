import GradientCTA from '../ui/gradient-cta';

export default function CTA({ event }) {
  return (
    <GradientCTA
      title={`Ready to Plan Your ${event.title}?`}
      description={`Let's create a beautiful and memorable ${event.title.toLowerCase()} experience for you.`}
      gradient="from-accent to-accent/80"
      accent="accent"
      primaryLabel="Get a Quote"
      secondaryLabel="All Social Events"
      secondaryLink="/social-events"
    />
  );
}
