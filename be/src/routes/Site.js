const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const Service = require('../app/models/Service');

router.get('/', siteController.home);
router.get('/lien_he', (req, res) => {
  res.render('lien_he');
});

router.get('/bang_gia', async (req, res) => {
  const services = await Service.find().lean();
  res.render('bang_gia', { services });
});

module.exports = router;
