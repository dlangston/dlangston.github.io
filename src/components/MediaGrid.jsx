export default function MediaGrid({ items, className = '' }) {
  return (
    <div className={`grid grid-cols-2 gap-2 sm:grid-cols-4 ${className}`.trim()}>
      {items.map((item) => (
        <img
          key={item}
          src={item}
          alt="Artwork preview"
          className="aspect-square w-full rounded-lg object-cover"
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}
