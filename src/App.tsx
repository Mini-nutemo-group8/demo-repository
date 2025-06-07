import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import Settings from './components/Settings';
import WebsiteDetails from './components/WebsiteDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <Header />
        <main className="py-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/website/:url" element={<WebsiteDetails />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
