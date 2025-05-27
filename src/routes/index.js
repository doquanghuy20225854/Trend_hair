const newsRouters = require('./news');
const siteRouters = require('./Site');
const courseRouters = require('./courses');

function router(app) {
app.use('/news', newsRouters);
app.use('/courses', courseRouters);
app.use('/', siteRouters);
}

module.exports = router;
