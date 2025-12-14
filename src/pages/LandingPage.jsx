import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-white min-h-screen font-display">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-20 lg:pt-28 pb-12 md:pb-24">
        {/* Background Blobs (Hidden on very small screens to save performance) */}
        <div className="hidden md:block absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60 z-0"></div>
        <div className="hidden md:block absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 z-0"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                
                {/* Text Content */}
                <div className="flex flex-col gap-5 md:gap-6 max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 md:px-4 text-xs md:text-sm font-bold text-emerald-700 w-fit shadow-sm mx-auto lg:mx-0">
                        <span className="flex size-2 md:size-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        AI-Powered Nutrition
                    </div>
                    
                    {/* Responsive Heading Sizes */}
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-tight">
                        Smart Diet Plans Based on Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Health</span>
                    </h1>
                    
                    <p className="text-base md:text-lg leading-relaxed text-slate-600">
                        Don't guess with your health. We analyze your BMI, medical conditions (Diabetes, PCOD, etc.), and preferences to generate the perfect meal plan.
                    </p>
                    
                    {/* Responsive Buttons (Stack on mobile, row on desktop) */}
                    <div className="mt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full">
                        <Link to="/generate" className="w-full sm:w-auto inline-flex h-12 md:h-14 items-center justify-center rounded-xl bg-emerald-500 px-8 text-base font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-600 hover:-translate-y-1">
                            Generate Diet Plan
                        </Link>
                        <button className="w-full sm:w-auto inline-flex h-12 md:h-14 items-center justify-center rounded-xl border-2 border-slate-100 bg-white px-8 text-base font-bold text-slate-600 transition-all hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Hero Image Composition */}
                <div className="relative w-full mt-8 lg:mt-0">
                    <div className="relative rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200 overflow-hidden aspect-[4/3] group border-4 border-white">
                        <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop" 
                             alt="Healthy Salad Bowl" 
                             className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        
                        {/* Floating Card: Adjusted for Mobile */}
                        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-slate-100 shadow-xl flex items-center gap-3 md:gap-4">
                            <div className="size-10 md:size-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                <span className="material-symbols-outlined text-xl md:text-2xl">check_circle</span>
                            </div>
                            <div>
                                <p className="font-bold text-xs md:text-sm text-slate-900">Diet Plan Generated</p>
                                <p className="text-[10px] md:text-xs text-slate-500">Optimized for Hypertension</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 sm:text-4xl mb-3">
                    Why Choose SmartDiet AI?
                </h2>
                <p className="text-base md:text-lg text-slate-600">
                    Tailored nutrition backed by science and artificial intelligence.
                </p>
            </div>
            {/* Grid switches from 1 column (mobile) to 3 columns (desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <FeatureCard 
                    icon="medical_services" 
                    title="Disease Specific" 
                    desc="Expertly designed plans for Diabetes, Hypertension, and PCOD." 
                />
                <FeatureCard 
                    icon="bolt" 
                    title="AI Powered" 
                    desc="Precise macro calculations and food pairing suggestions." 
                />
                <FeatureCard 
                    icon="favorite" 
                    title="Holistic Health" 
                    desc="Focusing on immunity, digestion, and long-term vitality." 
                />
            </div>
        </div>
      </section>
    </div>
  );
};

// Feature Card
const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all hover:-translate-y-1 group">
    <div className="mb-4 md:mb-6 inline-flex size-12 md:size-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
        <span className="material-symbols-outlined text-2xl md:text-3xl">{icon}</span>
    </div>
    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">{title}</h3>
    <p className="text-sm md:text-base text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;