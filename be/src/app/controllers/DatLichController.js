const DatLich = require('../models/DatLich');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');

class DatLichController {
  // [GET] /dat_lich/show
  // Hiển thị thông tin lịch hẹn gần đây nhất (lưu trong session)
  async showDanhSach(req, res, next) {
    try {
      const datLichId = req.session.lastDatLichId;

      if (!datLichId) {
        return res.send('Không tìm thấy lịch hẹn gần đây.');
      }

      const datLich = await DatLich.findById(datLichId);

      if (!datLich) {
        return res.send('Lịch hẹn không tồn tại.');
      }

      res.render('dat_lich/show', { datLich: mongooseToObject(datLich) });
    } catch (err) {
      next(err);
    }
  }

  // [GET] /dat_lich/:id
  // Hiển thị chi tiết một lịch hẹn theo ID
  async show(req, res, next) {
    try {
      const datLich = await DatLich.findById(req.params.id);
      res.render('dat_lich/show', { datLich: mongooseToObject(datLich) });
    } catch (err) {
      next(err);
    }
  }

  // [GET] /dat_lich/create
  // Hiển thị form tạo lịch hẹn mới
  create(req, res, next) {
    res.render('dat_lich/create');
  }

  // [POST] /dat_lich/store
  // Lưu thông tin đặt lịch từ form vào MongoDB
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

      // Lưu ID vào session để dùng lại
      req.session.lastDatLichId = datLich._id;

      // Chuyển hướng đến trang chi tiết lịch hẹn
      res.redirect(`/dat_lich/${datLich._id}`);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /dat_lich/:id/edit
  // Hiển thị form chỉnh sửa lịch hẹn theo ID
  edit(req, res, next) {
    DatLich.findById(req.params.id)
      .then(datLich =>
        res.render('dat_lich/edit', { datLich: mongooseToObject(datLich) })
      )
      .catch(next);
  }

  // [PUT] /dat_lich/:id
  // Cập nhật thông tin lịch hẹn sau khi chỉnh sửa
  async update(req, res, next) {
    try {
      await DatLich.updateOne({ _id: req.params.id }, req.body);
      res.redirect(`/dat_lich/${req.params.id}`);
    } catch (err) {
      next(err);
    }
  }
  // DELETE dat_lich/:id/delete
  destroy(req, res, next){
      DatLich.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('/me/stored/products')) // sau khi xóa chuyển về danh sách
        .catch(next);
  }
}

module.exports = new DatLichController();
