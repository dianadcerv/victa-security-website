import { useState } from 'react';

const INTAKE_ENDPOINT = process.env.REACT_APP_INTAKE_ENDPOINT || '';
const INTAKE_SECRET = process.env.REACT_APP_INTAKE_SECRET || '';
const PLACEHOLDER_MARKERS = ['YOUR_DEPLOYMENT_ID', 'choose-a-long-random-string'];

function isRequestConfigured() {
  if (!INTAKE_ENDPOINT || !INTAKE_SECRET) return false;
  return !PLACEHOLDER_MARKERS.some(
    (marker) => INTAKE_ENDPOINT.includes(marker) || INTAKE_SECRET.includes(marker)
  );
}

function isGoogleAppsScriptUrl(url) {
  return url.includes('script.google.com');
}

const emptyForm = {
  organization: '',
  name: '',
  email: '',
  phone: '',
  interest: '',
  notes: '',
};

export function useConsultationForm() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openConsultation = (prefillInterest = '') => {
    if (prefillInterest) {
      setFormData((prev) => ({ ...prev, interest: prefillInterest }));
    }
    setConsultationOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    if (!isRequestConfigured()) {
      console.error('Request form backend is not configured (REACT_APP_INTAKE_ENDPOINT / REACT_APP_INTAKE_SECRET).');
      setSubmitMessage('error');
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        type: 'lead',
        organization: formData.organization,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        interest: formData.interest,
        notes: formData.notes,
        submittedAt: new Date().toISOString(),
      };

      const body = new URLSearchParams();
      body.append('secret', INTAKE_SECRET);
      body.append('payload', JSON.stringify(payload));
      body.append('type', 'lead');

      const fetchOptions = {
        method: 'POST',
        body,
        ...(isGoogleAppsScriptUrl(INTAKE_ENDPOINT) ? { mode: 'no-cors' } : {}),
      };

      const response = await fetch(INTAKE_ENDPOINT, fetchOptions);

      if (isGoogleAppsScriptUrl(INTAKE_ENDPOINT) || response.ok) {
        setSubmitMessage('success');
        setFormData(emptyForm);
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

  return {
    consultationOpen,
    setConsultationOpen,
    openConsultation,
    formData,
    handleInputChange,
    handleFormSubmit,
    submitting,
    submitMessage,
  };
}
