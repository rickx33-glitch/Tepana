
const express = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/Usuario");

const router = express.Router();

// REGISTRO
router.post("/registro", async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                mensaje: "La contraseña debe tener al menos 8 caracteres"
            });
        }

        const correoNormalizado = correo.trim().toLowerCase();

        const existe = await Usuario.findOne({
            correo: correoNormalizado
        });

        if (existe) {
            return res.status(409).json({
                mensaje: "El correo ya esta registrado"
            });
        }

        const usuario = await Usuario.create({
            nombre,
            correo: correoNormalizado,
            password
        });

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al registrar usuario"
        });
    }
});

// INICIO DE SESION
router.post("/login", async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({
                mensaje: "Correo y contraseña son obligatorios"
            });
        }

        const usuario = await Usuario.findOne({
            correo: correo.trim().toLowerCase()
        });

        if (!usuario || !(await usuario.compararPassword(password))) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            mensaje: "Inicio de sesion correcto",
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al iniciar sesion"
        });
    }
});

module.exports = router;
