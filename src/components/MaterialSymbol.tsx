type MaterialSymbolProps = {
  name: string;
  className?: string;
};

export function MaterialSymbol({ name, className = "" }: MaterialSymbolProps) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}
