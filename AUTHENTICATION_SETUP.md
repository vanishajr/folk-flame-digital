# Authentication System Setup Guide

This guide will help you set up the authentication system for your Heritage Arts website.

## Prerequisites

- Node.js and npm installed
- A Firebase project created

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication with the following providers:
   - Email/Password
   - Google Sign-in
   - Phone (optional, for OTP functionality)
4. Enable Firestore Database
5. Get your Firebase configuration

## Environment Configuration

Create a `.env` file in your project root with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdefghijklmnop
```

## Update Firebase Configuration

1. Open `src/lib/firebase.ts`
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Firestore Security Rules

Set up Firestore security rules to allow authenticated users to read/write their own data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Features Included

### Authentication Methods
- **Email/Password**: Traditional signup and login
- **Google Sign-in**: One-click authentication with Google
- **Phone Authentication**: OTP-based verification (placeholder implementation)

### User Management
- User profile creation and management
- Location access with reverse geocoding
- Account settings and logout functionality

### Security Features
- Password validation
- Secure authentication state management
- Protected routes and user data

## Usage

### For Users
1. Click the "Sign In" button in the top navigation
2. Choose between email/password or Google sign-in
3. For new users, click "Sign up" to create an account
4. Access your profile by clicking your avatar/name in the navigation
5. Enable location access for personalized experiences

### For Developers
- Use `useAuth()` hook to access authentication state
- Access `currentUser` and `userProfile` from the context
- Call authentication methods like `login()`, `signup()`, `logout()`

## Customization

### Adding New Authentication Providers
1. Enable the provider in Firebase Console
2. Add the provider to the AuthContext
3. Create corresponding UI components

### Styling
- All components use Tailwind CSS classes
- UI components are built with shadcn/ui
- Customize colors and styling in `tailwind.config.ts`

### Additional Features
- Implement phone authentication with Firebase Phone Auth
- Add email verification
- Implement password reset functionality
- Add social media authentication (Facebook, Twitter, etc.)

## Troubleshooting

### Common Issues
1. **Firebase not initialized**: Check your environment variables and Firebase config
2. **Authentication not working**: Verify Firebase Authentication is enabled
3. **Database errors**: Check Firestore security rules
4. **Location access denied**: Ensure HTTPS is enabled (required for geolocation)

### Debug Mode
Enable debug logging by adding this to your Firebase config:

```typescript
if (import.meta.env.DEV) {
  console.log('Firebase config:', firebaseConfig);
}
```

## Support

For issues related to:
- Firebase setup: [Firebase Documentation](https://firebase.google.com/docs)
- Authentication: [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- Firestore: [Firestore Documentation](https://firebase.google.com/docs/firestore)
