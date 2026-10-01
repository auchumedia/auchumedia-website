import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlanifierAppel from './pages/PlanifierAppel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planifier-un-appel" element={<PlanifierAppel />} />
    </Routes>
  );
}

export default App;
