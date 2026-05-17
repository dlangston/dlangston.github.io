import { collageImage, editorsChoiceImage, upcoming } from '../data/siteData';
import { getExhibitionsByDate } from '../data/exhibitions';

function SectionList({ title, items }) {
  return (
    <section className="space-y-3 rounded-2xl border border-[color:var(--ui-surface-border)] bg-[var(--ui-surface-bg)] p-5">
      <h2 className="text-2xl font-normal">{title}</h2>
      <ul className="list-inside list-disc space-y-2 text-[color:var(--ui-muted-text)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
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

      <section className="space-y-3 rounded-2xl border border-[color:var(--ui-surface-border)] bg-[var(--ui-surface-bg)] p-5">
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

      <section className="grid gap-4 rounded-2xl border border-[color:var(--ui-surface-border)] bg-[var(--ui-surface-bg)] p-5 md:grid-cols-2">
        <img src={collageImage} alt="Exhibition collage" className="w-full rounded-xl object-cover" />
        <img src={editorsChoiceImage} alt="Editors choice" className="w-full rounded-xl object-cover" />
      </section>
    </section>
  );
}
