// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import data from "./moc.json";
import './Dashboard.css'; // Arquivo de estilo separado

export default function Dashboard() {
  const [pedidos, setPedidos] = useState(data);
  const [pagamentos, setPagamentos] = useState([]);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home'); // Seção ativa

  useEffect(() => {
    axios.get('http://localhost:5000/relatorio-pedidos')
      .then((response) => setPedidos(response.data))
      .catch((error) => console.error('Erro ao obter pedidos:', error));

    axios.get('http://localhost:5000/relatorio-pagamentos')
      .then((response) => setPagamentos(response.data))
      .catch((error) => console.error('Erro ao obter pagamentos:', error));
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Painel</h2>
        <a href="#home" className="nav-link" onClick={() => setActiveSection('home')}>🏠 Home</a>
        <a href="#pedidos" className="nav-link" onClick={() => setActiveSection('pedidos')}>🛒 Pedidos</a>
        <a href="#pagamentos" className="nav-link" onClick={() => setActiveSection('pagamentos')}>💳 Pagamentos</a>
        <a href="#relatorios" className="nav-link" onClick={() => setActiveSection('relatorios')}>📊 Relatórios</a>
        <a href="#configuracoes" className="nav-link" onClick={() => setActiveSection('configuracoes')}>⚙️ Configurações</a>
      </div>

      <div className="content">
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Sair
        </Button>
        <h1>Bem-vindo ao Painel do Restaurante</h1>
        
        <div className={`section ${activeSection === 'home' ? 'active' : ''}`}>
          <h2>Home</h2>
          <p>Resumo geral das operações do restaurante.</p>
        </div>

        <div className={`section ${activeSection === 'pedidos' ? 'active' : ''}`}>
          <h2>Relatório de Pedidos</h2>
          <ul>
            {pedidos.map((pedido , index) => (
              <li key={pedido._id}>{index} Pedido de {pedido.data} - Total: {pedido.total} - Status: {pedido.status}</li>
            ))}
          </ul>
        </div>

        <div className={`section ${activeSection === 'pagamentos' ? 'active' : ''}`}>
          <h2>Relatório de Pagamentos</h2>
          <ul>
            {pagamentos.map((pagamento) => (
              <li key={pagamento._id}>Pagamento de {pagamento.data} - Valor: {pagamento.valor} - Método: {pagamento.metodo}</li>
            ))}
          </ul>
        </div>

        <div className={`section ${activeSection === 'relatorios' ? 'active' : ''}`}>
          <h2>Relatórios</h2>
          <p>Relatórios de vendas e outros dados importantes.</p>
        </div>

        <div className={`section ${activeSection === 'configuracoes' ? 'active' : ''}`}>
          <h2>Configurações</h2>
          <p>Configurações do sistema.</p>
        </div>
      </div>
    </div>
  );
}
