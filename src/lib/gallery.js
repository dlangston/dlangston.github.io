const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const gallerySources = {
  dragon: {
    thumbs: import.meta.glob('/pages/drawings/dragon/img/thumb/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
    full: import.meta.glob('/pages/drawings/dragon/img/full/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
  },
  godzilla: {
    thumbs: import.meta.glob('/pages/drawings/godzilla/img/thumb/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
    full: import.meta.glob('/pages/drawings/godzilla/img/full/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
  },
  character: {
    thumbs: import.meta.glob('/pages/drawings/character/img/thumb/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
    full: import.meta.glob('/pages/drawings/character/img/full/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
  },
  'sea-life': {
    thumbs: import.meta.glob('/pages/drawings/sea-life/img/thumb/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
    full: import.meta.glob('/pages/drawings/sea-life/img/full/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
  },
  artillery: {
    thumbs: import.meta.glob('/pages/drawings/artillery/img/thumb/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
    full: import.meta.glob('/pages/drawings/artillery/img/full/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
  },
  geometric: {
    thumbs: import.meta.glob('/pages/drawings/geometric/img/thumb/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
    full: import.meta.glob('/pages/drawings/geometric/img/full/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
  },
  'pipe-cleaners': {
    thumbs: import.meta.glob('/pages/sculpture/pipe-cleaners/img/thumb/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
    full: import.meta.glob('/pages/sculpture/pipe-cleaners/img/full/**/*.{png,jpg,jpeg,JPG,webp}', { eager: true, import: 'default' }),
  },
};

function normalizedKey(filePath) {
  return filePath
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
    .replace(/_thumb$/i, '')
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase();
}

function sortedEntries(moduleMap) {
  return Object.entries(moduleMap).sort((a, b) => collator.compare(a[0], b[0]));
}

export function getGalleryItems(galleryKey) {
  const source = gallerySources[galleryKey];
  if (!source) {
    return [];
  }

  const thumbs = sortedEntries(source.thumbs);
  const fullEntries = sortedEntries(source.full);

  const fullByKey = new Map(fullEntries.map(([path, url]) => [normalizedKey(path), url]));

  return thumbs.map(([thumbPath, thumbUrl]) => {
    const key = normalizedKey(thumbPath);
    const directMatch = fullByKey.get(key);
    const fuzzyMatch = directMatch
      ? directMatch
      : fullEntries.find(([fullPath]) => {
          const fullKey = normalizedKey(fullPath);
          return fullKey.includes(key) || key.includes(fullKey);
        })?.[1];

    return {
      id: thumbPath,
      thumb: thumbUrl,
      full: fuzzyMatch ?? thumbUrl,
      alt: key || galleryKey,
    };
  });
}
