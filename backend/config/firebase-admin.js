const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin SDK
let firebaseAdmin;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    // Use service account key from environment variable
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    
    firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL || `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
    
    console.log('✅ Firebase Admin SDK initialized with service account');
  } catch (error) {
    console.error('❌ Error parsing Firebase service account key:', error.message);
    console.log('⚠️  Firebase Admin SDK not initialized - using demo mode');
  }
} else if (process.env.FIREBASE_PROJECT_ID) {
  try {
    // Use default credentials (for Google Cloud deployment)
    firebaseAdmin = admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID
    });
    
    console.log('✅ Firebase Admin SDK initialized with default credentials');
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin with default credentials:', error.message);
    console.log('⚠️  Firebase Admin SDK not initialized - using demo mode');
  }
} else {
  console.log('⚠️  Firebase Admin SDK not initialized - using demo mode');
}

// Mock Firebase Admin for demo mode
if (!firebaseAdmin) {
  firebaseAdmin = {
    auth: () => ({
      verifyIdToken: async (idToken) => {
        // Mock token verification for demo
        console.log('🔐 Demo mode: Mocking Firebase ID token verification');
        return {
          uid: 'demo-user-' + Date.now(),
          email: 'demo@example.com',
          email_verified: true,
          name: 'Demo User',
          picture: 'https://via.placeholder.com/150',
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 3600
        };
      }
    })
  };
}

module.exports = firebaseAdmin;
