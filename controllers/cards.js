const Card = require('../models/card');
const {
  STATUS_OK, STATUS_CREATED, ERROR_INCORRECT_REQUEST, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER,
} = require('../utils/status');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(STATUS_OK).send(cards);
  } catch (err) {
    res
      .status(ERROR_INTERNAL_SERVER)
      .send({
        message: 'Internal server error',
      });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.status(STATUS_CREATED).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res
        .status(ERROR_INCORRECT_REQUEST)
        .send({
          message: 'Data is incorrect',
        });
    } else {
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({
          message: 'Internal Server Error',
        });
    }
  }
};

const deleteCardById = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId)
      .orFail(() => new Error('Not found'));
    res.status(STATUS_CREATED).send(card);
  } catch (err) {
    if (err.message === 'Not found') {
      res
        .status(ERROR_NOT_FOUND)
        .send({
          message: 'Card not found',
        });
    } else if (err.name === 'CastError') {
      res
        .status(ERROR_INCORRECT_REQUEST)
        .send({
          message: 'Data is incorrect',
        });
    } else {
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({
          message: 'Internal Server Error',
        });
    }
  }
};

const addCardLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(new Error('Not found'));
    res.status(STATUS_CREATED).send(card);
  } catch (err) {
    if (err.message === 'Not found') {
      res
        .status(ERROR_NOT_FOUND)
        .send({
          message: 'Card not found',
        });
    } else if (err.name === 'CastError') {
      res
        .status(ERROR_INCORRECT_REQUEST)
        .send({
          message: 'Data is incorrect',
        });
    } else {
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({
          message: 'Internal Server Error',
        });
    }
  }
};

const deleteCardLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
      .orFail(new Error('Not found'));
    res.status(201).send(card);
  } catch (err) {
    if (err.message === 'Not found') {
      res
        .status(ERROR_NOT_FOUND)
        .send({
          message: 'Card not found',
        });
    } else if (err.name === 'CastError') {
      res
        .status(ERROR_INCORRECT_REQUEST)
        .send({
          message: 'Data is incorrect',
        });
    } else {
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({
          message: 'Internal server error',
        });
    }
  }
};

module.exports = {
  getCards, createCard, deleteCardById, addCardLike, deleteCardLike,
};
