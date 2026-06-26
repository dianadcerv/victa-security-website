import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteHeader() {
  return (
    <header className="fixed w-full top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3" aria-label="Victa Security Solutions LLC">
          <img src="/images/logo-emblem.png" alt="" className="h-10 w-auto" />
          <span className="text-2xl font-bold tracking-tight leading-none">
            <span className="text-slate-50">Victa</span>
            <span className="text-amber-500"> Security</span>
          </span>
        </Link>
        <Link to="/" className="text-sm text-slate-300 hover:text-amber-500 transition">
          Back to site
        </Link>
      </div>
    </header>
  );
}
