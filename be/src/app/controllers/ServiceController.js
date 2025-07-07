const Service = require('../models/Service');

class ServiceController {
  // [GET] /admin/services
  async index(req, res) {
    const services = await Service.find().lean();
    res.render('admin/services/index', { services });
  }

  // [GET] /admin/services/create
  createForm(req, res) {
    res.render('admin/services/create');
  }

  // [POST] /admin/services/create
  async create(req, res) {
    try {
      const { name, price, description, duration } = req.body;
      await Service.create({ name, price, description, duration });
      req.session.flash = { type: 'success', message: 'Thêm dịch vụ thành công!' };
      res.redirect('/admin/services');
    } catch (error) {
      req.session.flash = { type: 'danger', message: 'Thêm dịch vụ thất bại!' };
      res.redirect('/admin/services');
    }
  }

  // [GET] /admin/services/:id/edit
  async editForm(req, res) {
    const service = await Service.findById(req.params.id).lean();
    if (!service) return res.render('error', { message: 'Không tìm thấy dịch vụ' });
    res.render('admin/services/edit', { service });
  }

  // [POST] /admin/services/:id/edit
  async update(req, res) {
    try {
      const { name, price, description, duration } = req.body;
      await Service.findByIdAndUpdate(req.params.id, { name, price, description, duration });
      req.session.flash = { type: 'success', message: 'Cập nhật dịch vụ thành công!' };
      res.redirect('/admin/services');
    } catch (error) {
      req.session.flash = { type: 'danger', message: 'Cập nhật dịch vụ thất bại!' };
      res.redirect('/admin/services');
    }
  }

  // [POST] /admin/services/:id/delete
  async delete(req, res) {
    try {
      await Service.findByIdAndDelete(req.params.id);
      req.session.flash = { type: 'success', message: 'Xóa dịch vụ thành công!' };
      res.redirect('/admin/services');
    } catch (error) {
      req.session.flash = { type: 'danger', message: 'Xóa dịch vụ thất bại!' };
      res.redirect('/admin/services');
    }
  }
}

module.exports = new ServiceController(); 