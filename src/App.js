import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './pages/List';
import Detalhes from './pages/Detalhes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/details/:pokemonName" element={<Detalhes />} />
      </Routes>
    </Router>
  );
}

export default App;