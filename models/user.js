const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 30,
    },
    secondName: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 30,
    },
  },
);

module.exports = mongoose.model('user', userSchema);