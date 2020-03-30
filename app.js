const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const { errors } = require('celebrate');
const {
  errorLogger, requestLogger, errorMiddleware, auth,
} = require('./middlewares/middlewares');
const { usersRouter, cardsRouter, errorRouter } = require('./routes/routes');
const { login, createUser } = require('./controllers/users');
const { signIn, signUp } = require('./modules/celebrateValidators');
const { PORT, DB_LINK } = require('./config');

mongoose.connect(DB_LINK, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', signIn, login);
app.post('/signup', signUp, createUser);

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);
app.use(errors());
app.use('/', errorRouter);
app.use(errorMiddleware);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
