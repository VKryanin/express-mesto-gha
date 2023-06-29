const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', addCardLike);
router.delete('/:cardId/likes', deleteCardLike);

module.exports = router;