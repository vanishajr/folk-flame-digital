import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { setupRecaptchaVerifier } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { authAPI } from '@/services/api';

// This component uses Firebase's free built-in reCAPTCHA for phone authentication
// No Enterprise reCAPTCHA is required - Firebase handles the reCAPTCHA configuration automatically

// Extend Window interface for reCAPTCHA verifier
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

interface UserProfile {
  uid: string;
  email?: string;
  phoneNumber?: string;
  displayName?: string;
  photoURL?: string;
  location?: {
    latitude: number;
    longitude: number;
    city?: string;
    country?: string;
  };
  createdAt: Date;
  lastLogin: Date;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  loginWithPhone: (phoneNumber: string) => Promise<{ verificationId: string }>;
  verifyOTP: (verificationId: string, otp: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  requestLocationAccess: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createUserProfile = async (uid: string, phoneNumber?: string, email?: string) => {
    const userProfile: UserProfile = {
      uid,
      phoneNumber: phoneNumber ?? null,
      email: email ?? null,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    await setDoc(doc(db, 'users', uid), userProfile);
    setUserProfile(userProfile);
  };

  const loginWithPhone = async (phoneNumber: string): Promise<{ verificationId: string }> => {
    try {
      console.log('Firebase config check:', {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Not set',
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Not set',
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Not set'
      });

      // Demo mode fallback if Firebase not configured or billing not enabled
      if (!import.meta.env.VITE_FIREBASE_API_KEY || 
          import.meta.env.VITE_FIREBASE_API_KEY.includes('your_api_key') ||
          import.meta.env.VITE_FIREBASE_API_KEY.includes('AIzaSyB')) {
        console.log('Using demo mode - Firebase not configured or billing not enabled');
        console.log('💡 Recommendation: Use Google Sign-in instead (completely free)');
        // Simulate successful phone verification for demo
        const mockVerificationId = 'demo-verification-' + Date.now();
        return { verificationId: mockVerificationId };
      }

      console.log('Firebase is configured, proceeding with phone auth');
      console.log('Auth instance:', auth);
      console.log('Phone number:', phoneNumber);

      // Setup reCAPTCHA verifier using the utility function
      // This automatically uses Firebase's free built-in reCAPTCHA
      console.log('Setting up reCAPTCHA verifier with free built-in reCAPTCHA');
      const recaptchaVerifier = setupRecaptchaVerifier();

      console.log('Rendering reCAPTCHA');
      // Render the reCAPTCHA
      await recaptchaVerifier.render();

      console.log('Creating phone provider');
      const phoneProvider = new PhoneAuthProvider(auth);
      
      console.log('Verifying phone number');
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber, 
        recaptchaVerifier
      );

      console.log('Phone verification successful, verificationId:', verificationId);
      return { verificationId };
    } catch (error: any) {
      console.error('Phone authentication error:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });

      // Handle specific Firebase errors
      if (error.code === 'auth/billing-not-enabled') {
        throw new Error(
          'Phone authentication requires billing to be enabled. ' +
          '💡 Use Google Sign-in instead (completely free) or enable billing in Firebase Console. ' +
          'You get 10,000 free SMS verifications per month.'
        );
      } else if (error.code === 'auth/invalid-phone-number') {
        throw new Error('Invalid phone number format. Please include country code (e.g., +91XXXXXXXXXX)');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many requests. Please try again later');
      } else if (error.code === 'auth/quota-exceeded') {
        throw new Error('SMS quota exceeded. Please try again later or use Google Sign-in');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your connection and try again');
      } else {
        // For other errors, provide a generic message
        throw new Error(`Authentication failed: ${error.message || 'Unknown error occurred'}`);
      }
    }
  };

  const verifyOTP = async (verificationId: string, otp: string) => {
    try {
      // Demo mode fallback if Firebase not configured
      if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes('your_api_key')) {
        // Simulate successful OTP verification for demo
        const mockUser = {
          uid: 'demo-user-' + Date.now(),
          phoneNumber: '+1234567890',
          displayName: 'Demo User',
          photoURL: null
        } as User;
        
        const mockProfile: UserProfile = {
          uid: mockUser.uid,
          phoneNumber: '+1234567890',
          displayName: 'Demo User',
          createdAt: new Date(),
          lastLogin: new Date()
        };
        
        setCurrentUser(mockUser);
        setUserProfile(mockProfile);
        return;
      }

      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const result = await signInWithCredential(auth, credential);
      
      if (result.user) {
        // Check if user profile exists, if not create one
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        if (!userDoc.exists()) {
          await createUserProfile(result.user.uid, result.user.phoneNumber || undefined);
        }
        await updateUserProfile({ lastLogin: new Date() });
      }
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        // Get the Firebase ID token
        const idToken = await result.user.getIdToken();
        console.log('🔐 Got Firebase ID token, sending to backend');
        
        try {
          // Send token to backend for verification and user creation
          const response = await authAPI.googleLogin(idToken);

          if (response.success) {
            // Store backend token in localStorage or state
            localStorage.setItem('backendToken', response.data.token);
            
            // Check if user profile exists, if not create one
            const userDoc = await getDoc(doc(db, 'users', result.user.uid));
            if (!userDoc.exists()) {
              await createUserProfile(result.user.uid, undefined, result.user.email || '');
            }
            await updateUserProfile({ lastLogin: new Date() });

            // Show success message
            if (response.data.isNewUser) {
              toast.success('Welcome! Your account has been created successfully.');
            } else {
              toast.success('Welcome back! Login successful.');
            }
          } else {
            throw new Error(response.message || 'Backend authentication failed');
          }
        } catch (backendError) {
          console.error('Backend authentication error:', backendError);
          // Fallback to frontend-only authentication if backend fails
          console.log('⚠️  Backend failed, using frontend-only auth');
          
          // Check if user profile exists, if not create one
          const userDoc = await getDoc(doc(db, 'users', result.user.uid));
          if (!userDoc.exists()) {
            await createUserProfile(result.user.uid, undefined, result.user.email || '');
          }
          await updateUserProfile({ lastLogin: new Date() });
          
          toast.success('Login successful! (Frontend mode)');
        }
      }
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    
    try {
      const updatedProfile = { ...userProfile, ...data };
      await setDoc(doc(db, 'users', currentUser.uid), updatedProfile, { merge: true });
      setUserProfile(updatedProfile as UserProfile);
    } catch (error) {
      throw error;
    }
  };

  const requestLocationAccess = async (): Promise<boolean> => {
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Get city and country from coordinates (you can use a reverse geocoding service)
            try {
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = await response.json();
              
              await updateUserProfile({
                location: {
                  latitude,
                  longitude,
                  city: data.city || data.locality,
                  country: data.countryName
                }
              });
              
              resolve(true);
            } catch (error) {
              // If reverse geocoding fails, still save coordinates
              await updateUserProfile({
                location: { latitude, longitude }
              });
              resolve(true);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            resolve(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          }
        );
      });
    } catch (error) {
      console.error('Location access error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    loginWithPhone,
    verifyOTP,
    loginWithGoogle,
    logout,
    updateUserProfile,
    requestLocationAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
