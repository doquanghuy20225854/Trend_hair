const Course = require('./models/Course');
const {mongooseToObject} = require('../../util/mongoose')

class CourseController {
    //GET course: slug
    show(req, res, next) {
        Course.findOne({slug:req.params.slug})
        .then((course)=>{
            res.render('courses/show', {course: mongooseToObject(course)});
        })
        .catch(next);
    }
    //GET courses/create
    create(req, res, next) {
        res.render('courses/create')
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

module.exports = new CourseController();