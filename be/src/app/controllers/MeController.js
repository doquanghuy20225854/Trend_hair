const Me = require('../models/DatLich');
const { mutipleMongooseToOject } = require('../../util/mongoose');

class MeController {
    // GET /me/stored/Me
    async stored(req, res) {
        try {
            const meList = await Me.find({});
            res.render('me/show', {
                Me: mutipleMongooseToOject(meList),
            });
        } catch (err) {
            res.status(400).json({ error: 'Lỗi khi lấy danh sách lịch hẹn' });
        }
    }
}

module.exports = new MeController();
