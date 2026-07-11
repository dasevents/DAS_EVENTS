import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30',
  secondary:
    'bg-secondary text-white hover:bg-secondary/90 shadow-md shadow-secondary/20',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost:
    'text-primary hover:bg-primary/10',
  accent:
    'bg-accent text-[#111111] hover:bg-accent/90 shadow-md shadow-accent/20',
  danger:
    'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20',
};

const sizes = {
  sm: 'px-4 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-2.5 text-base rounded-xl gap-2',
  lg: 'px-8 py-3.5 text-lg rounded-xl gap-2.5',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon: Icon,
      iconPosition = 'left',
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center font-medium
          transition-all duration-300 ease-out
          active:scale-[0.97]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        )}
        {!loading && Icon && iconPosition === 'left' && (
          <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        )}
        {children}
        {!loading && Icon && iconPosition === 'right' && (
          <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
