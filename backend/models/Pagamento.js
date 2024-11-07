const mongoose = require('mongoose');

const pagamentoSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  valor: Number,
  metodo: String, // Exemplo: "Dinheiro", "Cartão"
});

const Pagamento = mongoose.model('Pagamento', pagamentoSchema);

module.exports = Pagamento;