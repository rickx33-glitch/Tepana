
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        correo: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Cifrar contraseña antes de guardar
usuarioSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// Comparar contraseñas
usuarioSchema.methods.compararPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Usuario", usuarioSchema);
