export default function Divider({
  variant = 'gradient',
  gradient = 'primary',
  spacing = 'md',
  className = '',
  ...props
}) {
  const spacingMap = {
    none: '',
    sm: 'my-4',
    md: 'my-8',
    lg: 'my-12',
    xl: 'my-16',
  };

  const gradientMap = {
    primary: 'from-transparent via-primary/50 to-transparent',
    accent: 'from-transparent via-accent/50 to-transparent',
    secondary: 'from-transparent via-secondary/50 to-transparent',
    mixed: 'from-transparent via-primary/40 via-accent/40 to-transparent',
    fade: 'from-bg-main via-primary/20 to-bg-main',
  };

  if (variant === 'dots') {
    return (
      <div
        className={`flex items-center justify-center gap-2 ${spacingMap[spacing]} ${className}`}
        {...props}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div
        className={`h-px bg-gradient-to-r ${gradientMap[gradient]} ${spacingMap[spacing]} ${className}`}
        {...props}
      />
    );
  }

  if (variant === 'dashed') {
    return (
      <div
        className={`border-t border-dashed border-border ${spacingMap[spacing]} ${className}`}
        {...props}
      />
    );
  }

  return (
    <div
      className={`border-t border-border ${spacingMap[spacing]} ${className}`}
      {...props}
    />
  );
}
