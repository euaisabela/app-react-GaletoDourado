// models/Pagamento.js
const mongoose = require('mongoose');

const pagamentoSchema = new mongoose.Schema({
  valor: Number,
  dataPagamento: { type: Date, default: Date.now },
  status: String, // Exemplo: "Aprovado", "Pendente"
});

const Pagamento = mongoose.model('Pagamento', pagamentoSchema);

module.exports = Pagamento;
