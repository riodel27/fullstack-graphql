const CryptoJS = require('crypto-js');
const mongoose = require('mongoose');

const { redisSecret } = require('../config');

const sessionize = (data) => {
  const sessionString = JSON.stringify(data);
  const encryptedSessionId = CryptoJS.AES.encrypt(`${sessionString}`, `${redisSecret}`).toString();
  return encryptedSessionId;
};

// eslint-disable-next-line max-len
const decryptSession = (session) => JSON.parse(CryptoJS.AES.decrypt(session, redisSecret).toString(CryptoJS.enc.Utf8));

const isValidMongoId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw Error('invalid id');
};

const formatMutationInput = (keys) => {
  const query = Object.keys(keys)
    .map((key) => ({
      ...((keys[key] || (keys[key] !== undefined && keys[key] !== null)) && {
        [key]: keys[key],
      }),
    }))
    .filter((data) => Object.keys(data).length >= 1);
  return Object.assign({}, ...query);
};

module.exports = {
  sessionize, decryptSession, isValidMongoId, formatMutationInput,
};
