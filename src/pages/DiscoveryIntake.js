import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import FormField from '../components/FormField';
import { discoverySections, allFieldIds } from '../data/discoveryQuestions';
import { discoveryLabelFromSlug, interestBySlug } from '../data/interestMap';
import {
  buildFormStateFromSections,
  countFields,
  fetchIntakeSchema,
} from '../lib/fetchIntakeSchema';

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

function buildFallbackFormState(interestSlug) {
  const initial = allFieldIds.reduce((acc, id) => ({ ...acc, [id]: '' }), {});
  const discoveryLabel = discoveryLabelFromSlug(interestSlug);
  if (discoveryLabel) {
    initial.primaryInterest = discoveryLabel;
  }
  return initial;
}

export default function DiscoveryIntake() {
  const { clientSlug: rawSlug } = useParams();
  const [searchParams] = useSearchParams();
  const clientSlug = rawSlug || 'unspecified';
  const interestSlug = searchParams.get('interest') || '';
  const interestMeta = interestBySlug(interestSlug);

  const [sections, setSections] = useState(discoverySections);
  const [schemaSource, setSchemaSource] = useState('fallback');
  const [schemaLoading, setSchemaLoading] = useState(Boolean(interestSlug && INTAKE_ENDPOINT));
  const [formData, setFormData] = useState(() => buildFallbackFormState(interestSlug));
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadSchema() {
      if (!interestSlug || !INTAKE_ENDPOINT || PLACEHOLDER_MARKERS.some((m) => INTAKE_ENDPOINT.includes(m))) {
        setSchemaLoading(false);
        return;
      }

      setSchemaLoading(true);
      try {
        const schema = await fetchIntakeSchema(INTAKE_ENDPOINT, interestSlug);
        if (cancelled) return;

        if (schema && schema.sections && schema.sections.length) {
          setSections(schema.sections);
          setSchemaSource('google-doc');
          setFormData(
            buildFormStateFromSections(schema.sections, {
              primaryInterest: discoveryLabelFromSlug(interestSlug),
            })
          );
        } else {
          setSections(discoverySections);
          setSchemaSource('fallback');
          setFormData(buildFallbackFormState(interestSlug));
        }
      } catch (loadError) {
        console.error('Schema load failed; using built-in questions.', loadError);
        if (!cancelled) {
          setSections(discoverySections);
          setSchemaSource('fallback');
          setFormData(buildFallbackFormState(interestSlug));
        }
      } finally {
        if (!cancelled) setSchemaLoading(false);
      }
    }

    loadSchema();
    return () => {
      cancelled = true;
    };
  }, [interestSlug]);

  const totalFields = useMemo(() => countFields(sections), [sections]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (fieldId, option, checked) => {
    setFormData((prev) => {
      const current = Array.isArray(prev[fieldId]) ? prev[fieldId] : [];
      const next = checked
        ? current.includes(option)
          ? current
          : [...current, option]
        : current.filter((item) => item !== option);
      return { ...prev, [fieldId]: next };
    });
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
      type: 'intake',
      clientSlug,
      interestSlug: interestSlug || undefined,
      schemaSource,
      submittedAt: new Date().toISOString(),
      ...formData,
    };

    try {
      const body = new URLSearchParams();
      body.append('secret', INTAKE_SECRET);
      body.append('payload', JSON.stringify(submission));

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
      setError('There was a problem submitting the form. Please try again or email me directly.');
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
              Your discovery intake has been received. I will review your responses before our session so I can make the most of our time together.
            </p>
            <p className="text-slate-400">If anything changes before we meet, reply to your scheduling email and I will update my notes.</p>
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
            {interestMeta && (
              <p className="text-sm text-amber-500/90 font-medium">
                Focused on: {interestMeta.label}
              </p>
            )}
            <p className="text-lg text-slate-300">
              Please complete this form before our discovery session. Your answers help me understand your environment, risks, and goals so I can focus on what matters most.
            </p>
            <p className="text-sm text-slate-400">
              Estimated time: 10-15 minutes. Fields marked with * are required.
              {schemaSource === 'google-doc' && ' Questions synced from your Victa intake document.'}
            </p>
          </div>

          {schemaLoading ? (
            <p className="text-slate-400">Loading intake questions…</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              {sections.map((section, index) => (
                <section key={section.id || index} className="space-y-6 p-6 md:p-8 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div>
                    <p className="text-amber-500/70 text-sm font-semibold mb-1">
                      Section {index + 1} of {sections.length}
                    </p>
                    <h2 className="text-2xl font-semibold">{section.title}</h2>
                    {section.description ? (
                      <p className="text-slate-400 mt-2">{section.description}</p>
                    ) : null}
                  </div>
                  <div className="space-y-5">
                    {(section.fields || []).map((field) => (
                      <FormField
                        key={field.id}
                        field={field}
                        value={
                          formData[field.id] === undefined
                            ? field.type === 'checkbox'
                              ? []
                              : ''
                            : formData[field.id]
                        }
                        onChange={handleChange}
                        onCheckboxChange={handleCheckboxChange}
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
                <p className="text-xs text-slate-500 mt-3">
                  {totalFields} fields across {sections.length} sections
                  {schemaSource === 'fallback' && interestSlug
                    ? ' (built-in fallback. Sync Google Docs if this looks wrong)'
                    : ''}
                </p>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
