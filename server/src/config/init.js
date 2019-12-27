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
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    return next();
  },
};
