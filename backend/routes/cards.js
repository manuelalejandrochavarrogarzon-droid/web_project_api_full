const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const auth = require('../middlewares/auth');

const { validateCard, validateCardId } = require('../middlewares/validation');

router.get('/', auth, getCards);

router.post('/', auth, validateCard, createCard);

router.delete('/:cardId', auth, validateCardId, deleteCard);

router.put('/:cardId/likes', auth, validateCardId, likeCard);

router.delete('/:cardId/likes', auth, validateCardId, dislikeCard);

module.exports = router;
