const colorMap = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary/10 text-secondary border-secondary/20',
  accent: 'bg-accent/20 text-accent border-accent/30',
  gray: 'bg-bg-section text-text-secondary border-border',
  success: 'bg-green-500/10 text-green-600 border-green-500/20',
  warning: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  danger: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const sizeMap = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export default function Badge({
  children,
  color = 'primary',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full font-medium border
        ${colorMap[color]}
        ${sizeMap[size]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            color === 'success'
              ? 'bg-green-500'
              : color === 'warning'
              ? 'bg-amber-500'
              : color === 'danger'
              ? 'bg-red-500'
              : 'bg-primary'
          }`}
        />
      )}
      {children}
    </span>
  );
}
