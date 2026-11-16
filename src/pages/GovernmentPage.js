import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ChevronRight, Download, Mail, Shield } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { useConsultation } from '../context/ConsultationContext';
import {
  CAPABILITY_STATEMENT_PATH,
  CONTRACTING_EMAIL,
  NAICS_CODES,
  PRODUCT_SERVICE_CODES,
  SAM_REGISTRATION,
  SHOW_CAPABILITY_STATEMENT_SECTION,
} from '../data/samRegistration';

function formatAddress(addr) {
  return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}`;
}

function CardSection({ title, children, className = '' }) {
  return (
    <section className={`p-8 bg-slate-900/50 rounded-lg border border-slate-800 space-y-4 ${className}`}>
      {title ? <h2 className="text-2xl font-bold">{title}</h2> : null}
      {children}
    </section>
  );
}

export default function GovernmentPage() {
  const { openConsultation } = useConsultation();
  const addressLine = formatAddress(SAM_REGISTRATION.physicalAddress);

  return (
    <>
      <PageMeta
        title="Government Contracting | Victa Security Solutions"
        description="Victa Security Solutions LLC is registered in SAM.gov with active registration. UEI GWNWAAESCLE6, CAGE 277J8. Physical security consulting and official Clear-Armor and TruArmor ambassador support for federal, state, and local buyers."
      />

      <header className="pt-32 pb-16 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-semibold">
            <Building2 size={16} aria-hidden />
            SAM.gov registered
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Government contracting</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Victa Security Solutions LLC is registered in SAM.gov and ready to support federal, state, and local buyers and
            prime contractors with assessment-first physical security guidance and ambassador support for Clear-Armor and
            TruArmor solutions where they fit your mission.
          </p>
        </div>
      </header>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <CardSection title="Company registration">
            <dl className="space-y-4">
              {[
                ['Legal name', SAM_REGISTRATION.legalName],
                ['Unique Entity ID (UEI)', SAM_REGISTRATION.uei],
                ['CAGE code', SAM_REGISTRATION.cageCode],
                ['SAM.gov status', SAM_REGISTRATION.samStatus],
                ['Ownership', SAM_REGISTRATION.ownership],
                ['Business address', addressLine],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                  <dt className="text-xs uppercase tracking-wide text-slate-500 mb-1">{label}</dt>
                  <dd className="text-slate-100 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </CardSection>

          <CardSection title="NAICS codes">
            <ul className="space-y-3">
              {NAICS_CODES.map((entry) => (
                <li key={entry.code} className="flex gap-3 text-slate-300">
                  <ChevronRight className="text-amber-500 flex-shrink-0 mt-0.5" size={18} aria-hidden />
                  <span>
                    <span className="font-semibold text-slate-100">{entry.code}</span>
                    {': '}
                    {entry.title}
                    {entry.primary ? (
                      <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-amber-500">Primary</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-slate-500 text-sm pt-2 border-t border-slate-800">
              Registered as a small business under SBA size standards for each NAICS code listed above.
            </p>
          </CardSection>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <CardSection title="Product Service Codes (PSC)">
            <ul className="space-y-3">
              {PRODUCT_SERVICE_CODES.map((entry) => (
                <li key={entry.code} className="flex gap-3 text-slate-300">
                  <ChevronRight className="text-amber-500 flex-shrink-0 mt-0.5" size={18} aria-hidden />
                  <span>
                    <span className="font-semibold text-slate-100">{entry.code}</span>
                    {': '}
                    {entry.title}
                  </span>
                </li>
              ))}
            </ul>
          </CardSection>
        </div>
      </section>

      {SHOW_CAPABILITY_STATEMENT_SECTION ? (
        <section className="py-16 px-6 border-b border-slate-800">
          <div className="max-w-6xl mx-auto">
            <CardSection title="Capability statement">
              <a
                href={CAPABILITY_STATEMENT_PATH}
                download
                className="inline-flex items-center gap-3 px-6 py-3 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition"
              >
                <Download size={20} />
                Download capability statement (PDF)
              </a>
            </CardSection>
          </div>
        </section>
      ) : null}

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center gap-3">
            <Shield className="text-amber-500" size={28} aria-hidden />
            <h2 className="text-3xl font-bold">Core capabilities</h2>
          </div>
          <p className="text-slate-400 max-w-3xl">
            Diana Cervantes is an official ambassador for Clear-Armor LLC security laminates and TruArmor vehicle armor. Victa
            leads with assessment; Clear-Armor LLC remains the manufacturer. Summaries below reflect product lines described on
            this site only.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-900/50 rounded-lg border border-slate-800 space-y-4">
              <h3 className="text-xl font-semibold">
                <Link to="/clear-armor" className="text-amber-500 hover:text-amber-400">
                  Clear-Armor security glazing laminates
                </Link>
              </h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                {[
                  'Optically clear laminates applied to existing glass; protection with or without power',
                  'Defense against forced entry, smash-and-grab, and prolonged targeted attacks (SL-15 and SL-31 lines)',
                  'Bomb blast and high-wind hardening (per Clear-Armor product descriptions)',
                  'Bullet-resistant laminate options for critical access points when glass assembly supports rated performance',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <ChevronRight className="text-amber-500 flex-shrink-0 mt-0.5" size={16} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-slate-900/50 rounded-lg border border-slate-800 space-y-4">
              <h3 className="text-xl font-semibold">
                <Link to="/truarmor" className="text-amber-500 hover:text-amber-400">
                  TruArmor vehicle armor
                </Link>
              </h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                {[
                  'Transferable, ultra-light vehicle armor system from Clear-Armor LLC',
                  'Shatter-resistant glass designed to fit existing openings without impacting window operation',
                  'DOT listed on Clear-Armor; qualities include impact ball drop and abrasion resistance',
                  'Customizable for doors, windows, and windshields',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <ChevronRight className="text-amber-500 flex-shrink-0 mt-0.5" size={16} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-lg p-10 space-y-6">
          <h2 className="text-2xl font-bold text-center">Contracting contact</h2>
          <p className="text-slate-300 text-center">
            For teaming, quotes, or assessment requests related to government needs, reach out directly or schedule through the
            site.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${CONTRACTING_EMAIL}`}
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-semibold"
            >
              <Mail size={18} />
              {CONTRACTING_EMAIL}
            </a>
            <button
              type="button"
              onClick={() => openConsultation('Physical Security Assessment')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 rounded-lg font-semibold text-slate-300 hover:border-amber-500 hover:text-amber-500 transition"
            >
              Contact via assessment request
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="text-center">
            <button
              type="button"
              onClick={() => openConsultation('Physical Security Assessment')}
              className="text-sm text-slate-400 hover:text-amber-500 underline-offset-2 hover:underline"
            >
              Open the consultation form now
            </button>
          </p>
        </div>
      </section>
    </>
  );
}