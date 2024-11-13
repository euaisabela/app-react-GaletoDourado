import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RelatorioPagamentos = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [totalPagamentos, setTotalPagamentos] = useState(0);

  useEffect(() => {
    // Requisição para buscar os pagamentos e o total
    axios.get('http://localhost:5000/relatorio-pagamentos')
      .then((response) => {
        setPagamentos(response.data.pagamentos); // Lista de pagamentos
        setTotalPagamentos(response.data.totalPagamentos.toFixed(2)); // Total de pagamentos
      })
      .catch((error) => console.error('Erro ao obter pagamentos:', error));
  }, []);

  return (
    <div className="section">
      <h2>Relatório de Pagamentos</h2>
      <p><strong>Total de pagamentos recebidos:</strong> R$ {totalPagamentos}</p>
      <ul>
        {pagamentos.map((pagamento) => (
          <li key={pagamento._id}>
            Pagamento de {new Date(pagamento.dataPagamento).toLocaleDateString()} - Valor: R$ {pagamento.valor} - Status: {pagamento.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatorioPagamentos;
