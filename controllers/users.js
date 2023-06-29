const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res
      .status(500)
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
    res.status(201).send(user);
  } catch (err) {
    if (err.message === 'Not found') {
      res
        .status(404)
        .send({
          message: 'User not found',
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
          message: 'Internal server Error',
        });
    }
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(201)
      .send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res
        .status(400)
        .send({
          message: 'Data is incorrect',
        });
    } else {
      res
        .status(404)
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
        .status(404)
        .send({ message: 'User not found' });
    } else if (err.name === 'ValidationError') {
      res
        .status(400)
        .send({ message: 'Data is incorrect' });
    } else {
      res
        .status(500)
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
        .status(404)
        .send({ message: 'User not found' });
    } else if (err.name === 'ValidationError') {
      res
        .status(400)
        .send({ message: 'Data is incorrect' });
    } else {
      res
        .status(500)
        .send({ message: 'Internal Server Error' });
    }
  }
};

module.exports = { getUsers, getUserById, createUser, updateAvatar, updateProfile };