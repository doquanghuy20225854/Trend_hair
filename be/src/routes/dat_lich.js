const express = require('express');
const router = express.Router();
const datLichController = require('../app/controllers/DatLichController');

// Tạo lịch hẹn
router.get('/create', datLichController.create);
router.post('/store', datLichController.store);

// Hiển thị danh sách
router.get('/show', datLichController.showDanhSach);

// Chức năng sửa
router.put('/:id', datLichController.update)
router.get('/:id/edit', datLichController.edit);
// chức năng xóa
router.delete('/:id/delete', datLichController.destroy)
// Xem chi tiết
router.get('/:id', datLichController.show);

module.exports = router;
