export default function SectionHeader({
  tag,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const alignClass =
    align === 'left'
      ? 'text-left'
      : align === 'right'
      ? 'text-right'
      : 'text-center';

  return (
    <div className={`mb-12 md:mb-16 ${alignClass} ${className}`}>
      {tag && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
          {tag}
        </span>
      )}
      <h2 className="[font-family:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-semibold text-text-main leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-text-secondary max-w-2xl text-lg leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
