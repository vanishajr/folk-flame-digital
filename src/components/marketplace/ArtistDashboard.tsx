import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Eye, 
  Heart, 
  ShoppingCart,
  Calendar,
  MapPin,
  Palette
} from 'lucide-react';

interface Artist {
  id: string;
  name: string;
  email: string;
  artType: string;
  rating: number;
  totalSales: number;
  totalEarnings: number;
  followers: number;
  artworks: number;
}

interface ArtistDashboardProps {
  artist: Artist;
}

const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ artist }) => {
  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'sale',
      message: 'Sold "Traditional Madhubani Painting" for ₹15,000',
      time: '2 hours ago',
      amount: 15000
    },
    {
      id: 2,
      type: 'review',
      message: 'Received 5-star review from John Doe',
      time: '1 day ago',
      rating: 5
    },
    {
      id: 3,
      type: 'follower',
      message: 'Gained 3 new followers',
      time: '2 days ago',
      count: 3
    },
    {
      id: 4,
      type: 'view',
      message: 'Your artwork received 45 new views',
      time: '3 days ago',
      count: 45
    }
  ];

  const popularArtworks = [
    {
      id: 1,
      title: 'Traditional Madhubani Painting',
      views: 156,
      likes: 23,
      sales: 3,
      image: '/src/assets/madhubani-art.jpg'
    },
    {
      id: 2,
      title: 'Warli Tribal Art',
      views: 89,
      likes: 18,
      sales: 1,
      image: '/src/assets/hero-warli-art.jpg'
    },
    {
      id: 3,
      title: 'Pithora Art Sculpture',
      views: 203,
      likes: 31,
      sales: 2,
      image: '/src/assets/pithora-art.jpg'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return <ShoppingCart className="w-4 h-4 text-green-600" />;
      case 'review':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'follower':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'view':
        return <Eye className="w-4 h-4 text-blue-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {artist.name}! 👋
              </h2>
              <p className="text-gray-600 mb-4">
                Here's what's happening with your art business today
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Palette className="w-4 h-4" />
                  <span>{artist.artType} Artist</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{artist.rating} Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>India</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-3xl font-bold text-orange-600">
                {formatCurrency(artist.totalEarnings)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">₹45,000</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+18.4%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Views</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <div className="flex items-center gap-1 text-sm text-blue-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Followers</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+8.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <div className="flex items-center gap-1 text-sm text-amber-600">
                  <Calendar className="w-4 h-4" />
                  <span>2 need shipping</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest marketplace activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  {activity.type === 'sale' && (
                    <Badge variant="secondary" className="text-green-600">
                      {formatCurrency(activity.amount)}
                    </Badge>
                  )}
                  {activity.type === 'review' && (
                    <div className="flex items-center gap-1">
                      {[...Array(activity.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Popular Artworks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Popular Artworks
            </CardTitle>
            <CardDescription>
              Your most viewed and liked artworks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularArtworks.map((artwork) => (
                <div key={artwork.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {artwork.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {artwork.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {artwork.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3" />
                        {artwork.sales}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage All Artworks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to help you manage your art business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Palette className="w-6 h-6" />
              <span>Add New Artwork</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ShoppingCart className="w-6 h-6" />
              <span>View Orders</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistDashboard;
