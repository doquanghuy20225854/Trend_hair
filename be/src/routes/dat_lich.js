const express = require('express');
const router = express.Router();
const datLichController = require('../app/controllers/DatLichController');
router.post('/store', datLichController.store);
router.get('/create', datLichController.create);
// routes/dat_lich.js
router.get('/:id', datLichController.show);
module.exports = router;
