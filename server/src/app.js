const express = require('express');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);

const client = redis.createClient();

const config = require('./config/init');

const app = express();

/** middlewares */
app.use(config.cors);

app.use(session({
  secret: 'your_secret',
  store: new redisStore({
    host: 'localhost',
    port: 6379,
    client,
    ttl: 5,
  }),
  saveUninitialized: false,
  resave: false,
}));

module.exports = app;
