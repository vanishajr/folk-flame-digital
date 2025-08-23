import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Store, 
  Palette, 
  ShoppingCart, 
  Heart, 
  Star, 
  Users, 
  TrendingUp,
  Shield,
  CreditCard,
  Truck
} from 'lucide-react';

// Import marketplace components
import CustomerMarketplace from '@/components/marketplace/CustomerMarketplace';
import SellerMarketplace from '@/components/marketplace/SellerMarketplace';
import RoleSelection from '@/components/marketplace/RoleSelection';

const Marketplace: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'customer' | 'seller' | null>(null);
  const [isArtist, setIsArtist] = useState(false);

  // If no role is selected, show role selection
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Heritage Arts Marketplace
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover unique cultural artworks from talented artists or showcase your own creations to art enthusiasts worldwide.
            </p>
          </div>

          <RoleSelection 
            onRoleSelect={setSelectedRole}
            setIsArtist={setIsArtist}
          />

          {/* Features Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Why Choose Our Marketplace?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-xl mb-2">Secure & Trusted</CardTitle>
                <CardDescription>
                  Verified artists, secure payments, and buyer protection ensure a safe shopping experience.
                </CardDescription>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl mb-2">Cultural Heritage</CardTitle>
                <CardDescription>
                  Discover authentic artworks that preserve and celebrate our rich cultural traditions.
                </CardDescription>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-xl mb-2">Global Community</CardTitle>
                <CardDescription>
                  Connect with artists and collectors from around the world in our vibrant community.
                </CardDescription>
              </Card>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Marketplace Statistics
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">500+</div>
                <div className="text-gray-600">Artists</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">2,000+</div>
                <div className="text-gray-600">Artworks</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">10,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">4.8★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* For Customers */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-amber-600" />
                    For Art Collectors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">1</Badge>
                    <div>
                      <h4 className="font-semibold">Browse & Discover</h4>
                      <p className="text-sm text-gray-600">Explore thousands of unique artworks from verified artists</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">2</Badge>
                    <div>
                      <h4 className="font-semibold">Secure Purchase</h4>
                      <p className="text-sm text-gray-600">Buy with confidence using our secure payment system</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">3</Badge>
                    <div>
                      <h4 className="font-semibold">Enjoy Your Art</h4>
                      <p className="text-sm text-gray-600">Receive your artwork safely and leave a review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* For Artists */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-6 h-6 text-orange-600" />
                    For Artists
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">1</Badge>
                    <div>
                      <h4 className="font-semibold">Create Account</h4>
                      <p className="text-sm text-gray-600">Sign up as an artist and verify your account</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">2</Badge>
                    <div>
                      <h4 className="font-semibold">Upload Artworks</h4>
                      <p className="text-sm text-gray-600">Showcase your creations with high-quality images</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">3</Badge>
                    <div>
                      <h4 className="font-semibold">Start Selling</h4>
                      <p className="text-sm text-gray-600">Reach global customers and grow your business</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render the appropriate marketplace interface based on selected role
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pt-20">
      {selectedRole === 'customer' ? (
        <CustomerMarketplace />
      ) : (
        <SellerMarketplace isArtist={isArtist} />
      )}
    </div>
  );
};

export default Marketplace;
