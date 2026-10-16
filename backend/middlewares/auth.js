const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'development_secret' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).json({
      message: 'Se requiere autorización',
    });
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;

    return next();
  } catch (error) {
    return res.status(403).json({
      message: 'Token inválido o expirado',
    });
  }
};

module.exports = auth;
