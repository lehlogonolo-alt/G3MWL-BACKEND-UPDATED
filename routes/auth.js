const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth'); // 🔐 JWT middleware

//  Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

//  Change Password (requires token)
router.put('/change-password', auth, authController.changePassword);

module.exports = router;



