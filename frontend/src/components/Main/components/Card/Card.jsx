import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;

  const { currentUser } = useContext(CurrentUserContext);

  const { name, link, likes = [], owner = {} } = card;

  // Verificamos que exista el propietario
  const isOwn =
    owner?._id && currentUser?._id ? owner._id === currentUser._id : false;

  // Verificamos si el usuario actual dio like
  const isLiked =
    Array.isArray(likes) && currentUser?._id
      ? likes.some((user) => user?._id === currentUser._id)
      : false;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />

      {isOwn && (
        <button
          className="card__delete-button"
          type="button"
          onClick={handleDeleteClick}
          aria-label="Eliminar tarjeta"
        />
      )}

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          type="button"
          className={`card__like-button ${
            isLiked ? "card__like-button_is-active" : ""
          }`}
          onClick={handleLikeClick}
          aria-label="Me gusta"
        />
      </div>
    </li>
  );
}
