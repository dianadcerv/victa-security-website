import React from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * @typedef {{ id: string | null, title: string, youtubeWatchUrl: string | null }} DemoVideo
 */

/**
 * Privacy-enhanced YouTube embeds. Pass `id: null` for slots awaiting official video IDs.
 */
export default function YouTubeDemoSection({ heading = 'See it in action', videos, note, emptyMessage }) {
  const ready = (videos || []).filter((video) => video.id);

  if (ready.length === 0) {
    if (!emptyMessage) return null;
    return (
      <section className="py-16 px-6 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">{heading}</h2>
          <p className="text-slate-400 max-w-3xl">{emptyMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-slate-900/50 border-t border-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-3">{heading}</h2>
          {note && <p className="text-slate-400 max-w-3xl">{note}</p>}
        </div>
        <div className={`grid gap-8 ${ready.length > 1 ? 'md:grid-cols-2' : 'max-w-3xl'}`}>
          {ready.map((video, index) => (
            <div key={video.title + String(index)} className="space-y-3">
              {ready.length > 1 && <h3 className="text-lg font-semibold text-slate-200">{video.title}</h3>}
              <div className="aspect-video rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                <iframe
                  title={video.title}
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  loading="lazy"
                  className="w-full h-full"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              {video.youtubeWatchUrl && (
                <a
                  href={video.youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 transition"
                >
                  Watch on YouTube
                  <ExternalLink size={16} aria-hidden />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
