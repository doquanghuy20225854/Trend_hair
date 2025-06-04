const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');

router.get('/:slug', productController.detail);
router.get('/', productController.show); // GET /san-pham => hiển thị danh sách sản phẩm
module.exports = router;