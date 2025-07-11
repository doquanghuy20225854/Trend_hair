const DatLich = require('../models/DatLich');
const ComBo = require('../models/Combo');
const Contact = require('../models/Contact');
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

    // [POST] /lien_he
    async submitContact(req, res) {
        try {
            const { name, message } = req.body;
            let email = req.body.email;
            if (req.session.user && req.session.user.email) {
                email = req.session.user.email;
            }
            await Contact.create({ name, email, message });
            res.render('lien_he', { success: 'Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm.' });
        } catch (err) {
            res.render('lien_he', { error: 'Có lỗi xảy ra, vui lòng thử lại.' });
        }
    }

    // [GET] /lien_he/history
    async contactHistory(req, res) {
        try {
            const email = req.session.user ? req.session.user.email : null;
            if (!email) return res.render('lien_he_history', { error: 'Bạn cần đăng nhập để xem lịch sử liên hệ.' });
            const contacts = await Contact.find({ email }).sort({ createdAt: -1 }).lean();
            res.render('lien_he_history', { contacts });
        } catch (err) {
            res.render('lien_he_history', { error: 'Có lỗi xảy ra, vui lòng thử lại.' });
        }
    }
}

module.exports = new SiteController();
