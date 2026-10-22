const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { login, createUser } = require("./controllers/users");

const auth = require("./middlewares/auth");

const { validateSignup, validateSignin } = require("./middlewares/validation");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conexión con MongoDB establecida");
  })
  .catch((error) => {
    console.error("Error al conectar con MongoDB:", error);
  });

const { PORT = 3000 } = process.env;

// Configuración de CORS.
// En Express 5, cors() ya gestiona las solicitudes OPTIONS.
app.use(cors());

// Interpretar solicitudes JSON.
app.use(express.json());

// Registrar todas las solicitudes HTTP.
app.use(requestLogger);

// Ruta temporal para comprobar el reinicio automático del servidor.
// Debe eliminarse cuando el proyecto haya sido revisado y aprobado.
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

// Rutas públicas.
app.post("/signup", validateSignup, createUser);
app.post("/signin", validateSignin, login);

// Proteger las demás rutas mediante JWT.
app.use(auth);

// Rutas protegidas.
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Registrar los errores.
app.use(errorLogger);

// Manejo de errores de validación de Celebrate.
app.use(errors());

// Recurso no encontrado.
app.use((req, res) => {
  res.status(404).json({
    message: "Recurso solicitado no encontrado",
  });
});

// Manejo centralizado de errores.
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: statusCode === 500 ? "Error interno del servidor" : error.message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
