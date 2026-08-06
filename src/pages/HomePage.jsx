import { Link } from 'react-router-dom';
import { aboutText, heroVideo, homePageImage } from '../data/siteData';
import sculptureBlueBlackGodzilla from '../../pages/sculpture/pipe-cleaners/img/thumb/blue-black-godzilla_thumb.png';
import sculptureMeowWolf from '../../pages/sculpture/pipe-cleaners/img/thumb/meow-wolf_thumb.png';
import sculptureRedGreenBiPed from '../../pages/sculpture/pipe-cleaners/img/thumb/red-green-bi-ped.png';
import sculptureWhiteHydra from '../../pages/sculpture/pipe-cleaners/img/thumb/white-hydra_thumb.png';
import drawingAxe2 from '../../pages/drawings/artillery/img/thumb/axe/Axe-2_thumb.png';
import drawingCharacter8 from '../../pages/drawings/character/img/thumb/other-character/other-character08_thumb.png';
import drawingGodzilla15 from '../../pages/drawings/godzilla/img/thumb/godzilla15_thumb.png';
import drawingSeaLife19 from '../../pages/drawings/sea-life/img/thumb/sea-life19_thumb.png';

const sculpturePreview = [
  sculptureBlueBlackGodzilla,
  sculptureMeowWolf,
  sculptureRedGreenBiPed,
  sculptureWhiteHydra,
];

const drawingPreview = [
  drawingAxe2,
  drawingCharacter8,
  drawingGodzilla15,
  drawingSeaLife19,
];

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="cv-auto mx-auto w-full max-w-272 overflow-hidden bg-[var(--ui-page-bg)]">
        <img
          src={homePageImage}
          alt="Artwork collage"
          className="aspect-video w-full object-contain"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <div className="cv-auto mx-auto w-full max-w-272">
        <video
          controls
          autoPlay
          loop
          muted
          playsInline
          poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1280' height='720'><rect width='100%' height='100%' fill='black'/></svg>"
          className="aspect-video w-full"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="cv-auto mx-auto w-full max-w-272">
        <Link to="/sculpture/pipe-cleaners" className="grid grid-cols-2 sm:grid-cols-4">
          {sculpturePreview.map((item) => (
            <img
              key={item}
              src={item}
              alt="Sculpture preview"
              className="aspect-square h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ))}
        </Link>
      </div>

      <div className="cv-auto mx-auto w-full max-w-272">
        <Link to="/drawings" className="grid grid-cols-2 sm:grid-cols-4">
          {drawingPreview.map((item) => (
            <img
              key={item}
              src={item}
              alt="Drawing preview"
              className="aspect-square h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ))}
        </Link>
      </div>

      <section id="about" className="mx-auto w-full max-w-200 px-4 py-12">
        <h2 className="mb-2 text-2xl font-normal">{aboutText.title}</h2>
        <p>{aboutText.body}</p>
      </section>
    </section>
  );
}
