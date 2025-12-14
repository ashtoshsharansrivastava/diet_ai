import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 font-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="bg-emerald-50 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-emerald-500" />
              </div>
              <span className="font-bold text-xl text-slate-800">SmartDiet AI</span>
            </Link>
          </div>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Home</Link>
            <Link to="/features" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Features</Link>
            <Link to="/login" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Login</Link>
            <Link 
              to="/generate" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button (Visible on Mobile) */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-emerald-600 p-2 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-xl animate-fade-in-down">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link 
              to="/" 
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/generate" 
              className="block w-full text-center mt-4 bg-emerald-500 text-white px-5 py-3 rounded-xl font-bold shadow-md"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;