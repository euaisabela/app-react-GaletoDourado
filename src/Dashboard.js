import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 
import jsPDF from 'jspdf';
import Chart from 'react-apexcharts';

export default function Dashboard() {
  const [pedidos, setPedidos] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home'); 

  const [graficoData, setGraficoData] = useState({
    series: [{
      name: 'Pedidos',
      data: []
    }],
    options: {
      chart: {
        type: 'line', 
        height: 350
      },
      xaxis: {
        categories: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
      }
    }
  });

  useEffect(() => {
    axios.get('http://localhost:5000/relatorio-pedidos')
      .then((response) => {
        setPedidos(response.data);

        const pedidosPorDia = [0, 0, 0, 0, 0, 0, 0];
        response.data.forEach((pedido) => {
          const diaSemana = new Date(pedido.data).getDay();
          pedidosPorDia[diaSemana]++;
        });

        setGraficoData(prevState => ({
          ...prevState,
          series: [{
            name: 'Pedidos',
            data: pedidosPorDia
          }]
        }));
      })
      .catch((error) => console.error('Erro ao obter pedidos:', error));

    axios.get('http://localhost:5000/relatorio-pagamentos')
      .then((response) => setPagamentos(response.data))
      .catch((error) => console.error('Erro ao obter pagamentos:', error));
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Vendas", 10, 10);
    
    pedidos.forEach((pedido, index) => {
      const dataFormatada = new Date(pedido.data).toLocaleDateString(); 
      doc.text(`${index + 1}. Pedido: ${dataFormatada} - Total: R$${pedido.total.toFixed(2)} - Status: ${pedido.status}`, 10, 20 + index * 10);
    });
  
    doc.text("Pagamentos:", 10, 40 + pedidos.length * 10);
    pagamentos.forEach((pagamento, index) => {
      const dataFormatada = new Date(pagamento.data).toLocaleDateString(); 
      doc.text(`${index + 1}. Pagamento: ${dataFormatada} - Valor: R$${pagamento.valor.toFixed(2)} - Método: ${pagamento.metodo}`, 10, 50 + (pedidos.length + index) * 10);
    });
  
    doc.save('relatorio.pdf');
  };

  const enviarRelatorioWhatsApp = () => {
    const mensagem = `
      *Relatório de Pedidos e Pagamentos do Restaurante*

      Pedidos:
      ${pedidos.map((pedido, index) => {
        const dataFormatada = new Date(pedido.data).toLocaleDateString();
        return `${index + 1}. Pedido: ${dataFormatada} - Total: R$${pedido.total.toFixed(2)} - Status: ${pedido.status}`;
      }).join("\n")}

      Pagamentos:
      ${pagamentos.map((pagamento, index) => {
        const dataFormatada = new Date(pagamento.data).toLocaleDateString();
        return `${index + 1}. Pagamento: ${dataFormatada} - Valor: R$${pagamento.valor.toFixed(2)} - Método: ${pagamento.metodo}`;
      }).join("\n")}
    `;

    const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;

    // Abrir o WhatsApp com a mensagem
    window.open(url, "_blank");
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Painel</h2>
        <a href="#home" className="nav-link" onClick={() => setActiveSection('home')}>🏠 Home</a>
        <a href="#pedidos" className="nav-link" onClick={() => setActiveSection('pedidos')}>🛒 Pedidos</a>
        <a href="#relatorios" className="nav-link" onClick={() => setActiveSection('relatorios')}>📊 Relatórios</a>
      </div>

      <div className="content">
        <h1>Bem-vindo ao Painel do Restaurante</h1>

        <div className={`section ${activeSection === 'home' ? 'active' : ''}`}>
          <h2>Home</h2>
          <p>Resumo geral das operações do restaurante.</p>
          <div className="home-summary">
            <h3>Resumo de Vendas</h3>
            <p>Total de pedidos realizados: {pedidos.length}</p>
            <p>Total de pagamentos recebidos: R$ {pagamentos.reduce((acc, pagamento) => acc + pagamento.valor, 0).toFixed(2)}</p>
          </div>

          <div className="home-graph">
            <h3>Pedidos por Dia da Semana</h3>
            <Chart
              options={{
                chart: { type: 'pie', height: 350 },
                labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
                responsive: [{
                  breakpoint: 480,
                  options: { chart: { width: 200 }, legend: { position: 'bottom' } }
                }],
              }}
              series={graficoData.series[0].data}
              type="pie"
              height={350}
            />
          </div>
        </div>

        <div className={`section ${activeSection === 'pedidos' ? 'active' : ''}`}>
          <h2>Relatório de Pedidos</h2>
          <TableContainer component={Paper}>
            <Table aria-label="Relatório de Pedidos">
              <TableHead>
                <TableRow>
                  <TableCell>Pedido</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pedidos.map((pedido, index) => (
                  <TableRow key={pedido._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{new Date(pedido.data).toLocaleDateString()}</TableCell>
                    <TableCell>{pedido.total.toFixed(2)}</TableCell>
                    <TableCell>{pedido.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className={`section ${activeSection === 'relatorios' ? 'active' : ''}`}>
          <h2>Relatórios</h2>
          <p>Relatórios de vendas e outros dados importantes.</p>

          <Button
            variant="contained"
            style={{
              backgroundColor: '#f33a0c',
              color: '#fff',
              margin: '10px auto',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '8px',
              display: 'block',
              textAlign: 'center',
              transition: 'background-color 0.3s',
            }}
            onClick={gerarPDF}
          >
            Gerar PDF
          </Button>

          <div className="grafico">
            <h3>Pedidos por Dia da Semana</h3>
            <Chart
              options={graficoData.options}
              series={graficoData.series}
              type="line"
              height={350}
            />
          </div>

          <div className="legenda">
            <h3>Legenda:</h3>
            <ul>
              <li><span className="legenda-item" style={{ backgroundColor: '#90caf9' }}></span> Investimento</li>
              <li><span className="legenda-item" style={{ backgroundColor: '#1e88e5' }}></span> Perda</li>
              <li><span className="legenda-item" style={{ backgroundColor: '#673ab7' }}></span> Lucro</li>
            </ul>
          </div>
        </div>

        <Button
          variant="contained"
          style={{
            color: '#fff',
            backgroundColor: '#f33a0c',
            textAlign: 'center',
          }}
          onClick={handleLogout}
        >
          Sair
        </Button>

        {/* Botão de enviar relatório para WhatsApp */}
        <Button
          variant="contained"
          style={{
            color: '#fff',
            backgroundColor: '#25d366',
            marginTop: '20px',
            textAlign: 'center',
          }}
          onClick={enviarRelatorioWhatsApp}
        >
          Enviar Relatório no WhatsApp
        </Button>
      </div>
    </div>
  );
}