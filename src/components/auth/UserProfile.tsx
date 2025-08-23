import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  LogOut, 
  Settings, 
  Map,
  Loader2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { currentUser, userProfile, logout, requestLocationAccess } = useAuth();
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  const handleLocationRequest = async () => {
    setIsRequestingLocation(true);
    try {
      const success = await requestLocationAccess();
      if (success) {
        toast.success('Location access granted!');
      } else {
        toast.error('Location access denied');
      }
    } catch (error) {
      toast.error('Failed to get location');
    } finally {
      setIsRequestingLocation(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      onClose();
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  if (!currentUser || !userProfile) {
    return null;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
        <Avatar className="h-20 w-20 mx-auto mb-4">
          <AvatarImage src={userProfile.photoURL} alt={userProfile.displayName || 'User'} />
          <AvatarFallback className="text-lg">
            {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">
          {userProfile.displayName || 'User'}
        </CardTitle>
        <CardDescription>
          Member since {formatDate(userProfile.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{userProfile.email}</span>
          </div>
          
          {userProfile.phoneNumber && (
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{userProfile.phoneNumber}</span>
              <Badge variant="secondary" className="text-xs">Verified</Badge>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Last login: {formatDate(userProfile.lastLogin)}
            </span>
          </div>

          {userProfile.location ? (
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <div>{userProfile.location.city || 'Unknown City'}</div>
                <div className="text-muted-foreground text-xs">
                  {userProfile.location.latitude.toFixed(4)}, {userProfile.location.longitude.toFixed(4)}
                </div>
              </div>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Location not set</span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleLocationRequest}
                disabled={isRequestingLocation}
                className="h-6 px-2 text-xs"
              >
                {isRequestingLocation ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Map className="h-3 w-3" />
                )}
                Enable
              </Button>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              // Navigate to settings page or open settings modal
              toast.info('Settings feature coming soon!');
            }}
          >
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Heritage Arts • Version 1.0.0
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
