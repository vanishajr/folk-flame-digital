const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');
const auth = require('../middleware/auth');
const artistAuth = require('../middleware/artistAuth');

// Artist Registration and Authentication
router.post('/artist/register', marketplaceController.registerArtist);
router.get('/artist/verify/:token', marketplaceController.verifyArtistEmail);
router.post('/artist/login', marketplaceController.loginArtist);

// Artwork Management (Artist only)
router.post('/artworks', artistAuth, marketplaceController.createArtwork);
router.put('/artworks/:id', artistAuth, marketplaceController.updateArtwork);
router.delete('/artworks/:id', artistAuth, marketplaceController.deleteArtwork);

// Artwork Browsing (Public)
router.get('/artworks', marketplaceController.getArtworks);
router.get('/artworks/:id', marketplaceController.getArtworkById);

// Customer Interactions (Authenticated users)
router.post('/artworks/:id/like', auth, marketplaceController.likeArtwork);
router.post('/artworks/:id/wishlist', auth, marketplaceController.addToWishlist);
router.post('/artists/:artistId/follow', auth, marketplaceController.followArtist);

// Order Management
router.post('/orders', auth, marketplaceController.createOrder);
router.get('/orders', auth, marketplaceController.getOrders);

// Review Management
router.post('/reviews', auth, marketplaceController.createReview);
router.get('/reviews', marketplaceController.getReviews);

// Artist Dashboard (Artist only)
router.get('/artist/dashboard', artistAuth, marketplaceController.getArtistDashboard);

module.exports = router;
