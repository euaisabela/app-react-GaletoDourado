import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import data from "./moc.json"

export default function Dashboard() {
  const [pedidos, setPedidos] = useState(data);
  const [pagamentos, setPagamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtendo os relatórios de pedidos e pagamentos
    axios.get('http://localhost:5000/relatorio-pedidos')
      .then((response) => setPedidos(response.data))
      .catch((error) => console.error('Erro ao obter pedidos:', error));

    axios.get('http://localhost:5000/relatorio-pagamentos')
      .then((response) => setPagamentos(response.data))
      .catch((error) => console.error('Erro ao obter pagamentos:', error));
  }, []);

  const handleLogout = () => {
    // Redireciona para a página de login
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Sair
      </Button>

      <h2>Relatório de Pedidos</h2>
      <ul>
        {pedidos.map((pedido , index) => (
          <li key={pedido._id}>{index} Pedido de {pedido.data} - Total: {pedido.total} - Status: {pedido.status}</li>
        ))}
      </ul>

      <h2>Relatório de Pagamentos</h2>
      <ul>
        {pagamentos.map((pagamento) => (
          <li key={pagamento._id}>Pagamento de {pagamento.data} - Valor: {pagamento.valor} - Método: {pagamento.metodo}</li>
        ))}
      </ul>
    </div>
  );
}
