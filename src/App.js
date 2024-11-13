import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; 
import Cadastro from './Cadastro'; 
import Dashboard from './Dashboard'; 
import RelatorioPagamentos from './RelatorioPagamentos'; 
import Usuarios from './Usuarios';  

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de Login */}
        <Route path="/" element={<Login />} />
        
        {/* Página de Cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Página de Relatório de Pagamentos */}
        <Route path="/relatorio-pagamentos" element={<RelatorioPagamentos />} />
        
        {/* Página do Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Página de Usuários */}
        <Route path="/usuarios" element={<Usuarios />} /> 
      </Routes>
    </Router>
  );
}

export default App;
