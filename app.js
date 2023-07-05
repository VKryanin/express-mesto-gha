const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const errorListener = require('./midlwares/error');
const { errors } = require('celebrate');

const app = express();
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env; 

app.use(express.json());
app.use(cookieParser());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(router);
app.use(errors());
app.use(errorListener);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Слушаю порт 3000');
});
