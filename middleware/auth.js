const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Obtener el token del encabezado 'Authorization'
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // El token va después de "Bearer "

  if (token == null) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user; // Guarda la información del usuario en la solicitud
    next(); // Continúa con la siguiente función de la ruta
  });
}

module.exports = authenticateToken;