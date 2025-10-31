import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SymptomChecker from './pages/SymptomChecker';
import EmergencyAssistance from './pages/EmergencyAssistance';
import AppointmentBooking from './pages/AppointmentBooking';
import HomeRemedies from './pages/HomeRemedies';
import MedicationReminders from './pages/MedicationReminders';
import NearbyCare from './pages/NearbyCare';
import HealthTips from './pages/HealthTips';
import HealthTipDetail from './pages/HealthTipDetail';
import MentalHealth from './pages/MentalHealth';
import LabTests from './pages/LabTests';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="symptom-checker" element={<SymptomChecker />} />
            <Route path="emergency" element={<EmergencyAssistance />} />
            <Route path="appointments" element={<AppointmentBooking />} />
            <Route path="home-remedies" element={<HomeRemedies />} />
            <Route path="medication-reminders" element={<MedicationReminders />} />
            <Route path="nearby-care" element={<NearbyCare />} />
            <Route path="health-tips" element={<HealthTips />} />
            <Route path="health-tips/:id" element={<HealthTipDetail />} />
            <Route path="mental-health" element={<MentalHealth />} />
            <Route path="lab-tests" element={<LabTests />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;