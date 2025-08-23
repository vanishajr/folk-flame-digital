const jwt = require('jsonwebtoken');
const Artist = require('../models/Artist');

const artistAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const artist = await Artist.findById(decoded.artistId).select('-password');
    
    if (!artist || !artist.isActive) {
      return res.status(401).json({ message: 'Invalid token or artist not found.' });
    }

    if (!artist.isEmailVerified) {
      return res.status(401).json({ message: 'Please verify your email first.' });
    }

    req.artist = artist;
    next();
  } catch (error) {
    console.error('Artist auth error:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = artistAuth;
