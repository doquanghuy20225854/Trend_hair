const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Service = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  duration: { type: String }, // Thời gian thực hiện (nếu muốn)
}, { timestamps: true });

module.exports = mongoose.model('Service', Service); 