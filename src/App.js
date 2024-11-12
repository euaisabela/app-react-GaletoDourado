import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; 
import ForgotPassword from './ForgotPassword'; 
import Cadastro from './Cadastro'; 
import Dashboard from './Dashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de Login */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Página de Recuperação de Senha */}
        <Route path="/esqueci-senha" element={<ForgotPassword />} />
        
        {/* Página de Cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Página do Dashboard - Somente para usuários autenticados */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
