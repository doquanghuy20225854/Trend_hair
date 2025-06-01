const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const DatLich = new Schema({
  tenDichVu: { type: String, required: true },
  thoiGianHen: { type: String, required: true },
  thoCat: { type: String, required: true },
  ghiChu: { type: String }, // tuỳ chọn
}, { timestamps: true });

module.exports = mongoose.model('DatLich', DatLich);