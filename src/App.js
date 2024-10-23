import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; // Alterar o caminho se necessário
import Cadastro from './cadastro'; // seu componente de cadastro

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Altere de SignIn para Login */}
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
