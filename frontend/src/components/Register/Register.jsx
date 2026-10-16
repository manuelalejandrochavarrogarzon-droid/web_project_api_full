import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onRegister(email, password);
  }

  return (
    <main className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Regístrate</h1>

        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="auth__input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth__button" type="submit">
            Registrarse
          </button>
        </form>

        <p className="auth__text">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/signin" className="auth__link">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
