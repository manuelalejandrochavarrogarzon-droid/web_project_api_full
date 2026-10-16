const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');

const { validateSignup, validateSignin } = require('./middlewares/validation');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000 } = process.env;

app.use(express.json());

// Registrar todas las solicitudes HTTP.
app.use(requestLogger);

// Rutas públicas con validación.
app.post('/signup', validateSignup, createUser);
app.post('/signin', validateSignin, login);

// Proteger las demás rutas mediante JWT.
app.use(auth);

// Rutas protegidas.
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Registrar los errores antes de que los gestione el middleware central.
app.use(errorLogger);

// Manejo de errores de validación de Celebrate.
app.use(errors());

// Recurso no encontrado.
app.use((req, res) => {
  res.status(404).json({
    message: 'Recurso solicitado no encontrado',
  });
});

// Manejo centralizado de errores.
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: statusCode === 500 ? 'Error interno del servidor' : error.message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
