import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  Filter, 
  Heart, 
  ShoppingCart, 
  Star, 
  Eye,
  MapPin,
  Calendar,
  Palette
} from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  price: {
    amount: number;
    currency: string;
  };
  artist: {
    id: string;
    name: string;
    rating: number;
    totalSales: number;
  };
  likes: number;
  views: number;
  createdAt: string;
}

const CustomerMarketplace: React.FC = () => {
  const { currentUser } = useAuth();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  // Mock data for demonstration
  const mockArtworks: Artwork[] = [
    {
      id: '1',
      title: 'Traditional Madhubani Painting',
      description: 'Beautiful hand-painted Madhubani artwork depicting traditional Indian mythology',
      category: 'Painting',
      images: ['/src/assets/madhubani-art.jpg'],
      price: { amount: 15000, currency: 'INR' },
      artist: { id: '1', name: 'Priya Sharma', rating: 4.8, totalSales: 45 },
      likes: 23,
      views: 156,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Warli Tribal Art',
      description: 'Authentic Warli painting showcasing tribal life and traditions',
      category: 'Painting',
      images: ['/src/assets/hero-warli-art.jpg'],
      price: { amount: 8500, currency: 'INR' },
      artist: { id: '2', name: 'Rajesh Patil', rating: 4.9, totalSales: 32 },
      likes: 18,
      views: 89,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'Pithora Art Sculpture',
      description: 'Handcrafted Pithora art sculpture made from natural materials',
      category: 'Sculpture',
      images: ['/src/assets/pithora-art.jpg'],
      price: { amount: 25000, currency: 'INR' },
      artist: { id: '3', name: 'Lakshmi Devi', rating: 4.7, totalSales: 28 },
      likes: 31,
      views: 203,
      createdAt: '2024-01-08'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArtworks(mockArtworks);
      setFilteredArtworks(mockArtworks);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterArtworks();
  }, [artworks, searchTerm, selectedCategory, priceRange, sortBy]);

  const filterArtworks = () => {
    let filtered = [...artworks];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(artwork =>
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(artwork => artwork.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(artwork =>
      artwork.price.amount >= priceRange[0] && artwork.price.amount <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price.amount - b.price.amount);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price.amount - a.price.amount);
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }

    setFilteredArtworks(filtered);
  };

  const toggleWishlist = (artworkId: string) => {
    setWishlist(prev => 
      prev.includes(artworkId) 
        ? prev.filter(id => id !== artworkId)
        : [...prev, artworkId]
    );
  };

  const addToCart = (artworkId: string) => {
    setCart(prev => 
      prev.includes(artworkId) 
        ? prev 
        : [...prev, artworkId]
    );
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading artworks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Artworks</h1>
        <p className="text-gray-600">Explore unique cultural artworks from talented artists</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Painting">Painting</SelectItem>
              <SelectItem value="Sculpture">Sculpture</SelectItem>
              <SelectItem value="Photography">Photography</SelectItem>
              <SelectItem value="Handicraft">Handicraft</SelectItem>
              <SelectItem value="Digital Art">Digital Art</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Price Range</label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100000}
              step={1000}
              className="w-full"
            />
            <div className="text-xs text-gray-500">
              {formatPrice(priceRange[0], 'INR')} - {formatPrice(priceRange[1], 'INR')}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {filteredArtworks.length} of {artworks.length} artworks
        </p>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer">
            <Heart className="w-4 h-4 mr-1" />
            Wishlist ({wishlist.length})
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            <ShoppingCart className="w-4 h-4 mr-1" />
            Cart ({cart.length})
          </Badge>
        </div>
      </div>

      {/* Artworks Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArtworks.map((artwork) => (
          <Card key={artwork.id} className="group hover:shadow-lg transition-all duration-300">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={artwork.images[0]}
                alt={artwork.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => toggleWishlist(artwork.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${wishlist.includes(artwork.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => addToCart(artwork.id)}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
              <Badge className="absolute top-2 left-2">
                {artwork.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2 line-clamp-1">{artwork.title}</CardTitle>
              <CardDescription className="line-clamp-2 mb-3">
                {artwork.description}
              </CardDescription>
              
              {/* Artist Info */}
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">{artwork.artist.name}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{artwork.artist.rating}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>{artwork.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{artwork.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(artwork.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-amber-600">
                  {formatPrice(artwork.price.amount, artwork.price.currency)}
                </div>
                <Button 
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700"
                  onClick={() => addToCart(artwork.id)}
                >
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredArtworks.length === 0 && (
        <div className="text-center py-12">
          <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No artworks found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or browse all categories
          </p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setPriceRange([0, 100000]);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerMarketplace;
