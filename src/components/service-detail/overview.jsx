import OverviewSection from '../ui/overview-section';

export default function Overview({ service }) {
  const isEntertainment = service.slug === 'entertainment-events';

  return (
    <OverviewSection
      title={service.title}
      description={service.description}
      longDescription={service.longDescription}
      highlights={service.highlights}
      images={service.images}
      showAboutPrefix={!isEntertainment}
    />
  );
}
