const mongoose = require('mongoose');
const User = require('../app/models/User');
const db = require('../config/db');

async function createAdmin() {
  try {
    // Kết nối database
    await db.connect();

    // Kiểm tra xem đã có admin chưa
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin đã tồn tại!');
      process.exit(0);
    }

    // Tạo tài khoản admin
    const admin = new User({
      username: 'admin',
      password: 'admin123', // Mật khẩu sẽ được hash tự động
      fullName: 'Administrator',
      email: 'admin@trendhair.com',
      role: 'admin'
    });

    await admin.save();
    console.log('Đã tạo tài khoản admin thành công!');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Lỗi:', error);
    process.exit(1);
  }
}

createAdmin(); 