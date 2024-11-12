const mongoose = require('mongoose');

// Definindo o modelo de Usuário
const UsuarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
