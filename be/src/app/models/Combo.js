const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const ComBo = new Schema({
  name: { type: String},
  img: {type: String},
},{
    collection: 'combo_quy_ong' // ✅ RẤT QUAN TRỌNG
});

module.exports = mongoose.model('ComBo', ComBo);