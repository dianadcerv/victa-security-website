import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import YouTubeDemoSection from '../components/YouTubeDemoSection';
import { useConsultation } from '../context/ConsultationContext';

const CLEAR_ARMOR_DEMO_VIDEOS = [
  {
    id: '6xfkRtR4SZU',
    title: 'Clear-Armor product demo',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=6xfkRtR4SZU',
  },
];

const laminates = [
  {
    name: 'SL-15 | Security Laminate',
    href: 'https://clear-armor.com/pages/sl-15',
    description:
      'Applied to existing glass to buy time for first responders. Optically clear 15-mil security laminate guards against smash-and-grabs, burglaries, bomb blasts, shooters and assailants, and high winds.',
    specs: [
      '15 mil | 420 psi break strength',
      'Tensile 28,500 psi | Peel 8 psi',
      'TSER 18% | VLT 87% | UV rejection 99%',
    ],
    testing: [
      'ANSI Z97.1',
      'ASTM E84',
      'BMAG Level 1',
      'CPSC 16 CFR',
      'Hospital Safety Compliance',
      'Impact EM356P4A',
      'ULC S332-93',
    ],
    bestFor: ['Schools', 'Small businesses', 'Homes'],
  },
  {
    name: 'SL-31 | Riot Control Laminate',
    href: 'https://clear-armor.com/pages/sl-31-clear-armor-laminate',
    description:
      '31-mil riot control laminate includes SL-15 protections plus defense against prolonged, targeted attacks and crowd riots. Delays attacks by holding glass in place during sustained force.',
    specs: [
      '31 mil | 1,100 psi break strength',
      'Tensile 28,500 psi | Peel 9 psi',
      'TSER 18% | VLT 87% | UV rejection 99%',
    ],
    testing: [
      'ANSI Z97.1',
      'ASTM E84',
      'BMAG Level 1',
      'CPSC 16 CFR',
      'Hospital Safety Compliance',
      'Impact EM356P4A',
      'ULC S332-93',
      'Bullet resistant when applied to specific glass types and thicknesses (contact Clear-Armor for details)',
    ],
    bestFor: ['Large offices', 'Government buildings', 'High-traffic public spaces'],
  },
  {
    name: 'BR | Bullet-Resistant Laminate',
    href: 'https://clear-armor.com/pages/glass-laminate',
    description:
      'Optically clear bullet-resistant laminate with one-way protection framing for banks, government facilities, critical access points, and sensitive entrances. Protects against common handgun rounds and 00 buckshot; rating depends on assembly, glass, and installation.',
    highlights: [
      'NIJ Standard 0108.01 Type II-A against 9mm on 1/4-inch glass (Intertek testing cited by Clear-Armor)',
      'No penetration under UL 752 Level 3 conditions against .44 Magnum on 1/2-inch glass (Element U.S. Space & Defense testing cited by Clear-Armor)',
    ],
    bestFor: ['Banks', 'Government', 'Critical access and sensitive entrances'],
  },
];

export default function ClearArmorPage() {
  const { openConsultation } = useConsultation();

  return (
    <>
      <PageMeta
        title="Clear-Armor Security Laminates | Victa Security Solutions"
        description="Official Clear-Armor ambassador Diana Cervantes helps Chicago-area schools, businesses, and municipalities assess and install SL-15, SL-31, and bullet-resistant glass laminates from Clear-Armor LLC."
      />

      <header className="pt-32 pb-16 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-semibold">
            Official Clear-Armor Ambassador
          </div>
          <img
            src="/images/clear-armor-logo.png"
            alt="Clear-Armor: Transforming glass into armor"
            className="max-w-md w-full h-auto"
          />
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Clear-Armor LLC transforms your glass into armor with globally patented security laminates that work 24/7,
            with or without power. As an official ambassador, Victa Security Solutions helps you assess fit, coordinate
            discreet installation, and align laminate choices with how your facility operates.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => openConsultation('Security Laminate / Glass Hardening')}
              className="px-6 py-3 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition inline-flex items-center gap-2"
            >
              Discuss Your Glass
              <ArrowRight size={20} />
            </button>
            <a
              href="https://clear-armor.com/pages/glass-laminate"
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
        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why organizations choose Clear-Armor laminates</h2>
            <ul className="grid md:grid-cols-2 gap-4 text-slate-300">
              {[
                'World patent-holding, proven armor security solution',
                'Exclusive provider of security laminates with globally patented technology',
                'Discreet installations, including unmarked vehicles and flexible after-hours scheduling',
                'In-house GSA-approved contractors (per Clear-Armor)',
                'Mission focused on safer communities through laminate and life-skills training',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <ChevronRight className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {laminates.map((product) => (
              <article
                key={product.name}
                className={`p-8 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-amber-500/50 transition space-y-4 ${
                  product.name.startsWith('BR') ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-amber-500 hover:text-amber-400 inline-flex items-center gap-1"
                  >
                    On clear-armor.com
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="text-slate-300 leading-relaxed">{product.description}</p>
                {product.specs && (
                  <ul className="space-y-1">
                    {product.specs.map((spec) => (
                      <li key={spec} className="flex gap-3 text-slate-400 text-sm">
                        <ChevronRight size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {product.highlights && (
                  <ul className="space-y-2">
                    {product.highlights.map((line) => (
                      <li key={line} className="flex gap-3 text-slate-400 text-sm">
                        <ChevronRight size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {product.testing && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.testing.map((cert) => (
                      <span key={cert} className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded border border-slate-700">
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
                <div className="pt-3 border-t border-slate-800">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">Well suited for</p>
                  <div className="flex flex-wrap gap-2">
                    {product.bestFor.map((use) => (
                      <span key={use} className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="text-sm text-slate-500">
            Clear-Armor LLC is the manufacturer. Victa provides assessment-first guidance and local ambassador support.
            Specifications and testing references above are published on{' '}
            <a href="https://clear-armor.com/" className="text-amber-500 hover:text-amber-400" target="_blank" rel="noopener noreferrer">
              clear-armor.com
            </a>
            .
          </p>
        </div>
      </section>

      <YouTubeDemoSection videos={CLEAR_ARMOR_DEMO_VIDEOS} />

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-lg p-10 text-center space-y-4">
          <h2 className="text-2xl font-bold">Start with an assessment</h2>
          <p className="text-slate-300">
            I will map threat scenarios, existing glass, and operations before recommending SL-15, SL-31, bullet-resistant
            laminate, or a mix.
          </p>
          <button
            type="button"
            onClick={() => openConsultation('Security Laminate / Glass Hardening')}
            className="px-8 py-3 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition"
          >
            Book a laminate consult
          </button>
          <p className="text-sm text-slate-400">
            Also exploring vehicle protection?{' '}
            <Link to="/truarmor" className="text-amber-500 hover:text-amber-400">
              Learn about TruArmor
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
