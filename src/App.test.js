import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ConsultationContext } from './context/ConsultationContext';

const mockConsultation = {
  consultationOpen: false,
  setConsultationOpen: () => {},
  openConsultation: () => {},
  formData: {
    organization: '',
    name: '',
    email: '',
    phone: '',
    interest: '',
    notes: '',
  },
  handleInputChange: () => {},
  handleFormSubmit: (e) => e.preventDefault(),
  submitting: false,
  submitMessage: '',
};

test('home page shows strategic consulting headline', () => {
  render(
    <MemoryRouter>
      <ConsultationContext.Provider value={mockConsultation}>
        <HomePage />
      </ConsultationContext.Provider>
    </MemoryRouter>
  );

  expect(
    screen.getByRole('heading', {
      name: /Strategic Security Consulting for Schools, Companies, and Municipalities/i,
    })
  ).toBeInTheDocument();
});
