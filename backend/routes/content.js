const express = require('express');
const contentController = require('../controllers/contentController');

const router = express.Router();

// Public routes
router.get('/games', contentController.getGames);
router.get('/learning-modules', contentController.getLearningModules);
router.get('/art-facts', contentController.getArtFacts);

module.exports = router;
