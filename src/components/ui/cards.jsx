import { forwardRef } from 'react';

const variants = {
  default:
    'bg-card-bg border border-border hover:shadow-lg hover:shadow-primary/5',
  elevated:
    'bg-card-bg shadow-md shadow-black/5 hover:shadow-xl hover:shadow-primary/10 border border-transparent',
  bordered:
    'bg-transparent border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/5',
  glass:
    'bg-white/5 backdrop-blur-md border border-white/10 dark:bg-white/5',
  solid:
    'bg-bg-section hover:bg-card-bg border border-transparent hover:border-border',
};

const Card = forwardRef(
  (
    {
      children,
      variant = 'default',
      padding: paddingProp = 'md',
      hoverable = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-2xl transition-all duration-300 ease-out
          ${variants[variant]}
          ${hoverable ? 'hover:-translate-y-1 cursor-pointer' : ''}
          ${paddingProp === 'none' ? '' : `p-${paddingProp === 'sm' ? '4' : paddingProp === 'lg' ? '8' : '6'}`}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3
    className={`[font-family:var(--font-title)] text-xl font-semibold text-text-main ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-text-secondary mt-1 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div
    className={`mt-4 pt-4 border-t border-border flex items-center ${className}`}
    {...props}
  >
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export default Card;
