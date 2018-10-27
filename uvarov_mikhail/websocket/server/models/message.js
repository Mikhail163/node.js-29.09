const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageShema = new Schema({
  username: { type: String },
  messageText: { type: String },
  timestamp: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Message', messageShema);