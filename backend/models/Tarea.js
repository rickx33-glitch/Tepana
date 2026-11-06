const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre de la tarea es obligatorio"],
            trim: true
        },

        completada: {
            type: Boolean,
            default: false
        },

        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Tarea", tareaSchema);