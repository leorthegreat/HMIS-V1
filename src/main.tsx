import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { ClientList } from './pages/ClientList';
import { ClientDetail } from './pages/ClientDetail';
import { Programs } from './pages/Programs';
import { ProgramDetail } from './pages/ProgramDetail';
import { CaseManagement } from './pages/CaseManagement';
import { CoordinatedEntry } from './pages/CoordinatedEntry';
import { Services } from './pages/Services';
import { TimeCard } from './pages/TimeCard';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="case-management" element={<CaseManagement />} />
          <Route path="clients" element={<ClientList />}>
            <Route path=":id" element={<ClientDetail />} />
          </Route>
          <Route path="coordinated-entry" element={<CoordinatedEntry />} />
          <Route path="programs" element={<Programs />}>
            <Route path=":id" element={<ProgramDetail />} />
          </Route>
          <Route path="services" element={<Services />} />
          <Route path="resources" element={<div className="flex h-full items-center justify-center text-gray-500">Resources Page</div>} />
          <Route path="time-card" element={<TimeCard />} />
          <Route path="messaging" element={<div className="flex h-full items-center justify-center text-gray-500">Messaging Page</div>} />
          <Route path="map" element={<div className="flex h-full items-center justify-center text-gray-500">Map Page</div>} />
          <Route path="reports" element={<div className="flex h-full items-center justify-center text-gray-500">Reports Page</div>} />
          <Route path="settings" element={<div className="flex h-full items-center justify-center text-gray-500">Settings Page</div>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);