const newsRouters = require('./news');
const siteRouters = require('./Site');
const datLichRouters = require('./dat_lich');

function router(app) {
app.use('/news', newsRouters);
app.use('/dat_lich', datLichRouters);
app.use('/', siteRouters);
}

module.exports = router;
