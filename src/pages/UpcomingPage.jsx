import { collageImage, editorsChoiceImage, upcoming } from '../data/siteData';

const MONTHS = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  aperil: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

function parseEventDate(label) {
  const match = label.match(/-\s*([A-Za-z]+)\s+(\d{1,2}),?\s*(\d{4})\s*$/);
  if (!match) {
    return null;
  }

  const monthToken = match[1].toLowerCase();
  const day = Number(match[2]);
  const year = Number(match[3]);
  const monthIndex = MONTHS[monthToken];

  if (monthIndex === undefined || Number.isNaN(day) || Number.isNaN(year)) {
    return null;
  }

  return new Date(year, monthIndex, day);
}

function splitExhibitionsByDate(upcomingExhibitions, pastExhibitions) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stillUpcoming = [];
  const autoPast = [];

  for (const item of upcomingExhibitions) {
    const eventDate = parseEventDate(item);

    if (eventDate && eventDate < today) {
      autoPast.push(item);
    } else {
      stillUpcoming.push(item);
    }
  }

  return {
    stillUpcoming,
    combinedPast: [...autoPast, ...pastExhibitions],
  };
}

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
  const { stillUpcoming, combinedPast } = splitExhibitionsByDate(
    upcoming.upcomingExhibitions,
    upcoming.pastExhibitions,
  );

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Upcoming</h1>

      <SectionList title="Upcoming Exhibitions" items={stillUpcoming} />
      <SectionList title="Past Exhibitions" items={combinedPast} />
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
