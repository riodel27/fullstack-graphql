const mongoose = require('mongoose');

const { mongoUrl } = require('./index');
const logger = require('../util/logger');

module.exports = {
  initializeDB: async () => {
    try {
      await mongoose.connect(mongoUrl, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
      logger.error('failed to connect to the database: ', error);
      process.exit(0);
    }
  },
  cors: async (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    );
    if (req.method === 'OPTIONS') {
      return res.status(200).json({});
    }
    return next();
  },
};
