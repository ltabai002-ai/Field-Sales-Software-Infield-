export function Logo({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <img 
      src="/fieldsales.webp" 
      alt="FieldSales Logo" 
      className={`h-10 w-auto object-contain ${className}`}
    />
  );
}
