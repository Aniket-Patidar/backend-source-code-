// router/userRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


/* protected */
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ success: true, message: 'Authenticated user', user: req.user });
});

router.put('/profile', userController.updateProfile);

router.get('/profile', userController.profile);

router.post('/reset-password', userController.resetPassword);

router.post('/upload-avatar', userController.uploadAvatar);

module.exports = router;
