export const exhibitionEvents = [
  { label: 'Pancakes and Booze - Aug 2026', date: '2026-08-01' },
  { label: 'Slater Park Fest - Aug 2026', date: '2026-08-01' },
  { label: 'Pawtucket Arts festival - Aug 2026', date: '2026-08-01' },
  { label: 'Making Waves exhibition The Big E - September 2026', date: '2026-09-01' },
  { label: 'Maker faire San Francisco - September 2026', date: '2026-09-01' },
  { label: 'Rochester Maker Faire - November 2026', date: '2026-11-01' },
  { label: 'Vibrant Pawtucket Arts Collaborative Spring Show - April 2026', date: '2026-04-01' },
  { label: 'RI Anime Con - June, 2026', date: '2026-06-06'},
  { label: 'Syracuse Maker Faire May - 2026', date: '2026-05-02' },
  { label: 'Pawtucket Arts Collaborative Spring Show - February 2026', date: '2026-01-15' },
  { label: 'PVDFest - September 2026', date: '2026-09-18' },
  { label: 'RI Comic Con - November 2026', date: '2026-11-06' },
  { label: 'Rochester Maker Faire - November 2025', date: '2025-11-14' },
  { label: 'Utica NY Anime Fest - February 2026', date: '2026-02-28' },
  { label: 'Kid Con Nashua NH - April 2026', date: '2026-04-12' },
  { label: 'Philadelphia Maker Faire - April 2026', date: '2026-04-19' },
  { label: 'RI Comic Con 2025 - Featured Artist Vendor - November 2025', date: '2025-11-07' },
  { label: 'Coney Island Maker Faire - October 2025', date: '2025-10-01' },
  { label: 'San Francisco Maker Faire - September 2025', date: '2025-09-01' },
  { label: 'Long Island Maker Faire - August 2025', date: '2025-08-01' },
  { label: 'Granite State Comic Con - June 2025', date: '2025-06-01' },
  { label: 'Providence Maker Faire - May 2025', date: '2025-05-01' },
  { label: 'RI Anime Convention - March 2025', date: '2025-03-01' },
  { label: 'Pawtucket Arts Collaborative 25th anniversary event - September 2025', date: '2025-09-01' },
  { label: 'Kaiju Alotl Midnight Zone interactive experience - Pawtucket Arts Fall Festival - October 2025', date: '2025-10-01' },
  { label: 'Do You See Me - Pawtucket Arts Collaborative Member Show - May 2025', date: '2025-05-01' },
  { label: 'Syracuse Maker Faire - May 2025', date: '2025-05-01' },
  { label: 'Philadelphia Maker Faire - April 2025', date: '2025-04-01' },
  { label: 'Rochester Maker Faire - November 2024', date: '2024-11-01' },
  { label: 'Coney Island Maker Faire - October 2024', date: '2024-10-01' },
  { label: 'Godzilla Character Performer - Coney Island NY Mermaid Parade - June 2015 - Present', date: '2015-06-01' },
];

function parseIsoDateLocal(dateText) {
  const match = dateText.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const parsed = new Date(year, month, day);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export function getExhibitionsByDate(referenceDate = new Date()) {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  const upcomingExhibitions = [];
  const pastExhibitions = [];

  for (const event of exhibitionEvents) {
    const eventDate = parseIsoDateLocal(event.date);

    if (!eventDate) {
      pastExhibitions.push(event);
      continue;
    }

    if (eventDate < today) {
      pastExhibitions.push(event);
    } else {
      upcomingExhibitions.push(event);
    }
  }

  upcomingExhibitions.sort((a, b) => a.date.localeCompare(b.date));
  pastExhibitions.sort((a, b) => b.date.localeCompare(a.date));

  return {
    upcomingExhibitions: upcomingExhibitions.map((event) => ({
      label: event.label,
      href: event.href,
    })),
    pastExhibitions: pastExhibitions.map((event) => ({
      label: event.label,
      href: event.href,
    })),
  };
}
