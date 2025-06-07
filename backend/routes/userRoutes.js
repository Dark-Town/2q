const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateProfile, followUser, unfollowUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', protect, getUserProfile);
router.put('/profile', protect, updateProfile);
router.put('/follow/:id', protect, followUser);
router.put('/unfollow/:id', protect, unfollowUser);

module.exports = router;