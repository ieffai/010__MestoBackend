const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const { logger, errorMiddleware, owner } = require('./middlewares/middlewares');
const { usersRouter, cardsRouter, errorRouter } = require('./routes/routes');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(owner);

// Routes
app.use(logger);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', errorRouter);
app.use(errorMiddleware);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
