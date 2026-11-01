import React from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * @typedef {{ id: string | null, title: string, youtubeWatchUrl: string | null }} DemoVideo
 */

/**
 * Privacy-enhanced YouTube embeds. Pass `id: null` for slots awaiting official video IDs.
 */
export default function YouTubeDemoSection({ heading = 'See it in action', videos, note }) {
  return (
    <section className="py-16 px-6 bg-slate-900/50 border-t border-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-3">{heading}</h2>
          {note && <p className="text-slate-400 max-w-3xl">{note}</p>}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div key={video.title + String(index)} className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-200">{video.title}</h3>
              {video.id ? (
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
              ) : (
                <div
                  className="aspect-video rounded-lg border-2 border-dashed border-amber-500/40 bg-slate-950/80 flex flex-col items-center justify-center p-6 text-center gap-2"
                  aria-label="Video placeholder"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-500">TODO</span>
                  <p className="text-sm text-slate-400">
                    Official Clear-Armor YouTube video ID pending. Diana will confirm which demo to embed here.
                  </p>
                </div>
              )}
              {video.youtubeWatchUrl ? (
                <a
                  href={video.youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 transition"
                >
                  Watch on YouTube
                  <ExternalLink size={16} aria-hidden />
                </a>
              ) : (
                <p className="text-sm text-slate-500 italic">Watch on YouTube (link coming when video is confirmed)</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
