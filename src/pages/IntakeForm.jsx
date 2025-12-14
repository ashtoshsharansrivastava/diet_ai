import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiet } from '../context/DietContext';
import { ChevronRight, ChevronLeft, Check, Activity } from 'lucide-react';

const IntakeForm = () => {
  const navigate = useNavigate();
  const { userProfile, updateProfile } = useDiet();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // --- HELPER HANDLERS ---

  // 1. Generic Multi-select (For Allergies/Meats)
  const toggleSelection = (field, item) => {
    const current = userProfile[field];
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    updateProfile(field, updated);
  };

  // 2. Smart Condition Logic (For Diseases vs None)
  const toggleCondition = (conditionId) => {
    let current = [...userProfile.conditions];

    if (conditionId === 'none') {
      // If 'None' is clicked, clear everything else and set only 'none'
      updateProfile('conditions', ['none']);
    } else {
      // If a disease is clicked...
      // First, remove 'none' if it exists (because now they have a condition)
      if (current.includes('none')) {
        current = [];
      }

      // Then toggle the specific condition
      if (current.includes(conditionId)) {
        current = current.filter(c => c !== conditionId);
      } else {
        current.push(conditionId);
      }
      
      updateProfile('conditions', current);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    // SIMULATING AI API CALL
    setTimeout(() => {
      // Mocking a response based on inputs
      const mockPlan = generateMockPlan(userProfile); 
      updateProfile('generatedPlan', mockPlan);
      setLoading(false);
      navigate('/diet-plan');
    }, 2000);
  };

  // --- MOCK AI LOGIC (Just for demo) ---
  const generateMockPlan = (profile) => {
    const isThyroid = profile.conditions.includes('thyroid');
    const isHealthy = profile.conditions.includes('none') || profile.conditions.length === 0;
    
    // Simple BMR calculation logic simulation
    let baseCalories = profile.gender === 'male' ? 2000 : 1800;
    if (profile.activityLevel === 'active') baseCalories += 400;
    if (profile.activityLevel === 'very_active') baseCalories += 700;

    return {
      title: isHealthy ? "Fitness & Vitality Plan" : (isThyroid ? "Thyroid & Metabolic Support" : "Therapeutic Health Plan"),
      calories: baseCalories,
      warnings: profile.exclusions.includes('onion') ? "Sattvic / Jain Friendly" : "Standard",
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-slate-100 h-2 w-full">
          <div className="bg-primary h-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <div className="p-8">
          {/* STEP 1: BIO + ACTIVITY */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Basic Biological Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                  <input type="number" value={userProfile.age} onChange={e => updateProfile('age', e.target.value)} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="Years" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                  <select value={userProfile.gender} onChange={e => updateProfile('gender', e.target.value)} className="w-full p-3 border rounded-xl bg-white">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Height (cm)</label>
                  <input type="number" value={userProfile.height} onChange={e => updateProfile('height', e.target.value)} className="w-full p-3 border rounded-xl" placeholder="170" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Weight (kg)</label>
                  <input type="number" value={userProfile.weight} onChange={e => updateProfile('weight', e.target.value)} className="w-full p-3 border rounded-xl" placeholder="75" />
                </div>

                {/* NEW: PHYSICAL ACTIVITY SECTION */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Physical Activity Level</label>
                  <div className="relative">
                    <Activity className="absolute top-3.5 left-3 text-slate-400" size={20} />
                    <select 
                      value={userProfile.activityLevel} 
                      onChange={e => updateProfile('activityLevel', e.target.value)}
                      className="w-full p-3 pl-10 border rounded-xl bg-white appearance-none focus:ring-2 focus:ring-primary outline-none"
                    >
                      <option value="sedentary">Sedentary (Little or no exercise)</option>
                      <option value="light">Lightly Active (Exercise 1-3 days/week)</option>
                      <option value="moderate">Moderately Active (Exercise 3-5 days/week)</option>
                      <option value="active">Very Active (Exercise 6-7 days/week)</option>
                      <option value="very_active">Extra Active (Physical job or heavy training)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: HEALTH CONDITIONS (Updated with None) */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Medical Profile</h2>
              <p className="text-slate-500 mb-6">Select all that apply. If you have no issues, select "None".</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'none', label: 'None (I am Healthy)', icon: '💪' }, // NEW OPTION
                  { id: 'diabetes', label: 'Diabetes (Type 2)', icon: '🩸' },
                  { id: 'hypertension', label: 'Hypertension (High BP)', icon: '❤️' },
                  { id: 'thyroid', label: 'Thyroid (Hypo/Hyper)', icon: '🦋' },
                  { id: 'pcod', label: 'PCOD / PCOS', icon: '🌸' },
                  { id: 'cholesterol', label: 'High Cholesterol', icon: '🍔' },
                  { id: 'uric_acid', label: 'High Uric Acid', icon: '🦶' }
                ].map((condition) => (
                  <div 
                    key={condition.id}
                    onClick={() => toggleCondition(condition.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${userProfile.conditions.includes(condition.id) ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    <span className="font-medium flex items-center gap-2 text-slate-700">
                      <span className="text-xl">{condition.icon}</span> {condition.label}
                    </span>
                    {userProfile.conditions.includes(condition.id) && <Check size={20} className="text-primary" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: INDIAN DIETARY NUANCES (Same as before) */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Food Preferences</h2>
              <p className="text-slate-500 mb-6">Customized for Indian households.</p>

              {/* Main Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">I am a...</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['veg', 'eggitarian', 'non-veg', 'vegan'].map((type) => (
                    <button
                      key={type}
                      onClick={() => updateProfile('dietType', type)}
                      className={`py-3 px-2 rounded-lg text-sm font-bold capitalize transition-colors ${userProfile.dietType === type ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* IF NON-VEG: Specific Meats */}
              {userProfile.dietType === 'non-veg' && (
                <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <label className="block text-sm font-bold text-orange-800 mb-3">Meat Restrictions</label>
                  <div className="flex flex-wrap gap-3">
                    {['Chicken', 'Fish', 'Mutton', 'Beef', 'Pork'].map((meat) => (
                      <button
                        key={meat}
                        onClick={() => toggleSelection('meatPreferences', meat)}
                        className={`px-4 py-2 rounded-full text-sm border transition-colors ${userProfile.meatPreferences.includes(meat) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-600 border-slate-200'}`}
                      >
                        {userProfile.meatPreferences.includes(meat) ? 'Eat' : 'Don\'t Eat'} {meat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* IF VEG/VEGAN: Sattvic Options */}
              {(userProfile.dietType === 'veg' || userProfile.dietType === 'vegan') && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Religious / Allergy Exclusions</label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: 'onion', label: 'No Onion' },
                      { id: 'garlic', label: 'No Garlic' },
                      { id: 'root_veg', label: 'No Root Veg (Jain)' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggleSelection('exclusions', item.id)}
                        className={`px-4 py-2 rounded-full text-sm border transition-colors ${userProfile.exclusions.includes(item.id) ? 'bg-red-500 text-white border-red-500' : 'bg-white text-slate-600 border-slate-200'}`}
                      >
                         {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* General Allergies */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-slate-700 mb-3">Intolerances</label>
                <div className="flex flex-wrap gap-3">
                  {[{id: 'lactose', label: 'Lactose'}, {id: 'gluten', label: 'Gluten'}, {id: 'nuts', label: 'Nuts'}].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleSelection('exclusions', item.id)}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${userProfile.exclusions.includes(item.id) ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border-slate-200'}`}
                    >
                       {userProfile.exclusions.includes(item.id) ? 'No ' : 'Contains '} {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="bg-slate-50 p-6 flex justify-between border-t border-slate-200">
          <button 
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-bold text-slate-600 ${step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-200'}`}
          >
            <ChevronLeft size={20} className="mr-2" /> Back
          </button>

          {step < 3 ? (
             <button 
             onClick={() => setStep(s => s + 1)}
             className="flex items-center bg-primary hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all"
           >
             Next <ChevronRight size={20} className="ml-2" />
           </button>
          ) : (
            <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all"
          >
            {loading ? 'Analyzing...' : 'Generate Plan'} {loading && <span className="ml-2 animate-spin">⏳</span>}
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntakeForm;