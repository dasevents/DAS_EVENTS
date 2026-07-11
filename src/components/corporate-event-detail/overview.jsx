import OverviewSection from '../ui/overview-section';

export default function Overview({ event }) {
  return (
    <OverviewSection
      title={event.title}
      description={event.description}
      longDescription={event.longDescription}
      highlights={event.highlights}
      images={event.images}
    />
  );
}