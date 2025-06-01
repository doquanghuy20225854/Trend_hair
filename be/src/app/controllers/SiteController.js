const DatLich = require('../models/DatLich');
const ComBo = require('../models/Combo');
const { mutipleMongooseToOject } = require('../../util/mongoose');

class SiteController { 
    // GET /home
    async home(req, res) {
        try {
            const comBos = await ComBo.find({});
            //console.log('Danh sách Combo:', comBos);
            res.render('home', {
                comBos: mutipleMongooseToOject(comBos),
            });
        } catch (err) {
            res.status(400).json({ error: 'Lỗi khi lấy danh sách đặt lịch' });
        }
    }
}

module.exports = new SiteController();
