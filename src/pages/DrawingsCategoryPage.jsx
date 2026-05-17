import { Navigate, useParams } from 'react-router-dom';
import GalleryGrid from '../components/GalleryGrid';
import { navigation } from '../data/siteData';
import { getGalleryItems } from '../lib/gallery';

export default function DrawingsCategoryPage() {
  const { category } = useParams();
  const details = navigation.drawings.find((item) => item.key === category);

  if (!details) {
    return <Navigate to="/drawings" replace />;
  }

  const items = getGalleryItems(details.key);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">{details.label}</h1>
      <GalleryGrid items={items} />
    </section>
  );
}
