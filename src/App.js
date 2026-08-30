import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Athletes from './pages/Athletes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Athletes />} />
      <Route path="/brands" element={<Home />} />
    </Routes>
  );
}

export default App;
