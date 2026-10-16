import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import Login from "./Login/Login";
import Register from "./Register/Register";

import api from "../utils/api";
import { authorize, register, checkToken } from "../utils/auth";

import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("jwt"));
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // REGISTRO
  function handleRegister(email, password) {
    register(email, password)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.error("ERROR AL REGISTRAR:", error);
      });
  }

  // INICIO DE SESIÓN
  function handleLogin(email, password) {
    setLoading(true);

    authorize(email, password)
      .then((data) => {
        if (!data.token) {
          throw new Error("El servidor no devolvió un token");
        }

        localStorage.setItem("jwt", data.token);
        api.setToken(data.token);
        setToken(data.token);

        return checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);

        return api.getInitialCards();
      })
      .then((cardsData) => {
        setCards(cardsData);
        navigate("/");
      })
      .catch((error) => {
        console.error("ERROR AL INICIAR SESIÓN:", error);

        localStorage.removeItem("jwt");
        api.setToken(null);
        setToken(null);
        setCurrentUser(null);
        setCards([]);
        setLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // RECUPERAR SESIÓN AL ABRIR LA APLICACIÓN
  useEffect(() => {
    const savedToken = localStorage.getItem("jwt");

    if (!savedToken) {
      setLoading(false);
      return;
    }

    api.setToken(savedToken);
    setToken(savedToken);

    checkToken(savedToken)
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);

        return api.getInitialCards();
      })
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.error("ERROR AL RECUPERAR SESIÓN:", error);

        localStorage.removeItem("jwt");
        api.setToken(null);
        setToken(null);
        setCurrentUser(null);
        setCards([]);
        setLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // EDITAR PERFIL
  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error("ERROR AL ACTUALIZAR USUARIO:", error);
      });
  }

  // CAMBIAR AVATAR
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error("ERROR AL ACTUALIZAR AVATAR:", error);
      });
  }

  // DAR O QUITAR LIKE
  function handleCardLike(card) {
    if (!currentUser) {
      return;
    }

    const isLiked =
      Array.isArray(card.likes) &&
      card.likes.some((user) => {
        const userId = typeof user === "string" ? user : user._id;

        return userId === currentUser._id;
      });

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => {
        console.error("ERROR AL CAMBIAR LIKE:", error);
      });
  }

  // ELIMINAR TARJETA
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => {
        console.error("ERROR AL ELIMINAR TARJETA:", error);
      });
  }

  // AGREGAR TARJETA
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
      })
      .catch((error) => {
        console.error("ERROR AL AGREGAR TARJETA:", error);
      });
  }

  // PANTALLA DE CARGA
  if (loading) {
    return (
      <div className="page__content">
        <p>Cargando...</p>
      </div>
    );
  }

  // APLICACIÓN
  return (
    <Routes>
      {/* INICIO DE SESIÓN */}
      <Route
        path="/signin"
        element={
          loggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* REGISTRO */}
      <Route
        path="/signup"
        element={
          loggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Register onRegister={handleRegister} />
          )
        }
      />

      {/* PÁGINA PRINCIPAL */}
      <Route
        path="/"
        element={
          loggedIn && currentUser && token ? (
            <CurrentUserContext.Provider
              value={{
                currentUser,
                handleUpdateUser,
                handleUpdateAvatar,
              }}
            >
              <div className="page__content">
                <Header />

                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                />

                <Footer />
              </div>
            </CurrentUserContext.Provider>
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />

      {/* CUALQUIER OTRA RUTA */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
