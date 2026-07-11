import { forwardRef } from 'react';

const Textarea = forwardRef(
  (
    {
      label,
      error,
      rows = 4,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-text-main mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`
            w-full rounded-xl border bg-card-bg
            px-4 py-2.5 text-text-main
            placeholder:text-text-secondary
            transition-all duration-200
            outline-none resize-vertical
            focus:ring-2 focus:ring-primary/30 focus:border-primary
            ${error ? 'border-red-500 focus:ring-red-500/30' : 'border-border'}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
