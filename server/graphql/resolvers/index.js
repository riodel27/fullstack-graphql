const administratorResolvers = require('./administrator');

module.exports = {
  Query: {
    ...administratorResolvers.Query,
  },
}
;