import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SecondScreen from './components/SecondScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/second/:param1/:param2" element={<SecondScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
