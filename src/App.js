import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Athletes from './pages/Athletes';
import Entreprises from './pages/Entreprises';
import Projets from './pages/Projets';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/athletes" element={<Athletes />} />
      <Route path="/entreprises" element={<Entreprises />} />
      <Route path="/projets" element={<Projets />} />
    </Routes>
  );
}

export default App;
