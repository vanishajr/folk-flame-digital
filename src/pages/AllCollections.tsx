import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users,
  Eye,
  Heart,
  Share2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AllCollections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const allCollections = [
    {
      id: 1,
      title: "Gond Art",
      description: "Vibrant tribal art from Madhya Pradesh featuring stylized animals and nature motifs",
      region: "Madhya Pradesh",
      period: "1400+ years old",
      items: "1,567 artworks",
      artists: "45+ artists",
      category: "Tribal Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Pattachitra",
      description: "Traditional scroll paintings from Odisha depicting mythological stories and deities",
      region: "Odisha",
      period: "1000+ years old",
      items: "892 artworks",
      artists: "32+ artists",
      category: "Scroll Painting",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Tanjore Painting",
      description: "Rich, gilded paintings from Tamil Nadu featuring Hindu deities with gold leaf embellishments",
      region: "Tamil Nadu",
      period: "400+ years old",
      items: "634 artworks",
      artists: "28+ artists",
      category: "Religious Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Miniature Paintings",
      description: "Intricate small-scale paintings from Rajasthan and Mughal courts with detailed storytelling",
      region: "Rajasthan",
      period: "500+ years old",
      items: "1,234 artworks",
      artists: "67+ artists",
      category: "Court Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Bhil Art",
      description: "Dot paintings from tribal communities depicting daily life and spiritual beliefs",
      region: "Madhya Pradesh",
      period: "2000+ years old",
      items: "756 artworks",
      artists: "38+ artists",
      category: "Tribal Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Chittara",
      description: "Geometric wall paintings from Karnataka featuring symmetrical patterns and symbols",
      region: "Karnataka",
      period: "800+ years old",
      items: "445 artworks",
      artists: "23+ artists",
      category: "Wall Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 7,
      title: "Pithora Painting",
      description: "Ritualistic wall paintings of Gujarat celebrating life and spiritual beliefs",
      region: "Gujarat",
      period: "800+ years old",
      items: "523 artworks",
      artists: "29+ artists",
      category: "Ritual Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 8,
      title: "Mughal Painting",
      description: "Refined court paintings from the Mughal era featuring historical scenes and portraits",
      region: "Delhi",
      period: "500+ years old",
      items: "1,089 artworks",
      artists: "54+ artists",
      category: "Court Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 9,
      title: "Warli Painting",
      description: "Ancient tribal art form from Maharashtra depicting daily life through geometric patterns",
      region: "Maharashtra",
      period: "3000+ years old",
      items: "1,234 artworks",
      artists: "78+ artists",
      category: "Tribal Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 10,
      title: "Kalamkari",
      description: "Hand-painted cotton textiles from Andhra Pradesh with natural dyes and intricate designs",
      region: "Andhra Pradesh",
      period: "3000+ years old",
      items: "678 artworks",
      artists: "41+ artists",
      category: "Textile Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 11,
      title: "Kalighat Paintings",
      description: "Bold, satirical paintings from Kolkata depicting social themes and religious subjects",
      region: "West Bengal",
      period: "200+ years old",
      items: "456 artworks",
      artists: "19+ artists",
      category: "Folk Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 12,
      title: "Kerala Murals",
      description: "Colorful temple murals from Kerala featuring mythological stories and divine figures",
      region: "Kerala",
      period: "1000+ years old",
      items: "567 artworks",
      artists: "25+ artists",
      category: "Temple Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 13,
      title: "Pichhwai",
      description: "Devotional paintings from Rajasthan depicting Lord Krishna and his divine pastimes",
      region: "Rajasthan",
      period: "400+ years old",
      items: "789 artworks",
      artists: "34+ artists",
      category: "Religious Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 14,
      title: "Madhubani",
      description: "Vibrant folk art from Bihar featuring nature, mythology, and social themes",
      region: "Bihar",
      period: "600+ years old",
      items: "856 artworks",
      artists: "52+ artists",
      category: "Folk Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 15,
      title: "Rajput Painting",
      description: "Royal court paintings from Rajasthan featuring romantic themes and royal life",
      region: "Rajasthan",
      period: "500+ years old",
      items: "923 artworks",
      artists: "47+ artists",
      category: "Court Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 16,
      title: "Phad",
      description: "Long narrative scroll paintings from Rajasthan depicting folk tales and legends",
      region: "Rajasthan",
      period: "700+ years old",
      items: "345 artworks",
      artists: "18+ artists",
      category: "Scroll Painting",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 17,
      title: "Kalamezhuthu",
      description: "Ritualistic floor art from Kerala created with natural powders and colors",
      region: "Kerala",
      period: "1000+ years old",
      items: "234 artworks",
      artists: "12+ artists",
      category: "Ritual Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 18,
      title: "Cheriyal Scrolls",
      description: "Traditional scroll paintings from Telangana depicting folk stories and ballads",
      region: "Telangana",
      period: "400+ years old",
      items: "189 artworks",
      artists: "15+ artists",
      category: "Scroll Painting",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 19,
      title: "Rajasthani Art",
      description: "Diverse art forms from Rajasthan including paintings, textiles, and decorative arts",
      region: "Rajasthan",
      period: "800+ years old",
      items: "1,567 artworks",
      artists: "89+ artists",
      category: "Mixed Media",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 20,
      title: "Manjusha Art",
      description: "Angika folk art from Bihar featuring snake motifs and mythological themes",
      region: "Bihar",
      period: "300+ years old",
      items: "298 artworks",
      artists: "16+ artists",
      category: "Folk Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 21,
      title: "Khovar Art",
      description: "Traditional wall paintings from Jharkhand created during wedding ceremonies",
      region: "Jharkhand",
      period: "500+ years old",
      items: "167 artworks",
      artists: "11+ artists",
      category: "Ritual Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    }
  ];

  const regions = [
    "all", "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", 
    "Rajasthan", "Tamil Nadu", "Telangana", "West Bengal"
  ];

  const filteredCollections = allCollections.filter(collection => {
    const matchesSearch = collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || collection.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Header */}
        <section className="pt-20 pb-12 bg-gradient-warm">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Link to="/" className="flex items-center text-primary hover:text-primary/80 mr-6">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
            
            <div className="text-center mb-12">
              <h1 className="font-cultural text-5xl md:text-6xl font-bold text-primary mb-4">
                All Collections
              </h1>
              <p className="font-modern text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover the rich diversity of Indian folk art forms from across the country. 
                Explore traditional techniques, regional styles, and cultural heritage.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search collections..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>
                        {region === "all" ? "All Regions" : region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredCollections.length} of {allCollections.length} collections
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCollections.map((collection) => (
                <Card 
                  key={collection.id} 
                  className="group overflow-hidden hover:shadow-cultural transition-all duration-300 bg-card border-border/50"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-heritage-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-background/80 hover:bg-background">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-background/80 hover:bg-background">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button className="w-full bg-heritage-gold text-heritage-brown hover:bg-heritage-gold/90 text-sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Explore
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-cultural text-lg font-semibold text-primary line-clamp-1">
                        {collection.title}
                      </h3>
                      <Badge className="text-xs bg-heritage-gold/10 text-heritage-gold">
                        {collection.category}
                      </Badge>
                    </div>
                    
                    <p className="font-modern text-muted-foreground mb-3 text-sm leading-relaxed line-clamp-2">
                      {collection.description}
                    </p>
                    
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <MapPin className="w-3 h-3 mr-1" />
                      {collection.region}
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {collection.period}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {collection.artists}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{collection.items}</span>
                      <Button variant="ghost" size="sm" className="text-xs h-8">
                        View Details
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCollections.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No collections found matching your search criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedRegion("all");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AllCollections;
