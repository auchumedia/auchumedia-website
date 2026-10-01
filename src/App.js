import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TravailDetail from './pages/TravailDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/travaux/:slug" element={<TravailDetail />} />
    </Routes>
  );
}

export default App;
