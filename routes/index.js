const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { ERROR_NOT_FOUND } = require('../utils/status');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Eror 404. Page not found' });
});

module.exports = router;
