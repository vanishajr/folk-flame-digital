import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface OTPVerificationProps {
  phoneNumber: string;
  onBack: () => void;
  onSuccess: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ 
  phoneNumber, 
  onBack, 
  onSuccess 
}) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically verify the OTP with Firebase Phone Auth
      // For now, we'll simulate the verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsVerified(true);
      toast.success('Phone number verified successfully!');
      
      // Auto-close after showing success
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      // Here you would typically resend the OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(30);
      toast.success('OTP resent successfully!');
    } catch (error: any) {
      toast.error('Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  if (isVerified) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Phone Verified!</h3>
          <p className="text-muted-foreground">
            Your phone number has been successfully verified.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="absolute left-4 top-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <CardTitle className="text-2xl font-bold">Verify Phone</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to {phoneNumber}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            render={({ slots }) => (
              <InputOTPGroup className="gap-2 justify-center">
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>

        <Button
          onClick={handleVerifyOTP}
          className="w-full"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </Button>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?
          </p>
          <Button
            variant="link"
            onClick={handleResendOTP}
            disabled={isResending || countdown > 0}
            className="p-0 h-auto"
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Resending...
              </>
            ) : countdown > 0 ? (
              `Resend in ${countdown}s`
            ) : (
              'Resend OTP'
            )}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;
