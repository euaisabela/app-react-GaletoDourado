const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Pedido = require('./models/Pedido');
const Pagamento = require('./models/Pagamento');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB (certifique-se de ter a URL correta)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/relatorio-pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).send('Erro ao obter pedidos');
  }
});

app.get('/relatorio-pagamentos', async (req, res) => {
  try {
    const pagamentos = await Pagamento.find();
    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(500).send('Erro ao obter pagamentos');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
