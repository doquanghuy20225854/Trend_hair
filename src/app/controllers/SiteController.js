const Course = require('../models/DatLich');
const {mutipleMongooseToOject} = require('../../util/mongoose')

class SiteController {
    // GET /search
    search(req, res) {
        res.render('search');
    }
    // GET /home
    async home(req, res) {
        try {
            const courses = await Course.find({});
            res.render('home', {
                                courses: mutipleMongooseToOject(courses)
                                });
        } catch (err) {
            res.status(400).json({ error: 'Error fetching courses' });
        }
    }

    
}

module.exports = new SiteController();