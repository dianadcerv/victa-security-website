import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import DiscoveryIntake from './pages/DiscoveryIntake';
import DiscoveryRedirect from './pages/DiscoveryRedirect';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/intake/:clientSlug" element={<DiscoveryIntake />} />
        <Route path="/discovery" element={<DiscoveryRedirect />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
