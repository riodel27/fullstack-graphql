const { model, Schema } = require('mongoose');

const administratorSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
}, {
  versionKey: false,
});

module.exports = model('administrator', administratorSchema, 'administrator');
