const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const { isAuthenticated } = require('../app/middlewares/AuthMiddleware');

// Routes cho đăng nhập/đăng ký
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/register', authController.showRegister);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

module.exports = router; 