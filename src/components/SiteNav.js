import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useConsultation } from '../context/ConsultationContext';

function sectionHref(hash) {
  return `/${hash}`;
}

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { openConsultation } = useConsultation();

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = (path) => {
    const active = location.pathname === path;
    return `${active ? 'text-amber-500' : 'text-slate-300'} hover:text-amber-500 transition`;
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3" aria-label="Victa Security Solutions LLC">
          <img src="/images/logo-emblem.png" alt="" className="h-10 w-auto" />
          <span className="text-2xl font-bold tracking-tight leading-none">
            <span className="text-slate-50">Victa</span>
            <span className="text-amber-500"> Security</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-50"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="hidden md:flex gap-8 items-center">
          <a href={sectionHref('#approach')} className="text-slate-300 hover:text-amber-500 transition">
            Approach
          </a>
          <a href={sectionHref('#services')} className="text-slate-300 hover:text-amber-500 transition">
            Services
          </a>
          <Link to="/clear-armor" className={navLinkClass('/clear-armor')}>
            Clear-Armor
          </Link>
          <Link to="/truarmor" className={navLinkClass('/truarmor')}>
            TruArmor
          </Link>
          <Link to="/government" className={navLinkClass('/government')}>
            Government
          </Link>
          <a href={sectionHref('#about')} className="text-slate-300 hover:text-amber-500 transition">
            About
          </a>
          <button
            type="button"
            onClick={() => openConsultation()}
            className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition"
          >
            Book Assessment
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 p-6 space-y-4">
          <a href={sectionHref('#approach')} className="block text-slate-300 hover:text-amber-500" onClick={closeMenu}>
            Approach
          </a>
          <a href={sectionHref('#services')} className="block text-slate-300 hover:text-amber-500" onClick={closeMenu}>
            Services
          </a>
          <Link to="/clear-armor" className="block text-slate-300 hover:text-amber-500" onClick={closeMenu}>
            Clear-Armor
          </Link>
          <Link to="/truarmor" className="block text-slate-300 hover:text-amber-500" onClick={closeMenu}>
            TruArmor
          </Link>
          <Link to="/government" className="block text-slate-300 hover:text-amber-500" onClick={closeMenu}>
            Government
          </Link>
          <a href={sectionHref('#about')} className="block text-slate-300 hover:text-amber-500" onClick={closeMenu}>
            About
          </a>
          <button
            type="button"
            onClick={() => {
              openConsultation();
              closeMenu();
            }}
            className="w-full px-4 py-2 bg-amber-500 text-slate-950 rounded-lg font-semibold"
          >
            Book Assessment
          </button>
        </div>
      )}
    </nav>
  );
}
