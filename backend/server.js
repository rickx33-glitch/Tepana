
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const tareasRoutes = require("./routes/tareas");
const authRoutes = require("./routes/auth");

const app = express();

// Middlewares generales
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        proyecto: "Tepana",
        mensaje: "API funcionando correctamente"
    });
});

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/tareas", tareasRoutes);

// Configuracion del servidor
const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("MongoDB conectado correctamente");

        app.listen(PORT, () => {
            console.log(`Tepana activa en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error de conexion:", error.message);
    }
}

iniciarServidor();
