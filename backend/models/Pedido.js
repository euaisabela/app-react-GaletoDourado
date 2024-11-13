// models/Pedido.js
const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  total: Number,
  status: String, // Exemplo: "Pendente", "Pago"
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
