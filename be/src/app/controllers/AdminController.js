const User = require('../models/User');
const DatLich = require('../models/DatLich');
const Product = require('../models/Product');
const Contact = require('../models/Contact');
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

  // [GET] /admin/contacts
  async contacts(req, res) {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
      res.render('admin/contacts', { contacts });
    } catch (error) {
      res.status(500).render('error', { message: 'Có lỗi xảy ra khi lấy danh sách liên hệ' });
    }
  }

  // [GET] /admin/contacts/:id
  async contactDetail(req, res) {
    try {
      const contact = await Contact.findById(req.params.id).lean();
      if (!contact) return res.status(404).render('error', { message: 'Không tìm thấy liên hệ' });
      res.render('admin/contact_detail', { contact });
    } catch (error) {
      res.status(500).render('error', { message: 'Có lỗi xảy ra khi lấy chi tiết liên hệ' });
    }
  }

  // [POST] /admin/contacts/:id/reply
  async replyContact(req, res) {
    try {
      const { reply } = req.body;
      await Contact.findByIdAndUpdate(req.params.id, { adminReply: reply });
      res.redirect('/admin/contacts/' + req.params.id);
    } catch (error) {
      res.status(500).render('error', { message: 'Có lỗi xảy ra khi trả lời liên hệ' });
    }
  }
}

module.exports = new AdminController(); 