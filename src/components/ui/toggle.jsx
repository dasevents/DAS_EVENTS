import { forwardRef } from 'react';

const sizes = {
  sm: { track: 'w-9 h-5', thumb: 'w-3.5 h-3.5', translate: 'translate-x-4' },
  md: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translate-x-6' },
  lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' },
};

const variants = {
  primary: {
    active: 'bg-primary border-primary',
    inactive: 'bg-bg-section border-border',
    thumb: 'bg-white shadow-md shadow-primary/30',
  },
  accent: {
    active: 'bg-accent border-accent',
    inactive: 'bg-bg-section border-border',
    thumb: 'bg-white shadow-md shadow-accent/30',
  },
  secondary: {
    active: 'bg-secondary border-secondary',
    inactive: 'bg-bg-section border-border',
    thumb: 'bg-white shadow-md shadow-secondary/30',
  },
};

const Toggle = forwardRef(
  (
    {
      checked = false,
      onChange,
      size = 'md',
      variant = 'primary',
      label,
      labelPosition = 'right',
      icon: Icon,
      iconChecked: IconChecked,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const s = sizes[size];
    const v = variants[variant];

    const track = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`
          relative inline-flex items-center rounded-full
          border transition-colors duration-300
          ${s.track}
          ${checked ? v.active : v.inactive}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
          ${className}
        `}
        {...props}
      >
        <span
          className={`
            absolute top-1/2 -translate-y-1/2 left-0.5
            rounded-full flex items-center justify-center
            transition-all duration-300 ease-out
            ${s.thumb}
            ${checked ? `${s.translate}` : 'translate-x-0'}
          `}
        >
          {checked && IconChecked ? (
            <IconChecked size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} className="text-primary" />
          ) : Icon && !checked ? (
            <Icon size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} className="text-text-secondary" />
          ) : null}
        </span>
      </button>
    );

    if (!label) return track;

    return (
      <label
        className={`
          inline-flex items-center gap-2.5
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${labelPosition === 'left' ? 'flex-row-reverse' : ''}
        `}
      >
        {track}
        <span className="text-sm font-medium text-text-main select-none">
          {label}
        </span>
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';
export default Toggle;
