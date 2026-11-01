import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { INTEREST_OPTIONS } from '../data/interestMap';

export default function ConsultationModal({
  open,
  onClose,
  formData,
  onInputChange,
  onSubmit,
  submitting,
  submitMessage,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Schedule Assessment</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-50" aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {submitMessage === 'success' ? (
          <div className="space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 text-center space-y-2">
              <CheckCircle className="text-emerald-500 mx-auto" size={48} />
              <h4 className="text-xl font-semibold">Thank You!</h4>
              <p className="text-slate-300">Your assessment request has been received. I&apos;ll follow up within 24 hours.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="consult-organization">
                Organization Name
              </label>
              <input
                id="consult-organization"
                type="text"
                name="organization"
                value={formData.organization}
                onChange={onInputChange}
                placeholder="Your organization"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="consult-name">
                Your Name
              </label>
              <input
                id="consult-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                placeholder="Full name"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="consult-email">
                Email
              </label>
              <input
                id="consult-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={onInputChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="consult-phone">
                Phone
              </label>
              <input
                id="consult-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onInputChange}
                placeholder="(123) 456-7890"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="consult-interest">
                Primary Interest
              </label>
              <select
                id="consult-interest"
                name="interest"
                value={formData.interest}
                onChange={onInputChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 focus:outline-none focus:border-amber-500"
                required
              >
                <option value="">Select one</option>
                {INTEREST_OPTIONS.map((option) => (
                  <option key={option.slug} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="consult-notes">
                Brief Description (Optional)
              </label>
              <textarea
                id="consult-notes"
                name="notes"
                value={formData.notes}
                onChange={onInputChange}
                placeholder="What are you trying to solve?"
                rows={3}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
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
  );
}
