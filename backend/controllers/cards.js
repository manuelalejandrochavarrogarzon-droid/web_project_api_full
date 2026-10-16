const Card = require('../models/card');

// Obtener todas las tarjetas
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// Crear una tarjeta
const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

// Eliminar una tarjeta: solamente su propietario puede hacerlo
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        const error = new Error('No tienes permiso para eliminar esta tarjeta');

        error.statusCode = 403;
        throw error;
      }

      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then((card) => res.send(card))
    .catch(next);
};

// Dar like a una tarjeta
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch(next);
};

// Quitar like a una tarjeta
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
