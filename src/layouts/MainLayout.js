import React from 'react';
import { Outlet } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import ConsultationModal from '../components/ConsultationModal';
import { ConsultationContext } from '../context/ConsultationContext';
import { useConsultationForm } from '../hooks/useConsultationForm';

export default function MainLayout() {
  const consultation = useConsultationForm();

  return (
    <ConsultationContext.Provider value={consultation}>
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <SiteNav />
        <Outlet />
        <SiteFooter />
        <ConsultationModal
          open={consultation.consultationOpen}
          onClose={() => consultation.setConsultationOpen(false)}
          formData={consultation.formData}
          onInputChange={consultation.handleInputChange}
          onSubmit={consultation.handleFormSubmit}
          submitting={consultation.submitting}
          submitMessage={consultation.submitMessage}
        />
      </div>
    </ConsultationContext.Provider>
  );
}
