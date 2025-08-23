import React, { useState } from 'react';
import { Dialog, DialogContent, DialogOverlay, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import Login from './Login';
import Signup from './Signup';
import OTPVerification from './OTPVerification';
import UserProfile from './UserProfile';

type AuthView = 'login' | 'signup' | 'otp' | 'profile';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: AuthView;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialView = 'login' 
}) => {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { currentUser } = useAuth();

  const handleSwitchToSignup = () => {
    setCurrentView('signup');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleSwitchToOTP = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentView('otp');
  };

  const handleSwitchToProfile = () => {
    setCurrentView('profile');
  };

  const handleClose = () => {
    setCurrentView(initialView);
    onClose();
  };

  const handleSuccess = () => {
    handleClose();
  };

  // If user is logged in and trying to open auth modal, show profile instead
  if (currentUser && currentView !== 'profile') {
    setCurrentView('profile');
  }

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return (
          <Login
            onSwitchToSignup={handleSwitchToSignup}
            onClose={handleClose}
          />
        );
      case 'signup':
        return (
          <Signup
            onSwitchToLogin={handleSwitchToLogin}
            onClose={handleClose}
          />
        );
      case 'otp':
        return (
          <OTPVerification
            phoneNumber={phoneNumber}
            onBack={() => setCurrentView('signup')}
            onSuccess={handleSuccess}
          />
        );
      case 'profile':
        return (
          <UserProfile
            onClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-background/80 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Sign in to your account or create a new one
          </DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
