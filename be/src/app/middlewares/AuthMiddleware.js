// Middleware kiểm tra đã đăng nhập chưa
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/auth/login');
};

// Middleware kiểm tra quyền admin
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.status(403).render('error', {
    message: 'Bạn không có quyền truy cập trang này'
  });
};

// Middleware kiểm tra quyền customer
const isCustomer = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'customer') {
    return next();
  }
  res.status(403).render('error', {
    message: 'Bạn không có quyền truy cập trang này'
  });
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isCustomer
}; 