import { Link } from 'react-router-dom';
import { aboutText, heroVideo } from '../data/siteData';
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
      <div className="mx-auto w-full max-w-[1088px]">
        <video controls autoPlay loop muted className="w-full">
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mx-auto w-full max-w-[1088px]">
        <Link to="/sculpture/pipe-cleaners" className="grid grid-cols-2 sm:grid-cols-4">
          {sculpturePreview.map((item) => (
            <img key={item} src={item} alt="Sculpture preview" className="h-full w-full object-cover" loading="lazy" />
          ))}
        </Link>
      </div>

      <div className="mx-auto w-full max-w-[1088px]">
        <Link to="/drawings" className="grid grid-cols-2 sm:grid-cols-4">
          {drawingPreview.map((item) => (
            <img key={item} src={item} alt="Drawing preview" className="h-full w-full object-cover" loading="lazy" />
          ))}
        </Link>
      </div>

      <section id="about" className="mx-auto w-full max-w-[800px] px-4 py-12">
        <h2 className="mb-2 text-2xl font-normal">{aboutText.title}</h2>
        <p>{aboutText.body}</p>
      </section>
    </section>
  );
}
