import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProfile {
  uid: string;
  email: string;
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
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, phoneNumber: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
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

  const createUserProfile = async (uid: string, email: string, phoneNumber: string) => {
    const userProfile: UserProfile = {
      uid,
      email,
      phoneNumber,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    await setDoc(doc(db, 'users', uid), userProfile);
    setUserProfile(userProfile);
  };

  const login = async (email: string, password: string) => {
    try {
      // Demo mode fallback if Firebase not configured
      if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes('your_api_key')) {
        // Simulate successful login for demo
        const mockUser = {
          uid: 'demo-user-123',
          email: email,
          displayName: email.split('@')[0],
          photoURL: null
        } as User;
        
        const mockProfile: UserProfile = {
          uid: 'demo-user-123',
          email: email,
          phoneNumber: '+1234567890',
          displayName: email.split('@')[0],
          createdAt: new Date(),
          lastLogin: new Date()
        };
        
        setCurrentUser(mockUser);
        setUserProfile(mockProfile);
        return;
      }
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Update last login
      if (result.user) {
        await updateUserProfile({ lastLogin: new Date() });
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, phoneNumber: string) => {
    try {
      // Demo mode fallback if Firebase not configured
      if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes('your_api_key')) {
        // Simulate successful signup for demo
        const mockUser = {
          uid: 'demo-user-' + Date.now(),
          email: email,
          displayName: email.split('@')[0],
          photoURL: null
        } as User;
        
        const mockProfile: UserProfile = {
          uid: mockUser.uid,
          email: email,
          phoneNumber: phoneNumber,
          displayName: email.split('@')[0],
          createdAt: new Date(),
          lastLogin: new Date()
        };
        
        setCurrentUser(mockUser);
        setUserProfile(mockProfile);
        return;
      }
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result.user) {
        await createUserProfile(result.user.uid, email, phoneNumber);
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
        // Check if user profile exists, if not create one
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        if (!userDoc.exists()) {
          await createUserProfile(result.user.uid, result.user.email || '', '');
        }
        await updateUserProfile({ lastLogin: new Date() });
      }
    } catch (error) {
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

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
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
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    requestLocationAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
