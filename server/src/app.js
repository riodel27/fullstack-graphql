const express = require('express');

const config = require('./config/init');

const app = express();

/** middlewares */
app.use(config.cors);

module.exports = app;
