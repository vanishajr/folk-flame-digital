import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Phone, Loader2, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import OTPVerification from './OTPVerification';

interface SignupProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSwitchToLogin, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('google');
  const [showOTP, setShowOTP] = useState(false);
  const [verificationId, setVerificationId] = useState('');

  const { loginWithPhone, verifyOTP, loginWithGoogle } = useAuth();

  const handlePhoneSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !displayName) {
      toast.error('Please fill in all fields');
      return;
    }

    // Format phone number to include country code if not present
    let formattedPhone = phoneNumber;
    if (!phoneNumber.startsWith('+')) {
      formattedPhone = '+91' + phoneNumber; // Default to India (+91)
    }

    setIsLoading(true);
    try {
      const result = await loginWithPhone(formattedPhone);
      setVerificationId(result.verificationId);
      setShowOTP(true);
      toast.success('OTP sent successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Account created successfully!');
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Google signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (otp: string) => {
    try {
      await verifyOTP(verificationId, otp);
      toast.success('Account created successfully!');
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'OTP verification failed');
    }
  };

  const handleBackToPhone = () => {
    setShowOTP(false);
    setVerificationId('');
  };

  if (showOTP) {
    return (
      <OTPVerification
        phoneNumber={phoneNumber}
        onBack={handleBackToPhone}
        onSuccess={handleOTPVerification}
      />
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>
          Join Heritage Arts and explore cultural treasures
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="google">Google (Free)</TabsTrigger>
            <TabsTrigger value="phone">Phone (Billing Required)</TabsTrigger>
          </TabsList>

          <TabsContent value="google" className="space-y-4">
            <Button
              onClick={handleGoogleSignup}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Google Sign-in is completely free and doesn't require billing setup
              </p>
            </div>
          </TabsContent>

          <TabsContent value="phone" className="space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-xs text-amber-800">
                <strong>⚠️ Billing Required:</strong> Phone authentication requires Firebase billing to be enabled.
                <br />
                <span className="text-amber-700">💡 Recommendation: Use Google Sign-in above (completely free)</span>
              </p>
            </div>
            <form onSubmit={handlePhoneSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Enter your display name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send you a 6-digit verification code
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Hidden reCAPTCHA container for Firebase Phone Auth */}
        <div id="recaptcha-container" className="hidden"></div>
      </CardContent>
    </Card>
  );
};

export default Signup;
