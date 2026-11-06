const express = require("express");
const router = express.Router();

const Tarea = require("../models/Tarea");
const verificarToken = require("../middleware/auth");

router.use(verificarToken);

// GET: consultar solamente las tareas del usuario
router.get("/", async (req, res) => {
    try {
        const tareas = await Tarea.find({
            usuario: req.usuarioId
        }).sort({ createdAt: -1 });

        res.json(tareas);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al consultar tareas"
        });
    }
});

// POST: crear tarea asociada al usuario
router.post("/", async (req, res) => {
    try {
        const { nombre } = req.body;

        if (typeof nombre !== "string" || !nombre.trim()) {
            return res.status(400).json({
                mensaje: "El nombre de la tarea es obligatorio"
            });
        }

        const nuevaTarea = await Tarea.create({
            nombre: nombre.trim(),
            usuario: req.usuarioId
        });

        res.status(201).json(nuevaTarea);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear tarea"
        });
    }
});

// PUT: actualizar una tarea propia
router.put("/:id", async (req, res) => {
    try {
        const camposPermitidos = ["nombre", "completada"];
        const camposRecibidos = Object.keys(req.body);

        if (
            camposRecibidos.length === 0 ||
            camposRecibidos.some(campo => !camposPermitidos.includes(campo))
        ) {
            return res.status(400).json({
                mensaje: "Datos de actualizacion no validos"
            });
        }

        const cambios = {};

        if (req.body.nombre !== undefined) {
            if (
                typeof req.body.nombre !== "string" ||
                !req.body.nombre.trim()
            ) {
                return res.status(400).json({
                    mensaje: "El nombre no es valido"
                });
            }

            cambios.nombre = req.body.nombre.trim();
        }

        if (req.body.completada !== undefined) {
            if (typeof req.body.completada !== "boolean") {
                return res.status(400).json({
                    mensaje: "El estado de la tarea no es valido"
                });
            }

            cambios.completada = req.body.completada;
        }

        const tareaActualizada = await Tarea.findOneAndUpdate(
            {
                _id: req.params.id,
                usuario: req.usuarioId
            },
            cambios,
            {
                new: true,
                runValidators: true
            }
        );

        if (!tareaActualizada) {
            return res.status(404).json({
                mensaje: "Tarea no encontrada"
            });
        }

        res.json(tareaActualizada);

    } catch (error) {
        res.status(400).json({
            mensaje: "No se pudo actualizar la tarea"
        });
    }
});

// DELETE: eliminar solamente una tarea propia
router.delete("/:id", async (req, res) => {
    try {
        const tareaEliminada = await Tarea.findOneAndDelete({
            _id: req.params.id,
            usuario: req.usuarioId
        });

        if (!tareaEliminada) {
            return res.status(404).json({
                mensaje: "Tarea no encontrada"
            });
        }

        res.json({
            mensaje: "Tarea eliminada correctamente"
        });

    } catch (error) {
        res.status(400).json({
            mensaje: "No se pudo eliminar la tarea"
        });
    }
});

module.exports = router;