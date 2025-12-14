import React from 'react';
import { useDiet } from '../context/DietContext';
import { Download, Share2, Printer, CheckCircle } from 'lucide-react';
import {Link} from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
const DietChart = () => {
  const { userProfile } = useDiet();
  
  // Fallback if accessed directly without generating a plan
  if (!userProfile.generatedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">No Plan Generated</h2>
          <p className="text-slate-500 mb-4">Please go back and fill out your details.</p>
          <a href="/generate" className="text-primary font-bold hover:underline">Go to Generator</a>
        </div>
      </div>
    );
  }

  // Helper variables
  const isVeg = userProfile.dietType === 'veg' || userProfile.dietType === 'vegan';
  const hasDiabetes = userProfile.conditions.includes('diabetes');

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/recipe/101" className="text-emerald-600 font-bold text-sm hover:underline mt-2 inline-block">
  View Recipe &rarr;
</Link>
<Link 
  to="/shopping-list" 
  className="flex items-center gap-2 bg-white border border-slate-200 hover:border-emerald-500 text-slate-600 hover:text-emerald-600 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md"
>
  <ShoppingCart size={18} /> Shopping List
</Link>
        {/* NEW HEADER: CLEAN WHITE STYLE */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 mb-8 relative overflow-hidden">
          {/* Subtle Background Gradient instead of Black */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-white to-white opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle size={14} /> AI Verified
                 </span>
                 {hasDiabetes && (
                   <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                     Diabetes Friendly
                   </span>
                 )}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">
                Your Personalized Health Plan
              </h1>
              <p className="text-slate-500 text-lg">
                Designed for <span className="font-bold text-slate-800 capitalize">{userProfile.gender}</span>, Age <span className="font-bold text-slate-800">{userProfile.age}</span> • Goal: <span className="text-emerald-600 font-medium">Stable Health & Immunity</span>
              </p>
            </div>

            <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-white border border-slate-200 hover:border-emerald-500 text-slate-600 hover:text-emerald-600 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md">
                    <Printer size={18} /> Print
                </button>
                <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-200 transform hover:-translate-y-0.5">
                    <Download size={18} /> Download PDF
                </button>
            </div>
          </div>
        </div>

        {/* The Diet Chart Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Morning */}
          <MealCard 
              title="Early Morning" 
              time="7:00 AM"
              food={isVeg ? "Methi Water + Soaked Almonds" : "Methi Water + Boiled Egg White"}
              desc="Boosts metabolism and controls blood sugar."
              isThyroid={userProfile.conditions.includes('thyroid')}
              icon="🌅"
          />

          {/* Breakfast */}
          <MealCard 
              title="Breakfast" 
              time="9:00 AM"
              food={userProfile.dietType === 'non-veg' && !userProfile.exclusions.includes('chicken') ? "Chicken Salami Sandwich (Multigrain)" : "Moong Dal Chilla with Mint Chutney"}
              desc="High protein, low glycemic index energy source."
              tags={['High Protein', 'Gluten Free']}
              icon="☕"
          />

          {/* Lunch */}
          <MealCard 
              title="Lunch" 
              time="1:30 PM"
              food="2 Roti (Bran) + Palak Paneer + Salad"
              desc={userProfile.conditions.includes('heart') ? "Low oil preparation for heart health." : "Balanced meal with fiber."}
              tags={['Fiber Rich', 'Iron Boost']}
              icon="🍛"
          />

          {/* Dinner */}
          <MealCard 
              title="Dinner" 
              time="8:00 PM"
              food={userProfile.exclusions.includes('lactose') ? "Grilled Tofu + Clear Soup" : "Bottle Gourd (Lauki) Sabzi + 1 Roti"}
              desc="Light and easy to digest for better sleep."
              tags={['Light', 'Detox']}
              icon="🌙"
          />
        </div>
      </div>
    </div>
  );
};

// Updated Card Design to match White Theme
const MealCard = ({ title, time, food, desc, tags = [], isThyroid, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
            <span className="text-2xl bg-slate-50 w-10 h-10 flex items-center justify-center rounded-lg">{icon}</span>
            <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">{title}</span>
                <p className="text-xs text-slate-400 font-medium">{time}</p>
            </div>
        </div>
        {isThyroid && (
            <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-2 py-1 rounded border border-purple-100">
                Thyroid Safe
            </span>
        )}
    </div>
    
    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">
        {food}
    </h3>
    <p className="text-sm text-slate-500 mb-5 leading-relaxed">
        {desc}
    </p>
    
    <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map(t => (
            <span key={t} className="text-[10px] font-semibold bg-slate-50 text-slate-600 px-2.5 py-1 rounded border border-slate-100">
                {t}
            </span>
        ))}
    </div>
  </div>
);

export default DietChart;