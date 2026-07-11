import GradientCTA from '../ui/gradient-cta';

export default function CTA({ event }) {
  return (
    <GradientCTA
      title={`Ready to Plan Your ${event.title}?`}
      description={`Let's discuss how we can create an exceptional ${event.title.toLowerCase()} experience for you.`}
      primaryLabel="Get a Quote"
      secondaryLabel="All Corporate Events"
      secondaryLink="/corporate-events"
    />
  );
}