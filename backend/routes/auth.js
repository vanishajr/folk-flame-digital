const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const firebaseAuth = require('../middleware/firebaseAuth');

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);
router.post('/verify-token', authController.verifyToken);

// Protected routes (using Firebase auth)
router.get('/profile', firebaseAuth, authController.getProfile);
router.put('/profile', firebaseAuth, authController.updateProfile);

// Legacy protected routes (using JWT auth)
router.get('/profile-jwt', auth, authController.getProfile);
router.put('/profile-jwt', auth, authController.updateProfile);

module.exports = router;
