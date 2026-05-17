import { useCallback, useEffect, useState } from 'react';
import { createWatermarkedImage } from '../lib/watermark';

function clampIndex(index, length) {
  if (length === 0) {
    return 0;
  }
  return (index + length) % length;
}

export default function GalleryGrid({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [watermarkedImageUrl, setWatermarkedImageUrl] = useState(null);
  const [isLoadingWatermark, setIsLoadingWatermark] = useState(false);

  const isOpen = activeIndex !== null;

  const closeModal = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }
      return clampIndex(current - 1, items.length);
    });
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }
      return clampIndex(current + 1, items.length);
    });
  }, [items.length]);

  useEffect(() => {
    if (!isOpen || activeIndex === null) {
      setWatermarkedImageUrl(null);
      return undefined;
    }

    setIsLoadingWatermark(true);
    const activeItem = items[activeIndex];
    
    createWatermarkedImage(activeItem.full, '©2006 kaijualotl')
      .then((url) => {
        setWatermarkedImageUrl(url);
        setIsLoadingWatermark(false);
      })
      .catch((error) => {
        console.error('Failed to create watermarked image:', error);
        setWatermarkedImageUrl(activeItem.full);
        setIsLoadingWatermark(false);
      });

    return undefined;
  }, [isOpen, activeIndex, items]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
      if (event.key === 'ArrowLeft') {
        showPrev();
      }
      if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeModal, isOpen, showNext, showPrev]);

  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="rounded-xl border border-[color:var(--ui-surface-border)] text-left hover:border-[color:var(--ui-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <img
              src={item.thumb}
              alt={item.alt}
              className="aspect-square w-full rounded-xl object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {isOpen && activeItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--ui-modal-overlay)] p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-lg bg-[color:var(--ui-modal-control-bg)] p-2 text-[color:var(--ui-modal-control-text)] hover:bg-[color:var(--ui-modal-control-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ui-modal-control-ring)]"
            onClick={closeModal}
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg bg-[color:var(--ui-modal-control-bg)] p-2 text-[color:var(--ui-modal-control-text)] hover:bg-[color:var(--ui-modal-control-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ui-modal-control-ring)]"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <figure className="relative max-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            {isLoadingWatermark ? (
              <div className="flex max-h-[90vh] max-w-6xl items-center justify-center rounded-xl bg-[color:var(--ui-modal-loading-bg)]">
                <span className="text-[color:var(--ui-modal-loading-text)]">Loading...</span>
              </div>
            ) : (
              <img
                src={watermarkedImageUrl || activeItem.full}
                alt={activeItem.alt}
                className="max-h-[90vh] w-auto max-w-full rounded-xl object-contain"
              />
            )}
            <figcaption className="mt-2 text-center text-sm text-[color:var(--ui-overlay-caption)]">
              {activeIndex + 1} / {items.length}
            </figcaption>
          </figure>

          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-[color:var(--ui-modal-control-bg)] p-2 text-[color:var(--ui-modal-control-text)] hover:bg-[color:var(--ui-modal-control-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ui-modal-control-ring)]"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ) : null}
    </>
  );
}
