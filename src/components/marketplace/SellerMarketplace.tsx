import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Heart, 
  Star, 
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Calendar,
  Upload,
  Settings
} from 'lucide-react';

// Import seller components
import ArtistRegistration from './ArtistRegistration';
import ArtistDashboard from './ArtistDashboard';
import ArtworkForm from './ArtworkForm';

interface SellerMarketplaceProps {
  isArtist: boolean;
}

const SellerMarketplace: React.FC<SellerMarketplaceProps> = ({ isArtist }) => {
  const { currentUser } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showArtworkForm, setShowArtworkForm] = useState(false);

  // Mock artist data
  const mockArtist = {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    artType: 'Painting',
    rating: 4.8,
    totalSales: 45,
    totalEarnings: 675000,
    followers: 234,
    artworks: 12
  };

  useEffect(() => {
    // Check if user is already registered as artist
    if (currentUser) {
      // In real app, check backend for artist registration
      setIsRegistered(true);
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  if (!isRegistered) {
    return <ArtistRegistration onRegistrationComplete={() => setIsRegistered(true)} />;
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <Palette className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Artist Login</CardTitle>
              <CardDescription>
                Welcome back! Please sign in to access your artist dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Email" type="email" />
              <Input placeholder="Password" type="password" />
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Artist Dashboard</h1>
            <p className="text-gray-600">Welcome back, {mockArtist.name}!</p>
          </div>
          <Button 
            onClick={() => setShowArtworkForm(true)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Artwork
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">{mockArtist.totalSales}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{mockArtist.totalEarnings.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Followers</p>
                <p className="text-2xl font-bold text-gray-900">{mockArtist.followers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold text-gray-900">{mockArtist.rating}</p>
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="artworks">My Artworks</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <ArtistDashboard artist={mockArtist} />
        </TabsContent>

        <TabsContent value="artworks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">My Artworks</h2>
            <Button 
              onClick={() => setShowArtworkForm(true)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Artwork
            </Button>
          </div>

          {/* Artworks Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={`/src/assets/madhubani-art.jpg`}
                    alt="Artwork"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 left-2">Available</Badge>
                </div>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">Traditional Madhubani Painting</CardTitle>
                  <CardDescription className="mb-3">
                    Beautiful hand-painted Madhubani artwork depicting traditional Indian mythology
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>156 views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>23 likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>2 days ago</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-amber-600">₹15,000</div>
                    <Badge variant="outline">Painting</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
          
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <Card key={order}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src="/src/assets/madhubani-art.jpg"
                        alt="Artwork"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">Traditional Madhubani Painting</h3>
                        <p className="text-sm text-gray-600">Order #ORD-123456</p>
                        <p className="text-sm text-gray-600">Customer: John Doe</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-amber-600">₹15,000</p>
                      <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                      <p className="text-sm text-gray-600">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-semibold">₹45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Month</span>
                    <span className="font-semibold">₹38,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth</span>
                    <span className="font-semibold text-green-600">+18.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Artworks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Madhubani Painting</span>
                    <Badge variant="secondary">156 views</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Warli Art</span>
                    <Badge variant="secondary">89 views</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pithora Sculpture</span>
                    <Badge variant="secondary">203 views</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Artwork Form Modal */}
      {showArtworkForm && (
        <ArtworkForm 
          onClose={() => setShowArtworkForm(false)}
          onSubmit={(data) => {
            console.log('New artwork:', data);
            setShowArtworkForm(false);
          }}
        />
      )}
    </div>
  );
};

export default SellerMarketplace;
