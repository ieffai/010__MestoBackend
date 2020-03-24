const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();

const { PORT, JWT_SECRET, DB_LINK } = require('./config');
const { logger, errorMiddleware, auth } = require('./middlewares/middlewares');
const { usersRouter, cardsRouter, errorRouter } = require('./routes/routes');
const { login, createUser } = require('./controllers/users');

mongoose.connect(DB_LINK,  {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(JWT_SECRET));

app.post('/signin', login);
app.post('/signup', createUser);

// Routes
app.use(auth);
app.use(logger);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', errorRouter);
app.use(errorMiddleware);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
