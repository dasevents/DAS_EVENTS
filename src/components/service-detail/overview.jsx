import OverviewSection from '../ui/overview-section';

export default function Overview({ service }) {
  return (
    <OverviewSection
      title={service.title}
      description={service.description}
      longDescription={service.longDescription}
      highlights={service.highlights}
      images={service.images}
    />
  );
}
