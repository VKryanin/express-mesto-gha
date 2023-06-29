const User = require('../models/user');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER } = require('../utils/errors');
const { STATUS_OK, STATUS_CREATED } = require('../utils/status');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(STATUS_OK).send(users);
  } catch (err) {
    res
      .status(ERROR_INTERNAL_SERVER)
      .send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .orFail(() => new Error('Not found'));
    res.status(STATUS_CREATED).send(user);
  } catch (err) {
    if (err.message === 'Not found') {
      res
        .status(ERROR_NOT_FOUND)
        .send({
          message: 'User not found',
        });
    } else if (err.name === 'CastError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({
          message: 'Data is incorrect',
        });
    } else {
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({
          message: 'Internal server Error',
        });
    }
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(STATUS_CREATED)
      .send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({
          message: 'Data is incorrect',
        });
    } else {
      res
        .status(ERROR_NOT_FOUND)
        .send({
          message: 'Internal Server Error',
        });
    }
  }
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(() => new Error('Not found'));
    res.send(user);
  } catch (err) {
    if (err.message === 'Not found') {
      res
        .status(ERROR_NOT_FOUND)
        .send({ message: 'User not found' });
    } else if (err.name === 'ValidationError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({ message: 'Data is incorrect' });
    } else {
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Internal Server Error' });
    }
  }
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(() => new Error('Not found'));
    res.send(user);
  } catch (err) {
    if (err.message === 'Not found') {
      res
        .status(ERROR_NOT_FOUND)
        .send({ message: 'User not found' });
    } else if (err.name === 'ValidationError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({ message: 'Data is incorrect' });
    } else {
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'Internal Server Error' });
    }
  }
};

module.exports = { getUsers, getUserById, createUser, updateAvatar, updateProfile };