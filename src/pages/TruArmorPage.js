import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import YouTubeDemoSection from '../components/YouTubeDemoSection';
import { useConsultation } from '../context/ConsultationContext';

const TRUARMOR_DEMO_VIDEOS = [
  {
    id: '125SEEQhkXs',
    title: 'TruArmor product demo',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=125SEEQhkXs',
  },
];

const qualities = [
  'DOT certified',
  'Abrasion resistance',
  'Impact ball drop',
  'Lightweight armor systems',
  'Luminous transmittance',
];

export default function TruArmorPage() {
  const { openConsultation } = useConsultation();

  return (
    <>
      <PageMeta
        title="TruArmor Vehicle Armor | Victa Security Solutions"
        description="Official Clear-Armor ambassador Diana Cervantes connects Chicago-area clients with TruArmor, the transferable, ultra-light vehicle armor from Clear-Armor LLC."
      />

      <header className="pt-32 pb-16 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-semibold">
            Official Clear-Armor Ambassador
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">TruArmor Vehicle Armor</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            TruArmor is the only transferable vehicle armor in the world, so protection can move with you between vehicles.
            Clear-Armor LLC manufactures ultra-light, shatter-resistant glass that fits existing openings without impacting
            window operation. Victa helps you evaluate fit, use case, and coordination with the manufacturer&apos;s process.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => openConsultation('TruArmor Vehicle Protection')}
              className="px-6 py-3 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition inline-flex items-center gap-2"
            >
              Discuss vehicle armor
              <ArrowRight size={20} />
            </button>
            <a
              href="https://clear-armor.com/pages/vehicle-armor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-slate-700 rounded-lg font-semibold text-slate-300 hover:border-amber-500 hover:text-amber-500 transition inline-flex items-center gap-2"
            >
              Manufacturer details
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </header>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">What TruArmor delivers</h2>
            <ul className="space-y-3 text-slate-300">
              {[
                'Ultra-light, thinnest and lightest shatter-proof glass in its class (per Clear-Armor)',
                'Fits existing glass without impacting window operation',
                'USA-made, world-patented armor system',
                'DOT certified; third-party tested and approved to NIJ, ANSI, and UL test standards (as stated on clear-armor.com)',
                'Anti-ricochet design absorbs bullet energy to reduce ricochet risk',
                'Customizable for doors, windows, and windshields with OEM direct replacement parts; no special tools required',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <ChevronRight className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 bg-slate-900/50 rounded-lg border border-slate-800 space-y-4">
            <h3 className="text-xl font-semibold">Documented qualities</h3>
            <p className="text-slate-400 text-sm">Listed on Clear-Armor&apos;s TruArmor vehicle armor page:</p>
            <ul className="flex flex-wrap gap-2">
              {qualities.map((q) => (
                <li key={q} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded border border-slate-700">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <YouTubeDemoSection videos={TRUARMOR_DEMO_VIDEOS} />

      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-lg p-10 text-center space-y-4">
          <h2 className="text-2xl font-bold">Protect people in motion</h2>
          <p className="text-slate-300">
            Share your fleet, routes, and threat profile. I will help you determine whether TruArmor aligns with your
            vehicle mix and connect you with Clear-Armor&apos;s manufacturing process.
          </p>
          <button
            type="button"
            onClick={() => openConsultation('TruArmor Vehicle Protection')}
            className="px-8 py-3 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition"
          >
            Book a TruArmor consult
          </button>
          <p className="text-sm text-slate-400">
            Need building glass hardening instead?{' '}
            <Link to="/clear-armor" className="text-amber-500 hover:text-amber-400">
              Explore Clear-Armor laminates
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
