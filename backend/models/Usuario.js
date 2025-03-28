const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fechaRegistro: { type: Date, default: Date.now },
    direcciones: [{
        calle: String,
        ciudad: String,
        estado: String,
        codigoPostal: String,
        pais: String
    }],
    pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }]
});

// Hash de contraseña antes de guardar
UsuarioSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);