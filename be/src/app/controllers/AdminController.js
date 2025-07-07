const User = require('../models/User');
const DatLich = require('../models/DatLich');
const Product = require('../models/Product');
const { mutipleMongooseToOject } = require('../../util/mongoose');

class AdminController {
  // [GET] /admin/dashboard
  async dashboard(req, res) {
    try {
      const users = await User.find({ role: 'customer' });
      const appointments = await DatLich.find();
      const products = await Product.find();

      res.render('admin/dashboard', {
        users: mutipleMongooseToOject(users),
        appointments: mutipleMongooseToOject(appointments),
        products: mutipleMongooseToOject(products)
      });
    } catch (error) {
      res.status(500).render('error', { message: 'Có lỗi xảy ra' });
    }
  }

  // [GET] /admin/users
  async users(req, res) {
    try {
      const users = await User.find({ role: 'customer' });
      res.render('admin/users', {
        users: mutipleMongooseToOject(users)
      });
    } catch (error) {
      res.status(500).render('error', { message: 'Có lỗi xảy ra' });
    }
  }

  // [GET] /admin/appointments
  async appointments(req, res) {
    try {
      const appointments = await DatLich.find();
      res.render('admin/appointments', {
        appointments: mutipleMongooseToOject(appointments)
      });
    } catch (error) {
      res.status(500).render('error', { message: 'Có lỗi xảy ra' });
    }
  }

  // [GET] /admin/users/:id
  async userDetail(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).render('error', { message: 'Không tìm thấy người dùng' });
      res.render('admin/user_detail', { user: user.toObject() });
    } catch (error) {
      res.status(500).render('error', { message: 'Có lỗi xảy ra' });
    }
  }

  // [GET] /admin/users/:id/edit
  async editUserForm(req, res) {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.render('error', { message: 'Không tìm thấy người dùng' });
    res.render('admin/user_edit', { user });
  }

  // [POST] /admin/users/:id/edit
  async updateUser(req, res) {
    try {
      const { fullName, email, role } = req.body;
      await User.findByIdAndUpdate(req.params.id, { fullName, email, role });
      req.session.flash = { type: 'success', message: 'Cập nhật người dùng thành công!' };
      res.redirect('/admin/users');
    } catch (error) {
      req.session.flash = { type: 'danger', message: 'Cập nhật người dùng thất bại!' };
      res.redirect('/admin/users');
    }
  }

  // [POST] /admin/users/:id/delete
  async deleteUser(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      req.session.flash = { type: 'success', message: 'Xóa người dùng thành công!' };
      res.redirect('/admin/users');
    } catch (error) {
      req.session.flash = { type: 'danger', message: 'Xóa người dùng thất bại!' };
      res.redirect('/admin/users');
    }
  }
}

module.exports = new AdminController(); 