import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Athletes from './pages/Athletes';
import StickyTest from './pages/StickyTest';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Athletes />} />
      <Route path="/brands" element={<Home />} />
      <Route path="/test" element={<StickyTest />} />
    </Routes>
  );
}

export default App;
