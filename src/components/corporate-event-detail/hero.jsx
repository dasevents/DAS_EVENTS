import DetailHero from '../ui/detail-hero';

export default function Hero({ event }) {
  return (
    <DetailHero
      title={event.title}
      tagline={event.tagline}
      icon={event.icon}
      heroImage={event.heroImage}
      backLink="/corporate-events"
      backLabel="All Corporate Events"
      badgeLabel="Corporate Event"
    />
  );
}