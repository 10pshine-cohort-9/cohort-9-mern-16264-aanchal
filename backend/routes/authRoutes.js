const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected route
router.post('/logout', protect, logout);

module.exports = router;