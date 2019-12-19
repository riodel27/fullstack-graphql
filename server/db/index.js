const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
dotenv.config();

const logger = require('../util/logger');


const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('successfully connected to the database');
    return;
  } catch (error) {
    logger.error('failed to connect to the database: ', error);
    process.exit(0);
  }
};

module.exports = {
  db,
};
