import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Athletes from './pages/Athletes';
import Projets from './pages/Projets';
import ProjetDetail from './pages/ProjetDetail';
import APropos from './pages/APropos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/athletes" element={<Athletes />} />
      <Route path="/projets" element={<Projets />} />
      <Route path="/projets/:slug" element={<ProjetDetail />} />
      <Route path="/a-propos" element={<APropos />} />
    </Routes>
  );
}

export default App;
