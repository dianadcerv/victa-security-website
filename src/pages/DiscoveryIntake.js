import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import FormField from '../components/FormField';
import { discoverySections, allFieldIds } from '../data/discoveryQuestions';

const INTAKE_ENDPOINT = process.env.REACT_APP_INTAKE_ENDPOINT || '';
const INTAKE_SECRET = process.env.REACT_APP_INTAKE_SECRET || '';

const PLACEHOLDER_MARKERS = ['YOUR_DEPLOYMENT_ID', 'choose-a-long-random-string'];

function isIntakeConfigured() {
  if (!INTAKE_ENDPOINT || !INTAKE_SECRET) return false;
  return !PLACEHOLDER_MARKERS.some(
    (marker) => INTAKE_ENDPOINT.includes(marker) || INTAKE_SECRET.includes(marker)
  );
}

function isGoogleAppsScriptUrl(url) {
  return url.includes('script.google.com');
}

function buildInitialFormState() {
  return allFieldIds.reduce((acc, id) => ({ ...acc, [id]: '' }), {});
}

export default function DiscoveryIntake() {
  const { clientSlug: rawSlug } = useParams();
  const clientSlug = rawSlug || 'unspecified';
  const [formData, setFormData] = useState(buildInitialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const totalFields = useMemo(
    () => discoverySections.reduce((sum, section) => sum + section.fields.length, 0),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!isIntakeConfigured()) {
      setError(
        'Form backend is not configured yet. Set REACT_APP_INTAKE_ENDPOINT and REACT_APP_INTAKE_SECRET in .env (see SETUP.md), then restart npm start.'
      );
      setSubmitting(false);
      return;
    }

    const submission = {
      clientSlug,
      submittedAt: new Date().toISOString(),
      ...formData,
    };

    try {
      const body = new URLSearchParams();
      body.append('secret', INTAKE_SECRET);
      body.append('payload', JSON.stringify(submission));

      // Google Apps Script blocks reading the response from localhost (CORS).
      // no-cors still delivers the POST; verify the row in your Google Sheet.
      const fetchOptions = {
        method: 'POST',
        body,
        ...(isGoogleAppsScriptUrl(INTAKE_ENDPOINT) ? { mode: 'no-cors' } : {}),
      };

      const response = await fetch(INTAKE_ENDPOINT, fetchOptions);

      if (isGoogleAppsScriptUrl(INTAKE_ENDPOINT)) {
        setSubmitted(true);
        return;
      }

      const text = await response.text();
      let result = {};
      try {
        result = JSON.parse(text);
      } catch (parseError) {
        result = { success: response.ok };
      }

      if (!response.ok || result.success === false) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (submitError) {
      console.error(submitError);
      setError('There was a problem submitting the form. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <SiteHeader />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <CheckCircle className="mx-auto text-amber-500" size={56} />
            <h1 className="text-4xl font-bold">Thank You</h1>
            <p className="text-lg text-slate-300">
              Your discovery intake has been received. We will review your responses before our session so we can make the most of our time together.
            </p>
            <p className="text-slate-400">If anything changes before we meet, reply to your scheduling email and we will update our notes.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-4">
            <p className="text-amber-500 text-sm font-semibold uppercase tracking-wide">Pre-Discovery Intake</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Discovery Intake Form</h1>
            <p className="text-lg text-slate-300">
              Please complete this form before our discovery session. Your answers help us understand your environment, risks, and goals so we can focus on what matters most.
            </p>
            <p className="text-sm text-slate-400">Estimated time: 10-15 minutes. Fields marked with * are required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {discoverySections.map((section, index) => (
              <section key={section.id} className="space-y-6 p-6 md:p-8 rounded-xl bg-slate-900/50 border border-slate-800">
                <div>
                  <p className="text-amber-500/70 text-sm font-semibold mb-1">Section {index + 1} of {discoverySections.length}</p>
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                  <p className="text-slate-400 mt-2">{section.description}</p>
                </div>
                <div className="space-y-5">
                  {section.fields.map((field) => (
                    <FormField
                      key={field.id}
                      field={field}
                      value={formData[field.id]}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </section>
            ))}

            <div className="sticky bottom-0 bg-slate-950/95 backdrop-blur-sm border-t border-slate-800 -mx-6 px-6 py-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto px-8 py-3 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Discovery Intake'}
              </button>
              {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
              <p className="text-xs text-slate-500 mt-3">{totalFields} fields across {discoverySections.length} sections</p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
