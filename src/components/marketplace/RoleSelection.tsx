import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Palette, 
  Heart, 
  Star, 
  Users, 
  TrendingUp,
  Shield,
  Globe
} from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'customer' | 'seller') => void;
  setIsArtist: (isArtist: boolean) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect, setIsArtist }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choose Your Role
        </h2>
        <p className="text-gray-600">
          Are you looking to discover unique artworks or showcase your own creations?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Customer Card */}
        <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-amber-200">
          <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 px-3 py-1 rounded-bl-lg text-sm font-medium">
            Most Popular
          </div>
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-amber-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Art Collector</CardTitle>
            <CardDescription className="text-base">
              Discover and purchase unique cultural artworks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-amber-600" />
                <span className="text-sm">Browse thousands of artworks</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-amber-600" />
                <span className="text-sm">Secure payment protection</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-amber-600" />
                <span className="text-sm">Verified artist profiles</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-amber-600" />
                <span className="text-sm">Global shipping available</span>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => {
                  setIsArtist(false);
                  onRoleSelect('customer');
                }}
              >
                Start Shopping
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Seller Card */}
        <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-200">
          <div className="absolute top-0 right-0 bg-orange-100 text-orange-800 px-3 py-1 rounded-bl-lg text-sm font-medium">
            For Artists
          </div>
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Artist Seller</CardTitle>
            <CardDescription className="text-base">
              Showcase and sell your cultural artworks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Reach global customers</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Grow your art business</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Secure payment processing</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Build your reputation</span>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => {
                  setIsArtist(true);
                  onRoleSelect('seller');
                }}
              >
                Start Selling
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Not sure which to choose?
          </h3>
          <p className="text-gray-600 mb-4">
            You can always switch between roles later. Start as a collector to explore our marketplace, 
            then become a seller when you're ready to showcase your own artworks.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Global Community</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Verified Artists</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
