const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
//const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const routes = require('./routes/api');
const mongoose = require('mongoose');
const port = 8000;
const passport = require('./passport')
require('dotenv').config();



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieSession({
    name: 'session_maintance',
    keys: ['key1', 'key2'],
    secure: false,
    sameSite: false, // this may need to be false is you are accessing from another React app
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000
}
))
app.use(bodyParser.json());
app.use(passport.initialize());
//app.use(passport.session());
mongoose.connect('mongodb://localhost:27017/reactAuth', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to database ');
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});
app.use('/api', routes);


app.listen(port, () => {
    console.log(`App is working on ${port} `)
});