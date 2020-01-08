const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  logLevel: process.env.LOG_LEVEL,
  nodeEnv: process.env.NODE_ENV,
  redisSecret: process.env.REDIS_SECRET,
  redisHost: process.env.REDIS_HOST,
  redisPort: JSON.parse(process.env.REDIS_PORT),
  redisTtl: JSON.parse(process.env.REDIS_TTL),
};
