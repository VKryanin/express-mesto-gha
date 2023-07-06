const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateProfile,
  getInfo
} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

router.get('/', getUsers);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.get('/me', getInfo);

router.post('/', createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(3).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlPattern),
  }),
}), updateAvatar);

module.exports = router;
