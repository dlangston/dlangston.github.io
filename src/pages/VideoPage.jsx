import { videoSections } from '../data/siteData';

function getVideoMimeType(src) {
  const ext = src.toLowerCase().split('.').pop();
  const mimeTypes = {
    m4v: 'video/mp4',
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    mov: 'video/quicktime',
  };
  return mimeTypes[ext] || 'video/mp4';
}

export default function VideoPage() {
  return (
    <section className="space-y-10">
      {videoSections.map((section) => (
        <div key={section.title} className="space-y-4 rounded-2xl border border-[color:var(--ui-surface-border)] bg-[var(--ui-surface-bg)] p-4">
          <h2 className="text-2xl font-normal">{section.title}</h2>

          {section.embeds?.map((embed) => (
            <div key={embed.title} className="space-y-2">
              <h3 className="ml-4 text-lg font-normal text-[color:var(--ui-muted-text)]">{embed.title}</h3>
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-[color:var(--ui-surface-border)]">
                <iframe
                  src={embed.src}
                  title={embed.title}
                  className="h-full w-full"
                  allow="accelerometer; clipboard-write; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          ))}

          {section.videos?.map((video) => (
            <div key={video.title} className="space-y-2">
              <h3 className="ml-4 text-lg font-normal text-[color:var(--ui-muted-text)]">{video.title}</h3>
              <video controls muted={video.muted} className="w-full rounded-xl border border-[color:var(--ui-surface-border)]">
                <source src={video.src} type={getVideoMimeType(video.src)} />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
