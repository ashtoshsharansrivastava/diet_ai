import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DietProvider } from './context/DietContext';

// Pages
import LandingPage from './pages/LandingPage';
import IntakeForm from './pages/IntakeForm';
import DietChart from './pages/DietChart';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetail';
import ShoppingList from './pages/ShoppingList';

function App() {
  return (
    <DietProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/generate" element={<IntakeForm />} />
          <Route path="/diet-plan" element={<DietChart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Routes>
      </Router>
    </DietProvider>
  );
}

export default App;