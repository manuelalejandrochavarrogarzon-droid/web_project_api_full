const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

const {
  validateProfile,
  validateAvatar,
  validateUserId,
} = require('../middlewares/validation');

router.get('/', auth, getUsers);

router.get('/me', auth, getUser);

router.patch('/me', auth, validateProfile, updateProfile);

router.patch('/me/avatar', auth, validateAvatar, updateAvatar);

router.get('/:userId', auth, validateUserId, getUserById);

module.exports = router;
