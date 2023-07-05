const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const errorListener = require('./utils/error');
const { errors } = require('celebrate');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(router);
app.use(errors());
app.use(errorListener);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Слушаю порт 3000');
});
