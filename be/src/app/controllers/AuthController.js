const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');

class AuthController {
  // [GET] /auth/login
  showLogin(req, res) {
    res.render('auth/login');
  }

  // [GET] /auth/register
  showRegister(req, res) {
    res.render('auth/register');
  }

  // [POST] /auth/register
  async register(req, res) {
    try {
      const { username, password, fullName, email } = req.body;

      // Kiểm tra username đã tồn tại
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        req.session.flash = { type: 'danger', message: 'Username đã tồn tại' };
        return res.render('auth/register', {
          error: 'Username đã tồn tại',
          values: req.body
        });
      }

      // Kiểm tra email đã tồn tại
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        req.session.flash = { type: 'danger', message: 'Email đã tồn tại' };
        return res.render('auth/register', {
          error: 'Email đã tồn tại',
          values: req.body
        });
      }

      // Tạo user mới
      const user = new User({
        username,
        password,
        fullName,
        email,
        role: 'customer' // Mặc định là customer
      });

      await user.save();

      // Tự động đăng nhập sau khi đăng ký
      req.session.user = mongooseToObject(user);
      req.session.flash = { type: 'success', message: 'Đăng ký thành công! Chào mừng bạn.' };
      res.redirect('/');
    } catch (error) {
      req.session.flash = { type: 'danger', message: 'Có lỗi xảy ra, vui lòng thử lại' };
      res.render('auth/register', {
        error: 'Có lỗi xảy ra, vui lòng thử lại',
        values: req.body
      });
    }
  }

  // [POST] /auth/login
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Tìm user theo username
      const user = await User.findOne({ username });
      if (!user) {
        req.session.flash = { type: 'danger', message: 'Username không tồn tại' };
        return res.render('auth/login', {
          error: 'Username không tồn tại',
          values: req.body
        });
      }

      // Kiểm tra password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        req.session.flash = { type: 'danger', message: 'Mật khẩu không đúng' };
        return res.render('auth/login', {
          error: 'Mật khẩu không đúng',
          values: req.body
        });
      }

      // Lưu thông tin user vào session
      req.session.user = mongooseToObject(user);
      req.session.flash = { type: 'success', message: 'Đăng nhập thành công!' };
      res.redirect('/');
    } catch (error) {
      req.session.flash = { type: 'danger', message: 'Có lỗi xảy ra, vui lòng thử lại' };
      res.render('auth/login', {
        error: 'Có lỗi xảy ra, vui lòng thử lại',
        values: req.body
      });
    }
  }

  // [GET] /auth/logout
  logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
}

module.exports = new AuthController(); 