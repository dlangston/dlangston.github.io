import GalleryGrid from '../components/GalleryGrid';
import { getGalleryItems } from '../lib/gallery';

export default function PipeCleanersPage() {
  const items = getGalleryItems('pipe-cleaners');

  return (
    <section className="space-y-6">
      <GalleryGrid items={items} />
    </section>
  );
}
