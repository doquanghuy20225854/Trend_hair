const newsRouters = require('./news');
const siteRouters = require('./Site');

function router(app) {
    app.use('/news', newsRouters);
    app.use('/', siteRouters);
}

module.exports = router;
