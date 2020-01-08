const express = require('express');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);

const client = redis.createClient();

const {
  redisSecret,
  redisHost,
  redisPort,
  redisTtl,
} = require('./config');
const config = require('./config/init');

const app = express();

/** middlewares */
app.use(config.cors);

app.use(session({
  secret: redisSecret,
  store: new redisStore({
    host: redisHost,
    port: redisPort,
    client,
    ttl: redisTtl,
  }),
  saveUninitialized: false,
  resave: false,
}));

module.exports = app;
