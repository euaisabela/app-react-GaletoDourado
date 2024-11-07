const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  total: Number,
  status: String, // Exemplo: "Pendente", "Pago"
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
<<<<<<< HEAD

import React from 'react';

function ListaDePedidos() {
    return (
        <div>
            <h2>Lista de Pedidos</h2>
            <ul>
                {pedidos.map((pedido, index) => (
                    <li key={pedido.id}>
                        <p>Pedido #{index + 1}</p>
                        <p>Data: {pedido.data}</p>
                        <p>Total: R$ {pedido.total.toFixed(2)}</p>
                        <p>Status: {pedido.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaDePedidos;
=======
>>>>>>> 3c8270c51e7d5949af545ec5a38a331ca7ea297c
