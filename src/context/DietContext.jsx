import React, { createContext, useState, useContext } from 'react';

const DietContext = createContext();

export const DietProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    // Basic Bio
    age: '',
    gender: 'male',
    height: '', // cm
    weight: '', // kg
    
    // Health Conditions (Multi-select is crucial for India - e.g., Diabetes + Thyroid)
    conditions: [], 
    
    // Indian Dietary Nuances
    dietType: 'veg', // veg, non-veg, vegan, eggitarian
    meatPreferences: [], // If non-veg: ['chicken', 'fish', 'mutton']
    exclusions: [], // ['onion', 'garlic', 'lactose', 'gluten']
    
    generatedPlan: null // Store the result here
  });

  const updateProfile = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <DietContext.Provider value={{ userProfile, updateProfile, setUserProfile }}>
      {children}
    </DietContext.Provider>
  );
};

export const useDiet = () => useContext(DietContext);