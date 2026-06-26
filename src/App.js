import React, { useState } from 'react';
import { Menu, X, ChevronRight, Shield, Lightbulb, Users, CheckCircle, ArrowRight } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqznapy';

const products = [
  {
    name: "SL-15 Security Laminate",
    tagline: "Forced Entry & Shooter Deterrence",
    description:
      "15-mil transparent laminate that holds glass in place under repeated impact, buying critical time for first responders. Shot through multiple times without collapsing. Optically clear — no visible change to your facility.",
    specs: ["15 mil | 420 psi break strength", "87% visible light transmitted | 99% UV rejection", "5-year material / 10-year installation warranty"],
    certifications: ["ANSI Z97.1", "BMAG Level 1", "CPSC 16 CFR", "ASTM E84", "ULC S332-93"],
    bestFor: ["Schools & universities", "Retail & commercial", "Municipal offices"],
  },
  {
    name: "SL-31 Riot Laminate",
    tagline: "Riot & Prolonged Targeted Attack",
    description:
      "World-patented 31-mil laminate engineered for sustained, high-force attacks and crowd riots. 2.6× the break strength of SL-15 — designed for high-value facilities where standard deterrence isn't enough.",
    specs: ["31 mil | 1,100 psi break strength", "87% visible light transmitted | Optically clear", "5-year material / 10-year installation warranty"],
    certifications: ["ANSI Z97.1", "BMAG Level 1", "ASTM E84", "Hospital Safety Compliance", "ULC S332-93"],
    bestFor: ["Government buildings", "Financial institutions", "Healthcare facilities"],
  },
  {
    name: "BR Bullet-Resistant Laminate",
    tagline: "One-Way Bullet Resistant",
    description:
      "Transforms existing glass into a one-way ballistic shield — stops incoming rounds while allowing response from inside. Third-party verified. GSA Level 1 & 2 certified for federal facility compliance.",
    specs: ["Variable thickness | 1,500+ psi break strength", "Optically clear | 3rd-party independently verified", "GSA Level 1 & 2 — federal facility eligible"],
    certifications: ["UL 752", "GSA Level 1 & 2", "BMAG Level 1", "CPSC 16 CFR", "ANSI Z97.1"],
    bestFor: ["Federal & government facilities", "Law enforcement", "Secure command centers"],
  },
  {
    name: "Flex-Board Ballistic Panels",
    tagline: "NIJ-Rated Rigid Armor",
    description:
      "Flexible, curvable ballistic boards for retrofitting doors, desks, walls, and safe rooms. No structural renovation required — installs in 1–2 hours per door. Zero ricochet. Independently tested at NTS Labs.",
    specs: ["NIJ IIIA (handguns) & NIJ III (rifles)", "1.7–3.2 lbs/sqft | No ricochet", "1–2 hrs install per door | No retrofitting required"],
    certifications: ["NIJ-STD-0108.01", "NTS Labs Tested", "GSA Level 1 & 2", "UL 752 Level III", "BMAG Level 1"],
    bestFor: ["Safe rooms & panic rooms", "Reception desks", "School classrooms"],
  },
];

export default function VictaSecuritySolutions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [formData, setFormData] = useState({
    organization: '',
    name: '',
    email: '',
    phone: '',
    interest: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization: formData.organization,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        setSubmitMessage('success');
        setFormData({ organization: '', name: '', email: '', phone: '', interest: '', notes: '' });
        setTimeout(() => {
          setConsultationOpen(false);
          setSubmitMessage('');
        }, 2000);
      } else {
        setSubmitMessage('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3" aria-label="Victa Security Solutions LLC">
            <img src="/images/logo-emblem.png" alt="" className="h-10 w-auto" />
            <span className="text-2xl font-bold tracking-tight leading-none">
              <span className="text-slate-50">Victa</span>
              <span className="text-amber-500"> Security</span>
            </span>
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-50">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex gap-8">
            <a href="#approach" className="text-slate-300 hover:text-amber-500 transition">Approach</a>
            <a href="#services" className="text-slate-300 hover:text-amber-500 transition">Services</a>
            <a href="#products" className="text-slate-300 hover:text-amber-500 transition">Products</a>
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
            <a href="#products" className="block text-slate-300 hover:text-amber-500">Products</a>
            <a href="#about" className="block text-slate-300 hover:text-amber-500">About</a>
            <button
              onClick={() => { setConsultationOpen(true); setMenuOpen(false); }}
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
              Assessment-first approach to physical security, threat mitigation, and technology implementation. We identify risks others miss and recommend solutions — including certified ballistic protection products — tailored to your reality, not our inventory.
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
                description:
                  "We evaluate your physical layout, threat profile, existing systems, and operational constraints. No assumptions, no sales pitch, just thorough analysis.",
              },
              {
                step: "02",
                title: "Custom Recommendations",
                description:
                  "Based on what we find, we recommend solutions from the full spectrum: physical hardening, certified ballistic products, technology implementation, process improvements, or vendor partnerships.",
              },
              {
                step: "03",
                title: "Strategic Implementation",
                description:
                  "Whether we implement directly or guide you through vendor selection, we ensure solutions actually solve your problem and integrate cleanly.",
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
                  "Certified Clear-Armor laminate & ballistic board installation",
                  "Compliance readiness (NIJ, GSA, CMMC, ANSI, UL 752)",
                ],
              },
              {
                icon: Lightbulb,
                title: "SaaS Implementation & Advisory",
                items: [
                  "System implementation and configuration",
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

      {/* Products */}
      <section id="products" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-semibold">
            Certified Clear-Armor Dealer
          </div>
          <h2 className="text-4xl font-bold mb-4">Ballistic Protection Products</h2>
          <p className="text-xl text-slate-300 mb-16 max-w-3xl">
            As a certified seller of Clear-Armor LLC's patented product line through our partnership with Victus Defense LLC, we offer independently tested, patent-protected solutions for every threat level — from forced-entry deterrence to GSA-certified bullet-resistant installations.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, idx) => (
              <div key={idx} className="p-8 bg-slate-950/60 rounded-lg border border-slate-800 hover:border-amber-500/50 transition space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                  <p className="text-amber-500 font-medium mt-1">{product.tagline}</p>
                </div>
                <p className="text-slate-300 leading-relaxed">{product.description}</p>
                <ul className="space-y-1">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex gap-3 text-slate-400 text-sm">
                      <ChevronRight size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.certifications.map((cert, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded border border-slate-700">
                      {cert}
                    </span>
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-800">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">Best For</p>
                  <div className="flex flex-wrap gap-2">
                    {product.bestFor.map((use, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-slate-500 text-center">
            All Clear-Armor products are independently tested by NTS Technical Systems and carry a 5-year material / 10-year installation warranty. DUNS & CAGE numbers available for government procurement.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Why Victa Security</h2>
          <div className="space-y-6 text-lg text-slate-300">
            <p>
              With 18 years in SaaS implementation, customer success, and enterprise sales engineering, I've seen firsthand how organizations solve complex problems: through deep understanding, clear communication, and strategic partnerships.
            </p>
            <p>
              I bring that experience to physical security consulting. Most consultants are product-driven: they sell what they have. I'm solution-driven: I assess what you need and recommend the best approach, whether that's our direct services, a certified product installation, or process improvement.
            </p>
            <p>
              I specialize in working with government agencies, municipal facilities, schools, and corporate organizations where security is non-negotiable and risk tolerance is low.
            </p>
            <div className="pt-4 border-t border-slate-700">
              <p className="text-sm text-slate-400">
                <strong>Note:</strong> As a certified seller of Clear-Armor LLC — the patent-holding manufacturer behind the glass laminate and ballistic panel products above — through our partnership with Victus Defense LLC, every product recommendation comes backed by four U.S. patents, independent third-party testing (NTS Technical Systems), and a 10-year installation warranty. You get strategic guidance and certified product expertise under one roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-slate-900/50">
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
              <button onClick={() => setConsultationOpen(false)} className="text-slate-400 hover:text-slate-50">
                <X size={24} />
              </button>
            </div>

            {submitMessage === 'success' ? (
              <div className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 text-center space-y-2">
                  <CheckCircle className="text-emerald-500 mx-auto" size={48} />
                  <h4 className="text-xl font-semibold">Thank You!</h4>
                  <p className="text-slate-300">Your assessment request has been received. I'll follow up within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Organization Name</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="Your organization"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Primary Interest</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 focus:outline-none focus:border-amber-500"
                    required
                  >
                    <option value="">Select one</option>
                    <option value="Physical Security Assessment">Physical Security Assessment</option>
                    <option value="SaaS Implementation">SaaS Implementation</option>
                    <option value="Security Laminate / Glass Hardening">Security Laminate / Glass Hardening</option>
                    <option value="Ballistic Panels">Ballistic Panels</option>
                    <option value="Multiple Services">Multiple Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Brief Description (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
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
                    disabled={submitting}
                    className="flex-1 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Request Assessment'}
                  </button>
                </div>
                {submitMessage === 'error' && (
                  <p className="text-sm text-red-400 text-center">
                    There was an error submitting your request. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <img src="/images/logo.png" alt="Victa Security Solutions LLC" className="h-28 w-auto mb-4" />
              <p className="text-slate-400">Strategic security consulting for communities and organizations.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#approach" className="hover:text-amber-500 transition">Our Approach</a></li>
                <li><a href="#services" className="hover:text-amber-500 transition">Services</a></li>
                <li><a href="#products" className="hover:text-amber-500 transition">Products</a></li>
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
            <p>&copy; 2026 Victa Security Solutions. All rights reserved.</p>
            <p>
              Specializing in <strong>Physical Security</strong> + <strong>SaaS Implementation</strong> + <strong>Community Strategy</strong>
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
