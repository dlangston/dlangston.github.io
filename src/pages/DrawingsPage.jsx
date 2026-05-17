import { Link } from 'react-router-dom';
import { navigation } from '../data/siteData';
import { getGalleryItems } from '../lib/gallery';

export default function DrawingsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">2D Drawings</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {navigation.drawings.map((category) => {
          const preview = getGalleryItems(category.key).slice(0, 4);
          return (
            <Link
              key={category.key}
              to={`/drawings/${category.key}`}
              className="rounded-2xl border border-[color:var(--ui-surface-border)] bg-[var(--ui-surface-bg)] p-4 hover:border-[color:var(--ui-accent)]"
            >
              <h2 className="mb-4 text-lg font-normal uppercase tracking-wide">{category.label}</h2>
              <div className="grid grid-cols-2 gap-2">
                {preview.map((item) => (
                  <img
                    key={item.id}
                    src={item.thumb}
                    alt={category.label}
                    className="aspect-square w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
