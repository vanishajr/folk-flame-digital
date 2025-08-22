import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield,
  Key,
  Smartphone,
  Globe
} from 'lucide-react';

const AuthDemo: React.FC = () => {
  const { currentUser, userProfile, requestLocationAccess } = useAuth();

  const handleLocationRequest = async () => {
    try {
      const success = await requestLocationAccess();
      if (success) {
        alert('Location access granted! Check your profile to see the details.');
      } else {
        alert('Location access denied');
      }
    } catch (error) {
      alert('Failed to get location');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Authentication System Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the comprehensive authentication system built for Heritage Arts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Authentication Methods */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-blue-600" />
                <CardTitle>Multiple Auth Methods</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-green-500" />
                  <span>Email & Password</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span>Google Sign-in</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-purple-500" />
                  <span>Phone OTP (Coming Soon)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <CardTitle>Security Features</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Secure password validation</li>
                <li>• Firebase Authentication</li>
                <li>• Protected user data</li>
                <li>• Session management</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Profile */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-purple-600" />
                <CardTitle>User Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Personal information</li>
                <li>• Location services</li>
                <li>• Account settings</li>
                <li>• Activity history</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Current User Status */}
        <Card className="max-w-2xl mx-auto bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Current Authentication Status</CardTitle>
            <CardDescription>
              {currentUser ? 'You are currently signed in' : 'You are not signed in'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentUser && userProfile ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{userProfile.displayName || 'User'}</p>
                    <p className="text-sm text-gray-500">Display Name</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{userProfile.email}</p>
                    <p className="text-sm text-gray-500">Email Address</p>
                  </div>
                </div>
                
                {userProfile.phoneNumber && (
                  <>
                    <Separator />
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{userProfile.phoneNumber}</p>
                        <p className="text-sm text-gray-500">Phone Number</p>
                      </div>
                      <Badge variant="secondary">Verified</Badge>
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">
                      {new Date(userProfile.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Member Since</p>
                  </div>
                </div>
                
                {userProfile.location ? (
                  <>
                    <Separator />
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">
                          {userProfile.location.city || 'Unknown City'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {userProfile.location.latitude.toFixed(4)}, {userProfile.location.longitude.toFixed(4)}
                        </p>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Location Enabled
                      </Badge>
                    </div>
                  </>
                ) : (
                  <>
                    <Separator />
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-400">Location not set</p>
                        <p className="text-sm text-gray-500">Enable location services</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleLocationRequest}
                        className="h-8 px-3"
                      >
                        Enable
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  Sign in to see your profile information and enable location services
                </p>
                <p className="text-sm text-gray-400">
                  Use the Sign In button in the top navigation to get started
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="max-w-4xl mx-auto mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">For New Users:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
                  <li>Click "Sign In" in the top navigation</li>
                  <li>Switch to the "Sign Up" tab</li>
                  <li>Choose your preferred authentication method</li>
                  <li>Fill in your details and create account</li>
                  <li>Enable location access for personalized features</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">For Existing Users:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
                  <li>Click "Sign In" in the top navigation</li>
                  <li>Use your email/password or Google account</li>
                  <li>Access your profile by clicking your avatar</li>
                  <li>Manage your account settings and preferences</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthDemo;
