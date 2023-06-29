const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res
      .status(500)
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
    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res
        .status(400)
        .send({
          message: 'Data is incorrect',
        });
    } else {
      res
        .status(500)
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
    res.status(201).send(card);
  } catch (err) {
    if (err.message === 'Not found') {
      res
        .status(404)
        .send({
          message: 'Card not found',
        });
    } else if (err.name === 'CastError') {
      res
        .status(400)
        .send({
          message: 'Data is incorrect',
        });
    } else {
      res
        .status(500)
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
    res.status(201).send(card);
  } catch (err) {
    if (err.message === 'Not found') {
      res
        .status(404)
        .send({
          message: 'Card not found',
        });
    } else if (err.name === 'CastError') {
      res
        .status(400)
        .send({
          message: 'Data is incorrect',
        });
    } else {
      res
        .status(500)
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
        .status(404)
        .send({
          message: 'Card not found',
        });
    } else if (err.name === 'CastError') {
      res
        .status(400)
        .send({
          message: 'Data is incorrect',
        });
    } else {
      res
        .status(500)
        .send({
          message: 'Internal server error',
        });
    }
  }
};

module.exports = { getCards, createCard, deleteCardById, addCardLike, deleteCardLike };