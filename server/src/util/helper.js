
const CryptoJS = require('crypto-js');

const { redisSecret } = require('../config');

module.exports.sessionize = (data) => {
  const sessionString = JSON.stringify(data);
  const encryptedSessionId = CryptoJS.AES.encrypt(`${sessionString}`, `${redisSecret}`).toString();
  return encryptedSessionId;
};

// eslint-disable-next-line max-len
module.exports.decryptSession = (session) => JSON.parse(CryptoJS.AES.decrypt(session, redisSecret).toString(CryptoJS.enc.Utf8));
