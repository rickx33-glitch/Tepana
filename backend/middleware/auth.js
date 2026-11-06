
const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    const autorizacion = req.headers.authorization;

    if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
        return res.status(401).json({
            mensaje: "Acceso no autorizado. Token requerido."
        });
    }

    const token = autorizacion.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuarioId = decoded.id;

        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: "Token invalido o expirado"
        });
    }
}

module.exports = verificarToken;
