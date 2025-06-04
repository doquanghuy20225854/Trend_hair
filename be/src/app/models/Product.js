const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Product = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: String, required: true },
  slug: {type: String},
  brand:{type: String},
  origin:{type: String},
}, { timestamps: true });

module.exports = mongoose.model('Product', Product);