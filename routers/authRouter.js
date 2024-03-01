// router/authRouter.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/user', authController.getUserByJWT);

router.get('/user', authController.getUserByJWT);

router.post('/forgetPasswordReq', authController.forgetPasswordReq);

router.post('/resetPassword', authController.resetPassword);

module.exports = router;

