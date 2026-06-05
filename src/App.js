import React, { useState } from 'react';
import { Menu, X, ChevronRight, Shield, Lightbulb, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function VictaSecuritySolutions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-slate-50">Victa</span>
            <span className="text-amber-500"> Security</span>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-50"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex gap-8">
            <a href="#approach" className="text-slate-300 hover:text-amber-500 transition">Approach</a>
            <a href="#services" className="text-slate-300 hover:text-amber-500 transition">Services</a>
            <a href="#about" className="text-slate-300 hover:text-amber-500 transition">About</a>
            <button
              onClick={() => setConsultationOpen(true)}
              className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition"
            >
              Book Assessment
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 p-6 space-y-4">
            <a href="#approach" className="block text-slate-300 hover:text-amber-500">Approach</a>
            <a href="#services" className="block text-slate-300 hover:text-amber-500">Services</a>
            <a href="#about" className="block text-slate-300 hover:text-amber-500">About</a>
            <button
              onClick={() => {
                setConsultationOpen(true);
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-amber-500 text-slate-950 rounded-lg font-semibold"
            >
              Book Assessment
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Strategic Security Consulting for Communities & Organizations
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              Assessment-first approach to physical security, threat mitigation, and technology implementation. We identify risks others miss and recommend solutions tailored to your reality, not our inventory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setConsultationOpen(true)}
                className="px-6 py-3 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition flex items-center justify-center gap-2 group"
              >
                Schedule Free Assessment
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </button>
              <a
                href="#approach"
                className="px-6 py-3 border border-slate-700 rounded-lg font-semibold text-slate-300 hover:border-amber-500 hover:text-amber-500 transition"
              >
                How We Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16">Assessment-First Approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Deep Dive Assessment",
                description: "We evaluate your physical layout, threat profile, existing systems, and operational constraints. No assumptions, no sales pitch, just thorough analysis.",
              },
              {
                step: "02",
                title: "Custom Recommendations",
                description: "Based on what we find, we recommend solutions from the full spectrum: physical hardening, technology implementation, process improvements, or vendor partnerships.",
              },
              {
                step: "03",
                title: "Strategic Implementation",
                description: "Whether we implement directly or guide you through vendor selection, we ensure solutions actually solve your problem and integrate cleanly.",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div className="text-5xl font-bold text-amber-500/30">{item.step}</div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Services</h2>
          <p className="text-xl text-slate-300 mb-16 max-w-3xl">
            We combine expertise across physical security, enterprise software, and community strategy to deliver comprehensive solutions.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: "Physical Security & Threat Mitigation",
                items: [
                  "Threat assessments and vulnerability analysis",
                  "Physical hardening recommendations (glazing, perimeter, access control)",
                  "Security laminate implementation (Victus Defense partnership)",
                  "Compliance and regulatory readiness",
                ],
              },
              {
                icon: Lightbulb,
                title: "SaaS Implementation & Advisory",
                items: [
                  "Security system implementation and configuration",
                  "Software procurement guidance",
                  "Change management and adoption support",
                  "Integration and custom solutions",
                ],
              },
              {
                icon: Users,
                title: "Community Outreach & Education",
                items: [
                  "Safety training and awareness workshops",
                  "Educational seminars for community leaders",
                  "Best practice documentation and resources",
                  "Custom training programs for staff",
                ],
              },
              {
                icon: CheckCircle,
                title: "Strategic Consulting",
                items: [
                  "Long-term security roadmapping",
                  "Vendor selection and RFP support",
                  "Budget and feasibility planning",
                  "Ongoing advisory relationship",
                ],
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="p-8 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-amber-500/50 transition space-y-4">
                  <Icon className="text-amber-500" size={32} />
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-300">
                        <ChevronRight size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Why Victa Security</h2>
          <div className="space-y-6 text-lg text-slate-300">
            <p>
              With 18 years in SaaS implementation, customer success, and enterprise sales engineering, I've seen firsthand how organizations solve complex problems: through deep understanding, clear communication, and strategic partnerships.
            </p>
            <p>
              I bring that experience to physical security consulting. Most consultants are product-driven: they sell what they have. I'm solution-driven: I assess what you need and recommend the best approach, whether that's our direct services, a vendor partnership, or process improvement.
            </p>
            <p>
              I specialize in working with government agencies, municipal facilities, schools, and corporate organizations where security is non-negotiable and risk tolerance is low.
            </p>
            <div className="pt-4 border-t border-slate-700">
              <p className="text-sm text-slate-400">
                <strong>Note:</strong> For physical security laminate and hardening projects, I partner with Victus Defense, a specialized provider with deep expertise in security film installation and compliance. You get my strategic guidance plus their technical excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-lg p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Assess Your Security Posture?</h2>
          <p className="text-xl text-slate-300">
            A no-cost initial assessment takes 30 minutes and uncovers risks you might not see.
          </p>
          <button
            onClick={() => setConsultationOpen(true)}
            className="px-8 py-3 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition mx-auto block"
          >
            Schedule Your Assessment
          </button>
        </div>
      </section>

      {/* Consultation Modal */}
      {consultationOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Schedule Assessment</h3>
              <button
                onClick={() => setConsultationOpen(false)}
                className="text-slate-400 hover:text-slate-50"
              >
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Organization Name</label>
                <input
                  type="text"
                  placeholder="Your organization"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="(123) 456-7890"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Primary Interest</label>
                <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 focus:outline-none focus:border-amber-500">
                  <option value="">Select one</option>
                  <option value="physical">Physical Security Assessment</option>
                  <option value="saas">SaaS Implementation</option>
                  <option value="laminate">Security Laminate/Hardening</option>
                  <option value="mixed">Multiple Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Brief Description (Optional)</label>
                <textarea
                  placeholder="What are you trying to solve?"
                  rows="3"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setConsultationOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-700 rounded-lg text-slate-300 hover:border-slate-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition"
                >
                  Request Assessment
                </button>
              </div>
              <p className="text-xs text-slate-400 text-center">
                I'll follow up within 24 hours to confirm your assessment time.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="text-xl font-bold mb-4">
                <span className="text-slate-50">Victa</span>
                <span className="text-amber-500"> Security</span>
              </div>
              <p className="text-slate-400">Strategic security consulting for communities and organizations.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#approach" className="hover:text-amber-500 transition">Our Approach</a></li>
                <li><a href="#services" className="hover:text-amber-500 transition">Services</a></li>
                <li><a href="#about" className="hover:text-amber-500 transition">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-slate-400 mb-2">Chicago, IL</p>
              <p className="text-slate-400">
                <button onClick={() => setConsultationOpen(true)} className="text-amber-500 hover:text-amber-400">
                  Schedule Assessment
                </button>
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>&copy; 2024 Victa Security Solutions. All rights reserved.</p>
            <p>
              Specializing in <strong>Physical Security</strong> + <strong>SaaS Implementation</strong> + <strong>Community Strategy</strong>
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}