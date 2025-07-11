const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  adminReply: {
    type: String,
    default: ''
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema); 