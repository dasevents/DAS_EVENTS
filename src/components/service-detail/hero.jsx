import DetailHero from '../ui/detail-hero';

export default function Hero({ service }) {
  return (
    <DetailHero
      title={service.title}
      tagline={service.tagline}
      icon={service.icon}
      heroImage={service.heroImage}
      backLink="/services"
      backLabel="All Services"
      badgeLabel="DAS EVENTS"
    />
  );
}
