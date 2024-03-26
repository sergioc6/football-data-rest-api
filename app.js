require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs')

const indexRouter = require('./src/routes/_index.routes');
app.use('/', indexRouter);

module.exports = app;