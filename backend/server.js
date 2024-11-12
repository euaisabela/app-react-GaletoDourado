const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Pedido = require('./models/Pedido');
const Pagamento = require('./models/Pagamento');
const Usuario = require('./models/Usuario'); // Modelo de Usuário

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB usando a string de conexão do Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 20000
})
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB: ", err);
  });

// Rota para obter os pedidos
app.get('/relatorio-pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).send('Erro ao obter pedidos');
  }
});

// Rota para obter os pagamentos
app.get('/relatorio-pagamentos', async (req, res) => {
  try {
    const pagamentos = await Pagamento.find();
    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(500).send('Erro ao obter pagamentos');
  }
});

// Rota de cadastro de usuário
app.post('/cadastrar-usuario', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      console.log(`Email já cadastrado: ${email}`);
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    
    const novoUsuario = new Usuario({ name, email, password });
    await novoUsuario.save();

    
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário. Tente novamente.' });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
