const express = require('express');
const leaderboardController = require('../controllers/leaderboardController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', leaderboardController.getLeaderboard);

// Protected routes
router.post('/submit-score', auth, leaderboardController.submitScore);
router.get('/my-rank', auth, leaderboardController.getUserRank);

module.exports = router;
