const mongoose = require('mongoose');

const pagamentoSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  valor: Number,
  metodo: String, // Exemplo: "Dinheiro", "Cartão"
});

const Pagamento = mongoose.model('Pagamento', pagamentoSchema);

<<<<<<< HEAD
module.exports = Pagamento;
=======
module.exports = Pagamento;
>>>>>>> 3c8270c51e7d5949af545ec5a38a331ca7ea297c
