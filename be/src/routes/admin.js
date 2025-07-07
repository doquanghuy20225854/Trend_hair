const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');
const { isAdmin } = require('../app/middlewares/AuthMiddleware');
const serviceController = require('../app/controllers/ServiceController');

// Tất cả các routes admin đều yêu cầu quyền admin
router.use(isAdmin);

router.get('/dashboard', adminController.dashboard);
router.get('/users', adminController.users);
router.get('/appointments', adminController.appointments);
router.get('/users/:id', adminController.userDetail);
router.get('/users/:id/edit', adminController.editUserForm);
router.post('/users/:id/edit', adminController.updateUser);
router.post('/users/:id/delete', adminController.deleteUser);

// Quản lý dịch vụ
router.get('/services', serviceController.index);
router.get('/services/create', serviceController.createForm);
router.post('/services/create', serviceController.create);
router.get('/services/:id/edit', serviceController.editForm);
router.post('/services/:id/edit', serviceController.update);
router.post('/services/:id/delete', serviceController.delete);

module.exports = router; 