const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '649da75c3d4621294cf03e36',
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log('Слушаю порт 3000');
});
