// models/Pedido.js
const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  total: Number,
  status: String, // Exemplo: "Pendente", "Pago"
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;

// Rota para obter os pedidos
//app.get('/api/pedidos', async (req, res) => {
  //try {
    ///const pedidos = await db.collection('pedidos').find().toArray();
    ///res.json(pedidos);
  ///} catch (error) {
    ///console.error('Erro ao obter pedidos:', error);
    //res.status(500).json({ message: 'Erro ao obter pedidos' });
 /// }
////});
