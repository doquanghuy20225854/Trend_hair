const siteRouters = require('./Site');
const datLichRouters = require('./dat_lich');
const sanPhamRouter = require('./Product'); // đường dẫn router của bạn
const meRouters = require('./me');

function router(app) {
app.use('/dat_lich', datLichRouters);
app.use('/me', meRouters);
app.use('/products', sanPhamRouter); // => http://localhost:3000/san-pham
app.use('/', siteRouters);
}

module.exports = router;
