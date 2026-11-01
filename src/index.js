import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ClearArmorPage from './pages/ClearArmorPage';
import TruArmorPage from './pages/TruArmorPage';
import TruArmorRedirect from './pages/TruArmorRedirect';
import DiscoveryIntake from './pages/DiscoveryIntake';
import DiscoveryRedirect from './pages/DiscoveryRedirect';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/clear-armor" element={<ClearArmorPage />} />
          <Route path="/truarmor" element={<TruArmorPage />} />
          <Route path="/tru-armor" element={<TruArmorRedirect />} />
        </Route>
        <Route path="/intake/:clientSlug" element={<DiscoveryIntake />} />
        <Route path="/discovery" element={<DiscoveryRedirect />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
