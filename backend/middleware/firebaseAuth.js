const firebaseAdmin = require('../config/firebase-admin');

const firebaseAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    if (!idToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format'
      });
    }

    try {
      // Verify the Firebase ID token
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      
      // Add user info to request
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
        providerId: decodedToken.provider_id || 'google.com'
      };
      
      next();
    } catch (error) {
      console.error('Firebase token verification error:', error);
      
      if (error.code === 'auth/id-token-expired') {
        return res.status(401).json({
          success: false,
          message: 'Token expired'
        });
      }
      
      if (error.code === 'auth/id-token-revoked') {
        return res.status(401).json({
          success: false,
          message: 'Token revoked'
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error('Firebase auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

module.exports = firebaseAuth;
