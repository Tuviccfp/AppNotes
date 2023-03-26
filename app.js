var express = require('express');
var path = require('path');
var logger = require('morgan');
require('./config/database');

var userRoute = require('./app/routes/users');
var notesRoute = require('./app/routes/notes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoute);
app.use('/notes', notesRoute);

module.exports = app;
