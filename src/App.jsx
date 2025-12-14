import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DietProvider } from './context/DietContext';
import LandingPage from './pages/LandingPage'; // (Use the HTML code from previous response)
import IntakeForm from './pages/IntakeForm';
import DietChart from './pages/DietChart';
import { Activity } from 'lucide-react';

// Wrapper layout component
const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-800">
           <Activity className="text-primary"/> SmartDiet AI
        </Link>
        <div className="flex gap-4">
            <Link to="/login" className="text-slate-600 hover:text-primary font-medium">Login</Link>
            <Link to="/generate" className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-600">Get Started</Link>
        </div>
      </div>
    </nav>
    <main className="flex-grow">{children}</main>
    <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        © 2025 SmartDiet AI. Designed for Indian Health Standards.
    </footer>
  </div>
);

function App() {
  return (
    <DietProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/generate" element={<IntakeForm />} />
            <Route path="/diet-plan" element={<DietChart />} />
            <Route path="/login" element={<div className="p-20 text-center">Login Placeholder</div>} />
          </Routes>
        </Layout>
      </Router>
    </DietProvider>
  );
}

export default App;