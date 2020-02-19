const express = require('express');
const path = require('path');
const app = express();

const error = require('./routes/error');
const users = require('./routes/users');
const cards = require('./routes/cards');

//Set static
app.use(express.static(path.join(__dirname, 'public')));



//users routes
app.use('/users', users);


//cards routes
app.use('/cards', cards);


//error routes
app.use(error);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));