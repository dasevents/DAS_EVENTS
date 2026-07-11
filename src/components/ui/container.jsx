export default function Container({
  children,
  className = '',
  as: Tag = 'div',
  ...props
}) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[var(--container-max)] px-[var(--container-padding)] ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
