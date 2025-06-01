const DatLich = require('../models/DatLich');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');

class DatLichController {
  // GET /dat_lich/:id
  async show(req, res, next) {
    try {
      const datLich = await DatLich.findById(req.params.id);
      res.render('dat_lich/show', { datLich: mongooseToObject(datLich) });
    } catch (err) {
      next(err);
    }
  }

  // GET /dat_lich/create
  create(req, res, next) {
    res.render('dat_lich/create');
  }

  // POST /dat_lich/store
  async store(req, res, next) {
    try {
      const formData = {
        tenDichVu: req.body.tenDichVu,
        thoiGianHen: req.body.thoiGianHen,
        thoCat: req.body.thoCat,
        ghiChu: req.body.ghiChu || '',
      };

      const datLich = new DatLich(formData);
      await datLich.save();
       // Log thông báo sau khi lưu thành công
    console.log('Đã lưu đặt lịch thành công:', datLich);
      res.redirect(`/dat_lich/${datLich._id}`);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new DatLichController();
