const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

const {
  STATUS_OK,
  STATUS_CREATED,
  ERROR_INCORRECT_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../utils/status');

const {
  IncorrectRequestError,
  UnauthorizedError,
  DeletionError,
  NotFoundError,
  EmailIsBusyError
} = require('../utils/errors')

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
        .status(ERROR_INCORRECT_REQUEST)
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

const createUser = async (req, res, next) => {
  const { name, email, password, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    const hashPassword = await bcrypts.hash(String(password), 10)
    res.status(STATUS_CREATED)
      .send(user);
  } catch (err) {
    if (err instanceof IncorrectRequestError) {
      next(new IncorrectRequestError('Data is incorrect'));
    } else if (err.code === 11000) {
      next(new EmailIsBusyError('User with this email already exists'));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .select('+password');
    if (user) {
      const isValidUser = await bcrypt.compare(String(password), user.password);
      if (isValidUser) {
        const jwt = jsonWebToken.sign({
          _id: user._id,
        }, process.env['JWT_HASH']);
        res.cookie('jwt', jwt, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
          secure: true,
        });
        res.status(STATUS_OK).send({ data: user.toJSON() });
      } else {
        throw new UnauthorizedError('Incorrect password or email');
      }
    }
    throw new UnauthorizedError('Incorrect password or email');
  } catch (err) {
    if (err instanceof IncorrectRequestError) {
      next(new IncorrectRequestError('Data is incorrect'));
    } else {
      next(err);
    }
  }
};

const getInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(STATUS_OK).send({ data: user });
    }
    throw new NotFoundError('User not found');
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.updateOne(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (user) {
      res.status(STATUS_OK).send(user);
    }
    throw new NotFoundError('User not found');
  } catch (err) {
    if (err instanceof IncorrectRequestError) {
      next(new IncorrectRequestError('Data is incorrect'));
    } else {
      next(err);
    }
  }
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (user) {
      res.status(STATUS_OK).send(user);
    }
    throw new NotFoundError('User not found');
  } catch (err) {
    if (err instanceof IncorrectRequestError) {
      next(new IncorrectRequestError('Data is incorrect'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateProfile,
  login,
  getInfo
};
