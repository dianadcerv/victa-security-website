import React from 'react';
import { Link } from 'react-router-dom';
import { useConsultation } from '../context/ConsultationContext';
import { SAM_REGISTRATION } from '../data/samRegistration';

export default function SiteFooter() {
  const { openConsultation } = useConsultation();

  return (
    <footer className="border-t border-slate-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <img src="/images/logo.png" alt="Victa Security Solutions LLC" className="h-28 w-auto mb-4" />
            <p className="text-slate-400">Strategic security consulting for schools, companies, and municipalities.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="/#approach" className="hover:text-amber-500 transition">
                  My Approach
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-amber-500 transition">
                  Services
                </a>
              </li>
              <li>
                <Link to="/clear-armor" className="hover:text-amber-500 transition">
                  Clear-Armor Laminates
                </Link>
              </li>
              <li>
                <Link to="/truarmor" className="hover:text-amber-500 transition">
                  TruArmor Vehicle Armor
                </Link>
              </li>
              <li>
                <Link to="/government" className="hover:text-amber-500 transition">
                  Government Contracting
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-amber-500 transition">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-slate-400 mb-2">Chicago, IL</p>
            <p className="text-slate-400">
              <button type="button" onClick={() => openConsultation()} className="text-amber-500 hover:text-amber-400">
                Schedule Assessment
              </button>
            </p>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <p>&copy; 2026 Victa Security Solutions. All rights reserved.</p>
          <p>
            Specializing in <strong>Physical Security</strong> + <strong>Ambassador Hardening</strong> +{' '}
            <strong>Community Strategy</strong>
          </p>
        </div>
        <p className="mt-4 text-center text-slate-500 text-xs">
          <Link to="/government" className="hover:text-amber-500 transition">
            UEI: {SAM_REGISTRATION.uei} · CAGE: {SAM_REGISTRATION.cageCode}
          </Link>
        </p>
        <p className="mt-6 text-center text-slate-500 text-xs tracking-wide">
          Built by Humans Using AI to Further Human Achievements
        </p>
      </div>
    </footer>
  );
}
