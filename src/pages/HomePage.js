import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Shield, Users, CheckCircle, ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { useConsultation } from '../context/ConsultationContext';

const HOME_META =
  'Victa Security Solutions LLC: assessment-first physical security consulting for schools, companies, and municipalities. Official Clear-Armor and TruArmor ambassador in the Chicago area.';

export default function HomePage() {
  const { openConsultation } = useConsultation();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <PageMeta
        title="Victa Security Solutions | Strategic Physical Security Consulting"
        description={HOME_META}
      />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Strategic Security Consulting for Schools, Companies, and Municipalities
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              Assessment-first physical security and threat mitigation. I identify risks others miss and recommend solutions
              tailored to how you operate, including Clear-Armor glass laminates and TruArmor vehicle protection as your
              official ambassador partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => openConsultation()}
                className="px-6 py-3 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition flex items-center justify-center gap-2 group"
              >
                Schedule Free Assessment
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </button>
              <a
                href="#approach"
                className="px-6 py-3 border border-slate-700 rounded-lg font-semibold text-slate-300 hover:border-amber-500 hover:text-amber-500 transition text-center"
              >
                How I Work
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-amber-500 font-semibold text-sm uppercase tracking-wide mb-2">Official ambassador</p>
              <h2 className="text-3xl font-bold">Clear-Armor &amp; TruArmor</h2>
              <p className="text-slate-300 mt-3 max-w-2xl">
                Diana Cervantes is an official ambassador for Clear-Armor LLC security laminates and TruArmor vehicle armor.
                Victa leads with assessment; Clear-Armor remains the manufacturer.
              </p>
            </div>
            <div
              className="inline-flex flex-col items-start rounded-lg border border-amber-500/40 bg-slate-950/80 px-4 py-3 text-left"
              aria-label="Victa Official Ambassador for Clear-Armor and TruArmor"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-500">Victa Official Ambassador</span>
              <span className="text-sm text-slate-300">Clear-Armor &amp; TruArmor</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="p-8 bg-slate-950/60 rounded-lg border border-slate-800 hover:border-amber-500/50 transition flex flex-col gap-4">
              <img
                src="/images/clear-armor-logo-light.png"
                alt="Clear-Armor logo"
                className="max-w-[240px] h-auto"
              />
              <p className="text-slate-300 flex-grow">
                Transform existing glass into armor with SL-15, SL-31, and bullet-resistant laminates. Ideal for schools,
                businesses, and public spaces that need time and deterrence without changing how the building looks.
              </p>
              <Link
                to="/clear-armor"
                className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:text-amber-400 transition"
              >
                Explore Clear-Armor laminates
                <ArrowRight size={18} />
              </Link>
            </article>
            <article className="p-8 bg-slate-950/60 rounded-lg border border-slate-800 hover:border-amber-500/50 transition flex flex-col gap-4">
              <h3 className="text-2xl font-bold">TruArmor Vehicle Armor</h3>
              <p className="text-slate-300 flex-grow">
                The only transferable vehicle armor in the world. Ultra-light, DOT-certified protection that fits your
                existing glass and moves with you between vehicles.
              </p>
              <Link
                to="/truarmor"
                className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:text-amber-400 transition"
              >
                Explore TruArmor
                <ArrowRight size={18} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section id="approach" className="py-20 px-6 bg-slate-900/50 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16">Assessment-First Approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Deep Dive Assessment',
                description:
                  'I evaluate your physical layout, threat profile, existing systems, and operational constraints. No assumptions, no sales pitch, just thorough analysis.',
              },
              {
                step: '02',
                title: 'Custom Recommendations',
                description:
                  'Based on what I find, I recommend solutions from the full spectrum: physical hardening (including Clear-Armor laminates or TruArmor when appropriate), process improvements, or vendor partnerships.',
              },
              {
                step: '03',
                title: 'Strategic Implementation',
                description:
                  'Whether we coordinate ambassador-supported hardening or guide you through vendor selection, I make sure the solution fits how your site operates.',
              },
            ].map((item) => (
              <div key={item.step} className="space-y-4">
                <div className="text-5xl font-bold text-amber-500/30">{item.step}</div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Services</h2>
          <p className="text-xl text-slate-300 mb-16 max-w-3xl">
            I bring together physical security, Clear-Armor and TruArmor protection, and community strategy to help schools,
            companies, and municipalities harden their buildings and prepare their people.
          </p>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                icon: Shield,
                title: 'Physical Security & Threat Mitigation',
                items: [
                  'Threat assessments and vulnerability analysis',
                  'Physical hardening recommendations (glazing, perimeter, access control)',
                  'Official Clear-Armor laminate and TruArmor guidance when the assessment supports it',
                ],
              },
              {
                icon: Users,
                title: 'Community Outreach & Education',
                items: [
                  'TruTrauma life-safety and crisis training with tailored emergency response planning',
                  'Immersive scenarios for critical incidents, natural disasters, and active shooter events',
                  'STOP THE BLEED® with certified Clear-Armor instructors',
                  'Situational awareness and high-stress decision-making',
                ],
                learnMore: {
                  href: 'https://clear-armor.com/pages/trutrauma-crisis-training',
                  label: 'TruTrauma crisis training at Clear-Armor',
                },
              },
              {
                icon: CheckCircle,
                title: 'Strategic Consulting',
                items: [
                  'Long-term security roadmapping',
                  'Evaluate AI-enabled security products with clear eyes',
                  'Vendor selection and RFP support',
                  'Budget, feasibility, and ongoing advisory',
                ],
              },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="flex h-full flex-col p-8 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-amber-500/50 transition"
                >
                  <Icon className="text-amber-500 mb-4" size={32} />
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <ul className="flex-1 space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-3 text-slate-300">
                        <ChevronRight size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {service.learnMore && (
                    <a
                      href={service.learnMore.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 pt-4 text-sm text-amber-500 hover:text-amber-400 transition"
                    >
                      {service.learnMore.label}
                      <ArrowRight size={16} aria-hidden />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-10">Why Victa Security</h2>
          <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start mb-10">
            <div className="flex-shrink-0 mx-auto md:mx-0 text-center space-y-4">
              <img
                src="/images/diana-cervantes.jpg"
                alt="Diana Cervantes, founder of Victa Security Solutions"
                width={280}
                height={280}
                className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover object-top border-4 border-slate-800 shadow-lg mx-auto"
              />
              <div
                className="inline-flex flex-col items-center rounded-lg border border-amber-500/40 bg-slate-900/90 px-5 py-4 text-center max-w-[240px] mx-auto"
                aria-label="Victa Official Ambassador for Clear-Armor and TruArmor"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-500">
                  Victa Official Ambassador
                </span>
                <span className="text-sm text-slate-300 mt-1">Clear-Armor &amp; TruArmor</span>
              </div>
            </div>
            <div className="space-y-6 text-lg text-slate-300 flex-1">
              <p>
                Victa is Latin, from <em>vincere</em>, to overcome. The same root named Victoria, victory, and{' '}
                <em>victrix</em>, a woman who prevails. Victa is the feminine word for the one an attack is meant to defeat.
                That is who I show up for. I work so a school, a company, or a municipality is still standing, with people,
                equipment, and facility intact, and able to keep growing.
              </p>
              <p>
                AI is moving into every part of how people live and work, including how they protect people and facilities,
                and how those with malicious intent probe for weakness. Detection systems, access platforms, and decision
                tools are getting smarter; so are social engineering, deepfakes, and automated attacks. That gap is where
                organizations get left behind.
              </p>
              <p>
                I stay at the cutting edge of technology, people, and policy so you do not. I help you evaluate AI-enabled
                security products with clear eyes, harden the human and process layers attackers still exploit, and align
                recommendations with the policies your organization actually operates in.
              </p>
              <p>
                With 18 years in customer success and enterprise sales engineering, I bring a solution-driven approach, not
                a product pitch. I assess what you need and recommend the best path forward, including official Clear-Armor
                and TruArmor solutions when they fit. I work with schools, companies, and municipal facilities where security
                is non-negotiable and risk tolerance is low.
              </p>
              <p>
                I have relationships with cybersecurity experts, physical monitoring experts, and perimeter protection
                experts. Together with their expertise, I can support you in protecting your people, equipment, and facility
                so you can keep growing.
              </p>
            </div>
          </div>
          <a
            href="https://www.credly.com/badges/c06e0b61-f404-4d6f-88cb-b84a3cb9303d/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-base text-slate-300 hover:text-amber-400 transition"
          >
            <img
              src="/images/asis-member.png"
              alt="ASIS International Member badge"
              width={120}
              height={120}
              className="h-24 w-24 object-contain"
            />
            <span>ASIS International member. Verify on Credly.</span>
          </a>
          <div className="pt-8 mt-8 border-t border-slate-700">
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Ambassador note:</strong> Victa Security Solutions is an official ambassador
              for Clear-Armor LLC, the patent-holding manufacturer behind Clear-Armor security laminates and TruArmor vehicle
              armor. Product specifications, testing, and warranties are defined by Clear-Armor; I help you assess fit and
              coordinate next steps locally.{' '}
              <a href="https://clear-armor.com/" className="text-amber-500 hover:text-amber-400" target="_blank" rel="noopener noreferrer">
                clear-armor.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-lg p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Assess Your Security Posture?</h2>
          <p className="text-xl text-slate-300">
            A no-cost initial assessment takes 30 minutes and uncovers risks you might not see.
          </p>
          <button
            type="button"
            onClick={() => openConsultation()}
            className="px-8 py-3 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition mx-auto block"
          >
            Schedule Your Assessment
          </button>
        </div>
      </section>
    </>
  );
}
