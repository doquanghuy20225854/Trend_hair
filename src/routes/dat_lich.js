const express = require('express');
const router = express.Router();
const datLichController = require('../app/controllers/DatLichController');
router.post('/store', datLichController.store);
router.get('/create', datLichController.create);
router.get('/:slug', datLichController.show);
module.exports = router;
