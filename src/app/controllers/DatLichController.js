const Dat_lich = require('../models/DatLich');
const {mongooseToObject} = require('../../util/mongoose')

class DatLichController {
    //GET course: slug
    show(req, res, next) {
        Course.findOne({slug:req.params.slug})
        .then((course)=>{
            res.render('dat_lich/show', {course: mongooseToObject(course)});
        })
        .catch(next);
    }
    //GET dat_lich/create
    create(req, res, next) {
        res.render('dat_lich/create')
    }
    //post courses/store
    // POST courses/store
    async store(req, res, next) {
        try {
            const formData = req.body
            formData.image = formData.image = `https://i.ytimg.com/vi/${req.body.videoid}/hqdefault.jpg`

            const course = new Course(formData);
            await course.save();
             res.redirect('/')
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new DatLichController();