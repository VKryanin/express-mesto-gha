const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { ERROR_NOT_FOUND } = require('../utils/status');
const { celebrate, Joi } = require('celebrate');
const urlCheking = require('../utils/regular')
const auth = require('../midlwares/auth');
const { createUser, login } = require('../controllers/users');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Error 404. Page not found' });
});

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(3).max(30),
    avatar: Joi.string().pattern(urlCheking),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

module.exports = router;
