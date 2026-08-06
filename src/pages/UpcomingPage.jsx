import { collageImage, editorsChoiceImage, upcoming } from '../data/siteData';
import { getExhibitionsByDate } from '../data/exhibitions';

function SectionList({ title, items }) {
  return (
    <section className="surface-bg-15 space-y-3 rounded-2xl border border-[color:var(--ui-surface-border)] p-5">
      <h2 className="text-2xl font-normal">{title}</h2>
      <ul className="list-inside list-disc space-y-2 text-[color:var(--ui-muted-text)]">
        {items.map((item) => {
          const label = typeof item === 'string' ? item : item?.label;
          const href = typeof item === 'object' ? item?.href : undefined;
          return (
            <li key={label}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--ui-press-link-hover)]">
                  {label}
                </a>
              ) : (
                label
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function UpcomingPage() {
  const { upcomingExhibitions, pastExhibitions } = getExhibitionsByDate();

  return (
    <section className="space-y-6">
      <SectionList title="Upcoming Exhibitions" items={upcomingExhibitions} />
      <SectionList title="Past Exhibitions" items={pastExhibitions} />
      <SectionList title="Awards" items={upcoming.awards} />

      <section className="surface-bg-15 space-y-3 rounded-2xl border border-[color:var(--ui-surface-border)] p-5">
        <h2 className="text-2xl font-normal">Press</h2>
        <ul className="space-y-2 text-[color:var(--ui-press-link)]">
          {upcoming.press.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--ui-press-link-hover)]">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-bg-15 rounded-2xl p-5">
        <div className="flex justify-center">
          <div className="inline-flex h-[300px] gap-0 sm:h-[340px] md:h-[420px]">
            <div className="flex h-full items-center justify-center overflow-hidden rounded-l-xl">
              <img src={editorsChoiceImage} alt="Editors choice" className="h-full w-auto object-contain" />
            </div>
            <div className="flex h-full items-center justify-center overflow-hidden rounded-r-xl">
              <img src={collageImage} alt="Exhibition collage" className="h-full w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
