import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  Award, 
  Users,
  Palette,
  Calendar,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AllArtists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtform, setSelectedArtform] = useState("all");

  const allArtists = [
    {
      id: 1,
      name: "Bhuri Bai",
      artform: "Bhil Art",
      location: "Madhya Pradesh",
      experience: "40+ years",
      recognition: "Padma Shri",
      followers: "2.3k",
      artworks: 156,
      image: "https://mainbhibharat.co.in/wp-content/uploads/2023/12/Bhuri-bai.jpg",
      specialty: "Traditional dot paintings depicting tribal life",
      bio: "Bhuri Bai is a renowned Bhil artist from Madhya Pradesh who has been practicing traditional dot painting for over four decades. Her work focuses on tribal life, nature, and spiritual themes.",
      achievements: ["Padma Shri Award", "National Award for Tribal Art", "Exhibited internationally"],
      style: "Traditional dot painting with natural colors",
      influence: "Pioneer in bringing Bhil art to national recognition"
    },
    {
      id: 2,
      name: "Sita Devi",
      artform: "Madhubani",
      location: "Bihar",
      experience: "35+ years",
      recognition: "National Award",
      followers: "1.8k",
      artworks: 203,
      image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Sita_Devi_of_Kapurthala.jpg",
      specialty: "Intricate fish and bird motifs in traditional style",
      bio: "Sita Devi is a master Madhubani artist known for her intricate line drawings and vibrant use of colors. Her work often depicts scenes from Hindu mythology and daily village life.",
      achievements: ["National Award for Folk Art", "Exhibited at Smithsonian", "UNESCO recognition"],
      style: "Traditional Madhubani with fine line work",
      influence: "Revitalized traditional Madhubani techniques"
    },
    {
      id: 3,
      name: "Jivya Soma Mashe",
      artform: "Warli",
      location: "Maharashtra",
      experience: "50+ years",
      recognition: "Padma Shri",
      followers: "3.1k",
      artworks: 289,
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Jivya_Soma_Mashe.jpg",
      specialty: "Contemporary interpretations of ancient Warli traditions",
      bio: "Jivya Soma Mashe is a legendary Warli artist who brought this ancient tribal art form to international recognition. His work combines traditional motifs with contemporary themes.",
      achievements: ["Padma Shri Award", "International exhibitions", "Documentary subject"],
      style: "Traditional Warli with modern interpretations",
      influence: "International ambassador for Warli art"
    },
    {
      id: 4,
      name: "Ganga Devi",
      artform: "Pithora",
      location: "Gujarat",
      experience: "30+ years",
      recognition: "State Award",
      followers: "1.2k",
      artworks: 134,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp_yNnSSQa7xMov45V2jGOJK_14PwDfWr-yl_H46Kf0Mau9DieftVnocqSGTMy-DqKcu0&usqp=CAU",
      specialty: "Ritualistic horse paintings and spiritual symbols",
      bio: "Ganga Devi is a master of Pithora art, creating ritualistic wall paintings that celebrate life and spiritual beliefs. Her work is deeply rooted in tribal traditions.",
      achievements: ["State Award for Folk Art", "Cultural preservation award", "Museum collections"],
      style: "Traditional Pithora with ritual themes",
      influence: "Preserved traditional Pithora techniques"
    },
    {
      id: 5,
      name: "Jangarh Singh Shyam",
      artform: "Gond Art",
      location: "Madhya Pradesh",
      experience: "25+ years",
      recognition: "International Recognition",
      followers: "4.2k",
      artworks: 312,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDYKDkh9IJNECuJ_AM_3GcBT1rfo1pVKp63XyWqcHPwW155eF-3142Q55ohiX6nDiRv9I&usqp=CAU",
      specialty: "Revolutionary Gond art with contemporary themes",
      bio: "Jangarh Singh Shyam revolutionized Gond art by introducing contemporary themes and techniques while maintaining traditional authenticity. His work bridges ancient and modern India.",
      achievements: ["International exhibitions", "Contemporary art recognition", "Museum collections"],
      style: "Contemporary Gond with traditional elements",
      influence: "Modernized Gond art for global audience"
    },
    {
      id: 6,
      name: "Kalam Patua",
      artform: "Kalighat",
      location: "West Bengal",
      experience: "45+ years",
      recognition: "Padma Shri",
      followers: "3.8k",
      artworks: 267,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpe_nJrY7Y0fU6SS4QqpynEBvpGqlfoXLw9ZdgKgsz-LZHmDbhrcDxoPgz4wEY63W10Uc&usqp=CAU",
      specialty: "Modern Kalighat paintings with social commentary",
      bio: "Kalam Patua is a master of Kalighat painting who has adapted this traditional art form to address contemporary social issues. His work combines satire with artistic excellence.",
      achievements: ["Padma Shri Award", "Social commentary recognition", "International exhibitions"],
      style: "Contemporary Kalighat with social themes",
      influence: "Modernized Kalighat for social awareness"
    },
    {
      id: 7,
      name: "Rani Jha",
      artform: "Madhubani",
      location: "Bihar",
      experience: "38+ years",
      recognition: "National Award",
      followers: "2.7k",
      artworks: 189,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxP1XmZ2ZK-fevL6QntPbBYOn-z9S7ij2axQ&s",
      specialty: "Contemporary Madhubani with feminist themes",
      bio: "Rani Jha is a progressive Madhubani artist who incorporates feminist themes and contemporary issues into traditional art forms. Her work empowers women through art.",
      achievements: ["National Award", "Women empowerment recognition", "International exhibitions"],
      style: "Contemporary Madhubani with feminist themes",
      influence: "Empowered women through traditional art"
    },
    {
      id: 8,
      name: "Anil Vangad",
      artform: "Warli",
      location: "Maharashtra",
      experience: "42+ years",
      recognition: "State Award",
      followers: "1.9k",
      artworks: 145,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4LbzQku3jByEzUO3ecKOYOEeW-EnXruz5BAhgzFnE9FpXDPnKBKToDZo9-VvI_a_vyiY&usqp=CAU",
      specialty: "Traditional Warli with environmental themes",
      bio: "Anil Vangad is a Warli artist who focuses on environmental conservation and nature themes. His work raises awareness about ecological issues through traditional art.",
      achievements: ["State Award", "Environmental recognition", "Conservation advocacy"],
      style: "Traditional Warli with environmental themes",
      influence: "Environmental awareness through Warli art"
    },
    {
      id: 9,
      name: "Lakshman Sutar",
      artform: "Pattachitra",
      location: "Odisha",
      experience: "55+ years",
      recognition: "National Award",
      followers: "2.1k",
      artworks: 178,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      specialty: "Traditional scroll paintings with mythological themes",
      bio: "Lakshman Sutar is a master Pattachitra artist who creates intricate scroll paintings depicting stories from Hindu mythology. His work preserves ancient storytelling traditions.",
      achievements: ["National Award", "Cultural preservation", "Museum collections"],
      style: "Traditional Pattachitra with mythological themes",
      influence: "Preserved ancient storytelling traditions"
    },
    {
      id: 10,
      name: "Meena Kumari",
      artform: "Tanjore Painting",
      location: "Tamil Nadu",
      experience: "32+ years",
      recognition: "State Award",
      followers: "1.6k",
      artworks: 98,
      image: "https://images.unsplash.com/photo-1494790108755-2616c6d58ad1?w=400&h=400&fit=crop&crop=face",
      specialty: "Classical Tanjore with gold leaf work",
      bio: "Meena Kumari is a Tanjore painting specialist known for her exquisite gold leaf work and traditional techniques. Her paintings adorn temples and private collections.",
      achievements: ["State Award", "Temple commissions", "Private collections"],
      style: "Classical Tanjore with gold leaf work",
      influence: "Preserved traditional Tanjore techniques"
    },
    {
      id: 11,
      name: "Rajesh Kumar",
      artform: "Kalamkari",
      location: "Andhra Pradesh",
      experience: "28+ years",
      recognition: "National Award",
      followers: "2.4k",
      artworks: 156,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialty: "Hand-painted textiles with natural dyes",
      bio: "Rajesh Kumar is a Kalamkari master who creates hand-painted textiles using traditional natural dyes. His work combines artistic excellence with sustainable practices.",
      achievements: ["National Award", "Sustainable art recognition", "Textile exhibitions"],
      style: "Traditional Kalamkari with natural dyes",
      influence: "Promoted sustainable art practices"
    },
    {
      id: 12,
      name: "Sunita Devi",
      artform: "Cheriyal Scrolls",
      location: "Telangana",
      experience: "35+ years",
      recognition: "State Award",
      followers: "1.3k",
      artworks: 87,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      specialty: "Narrative scroll paintings with folk tales",
      bio: "Sunita Devi is a Cheriyal scroll artist who creates narrative paintings depicting folk tales and ballads. Her work preserves oral storytelling traditions through visual art.",
      achievements: ["State Award", "Storytelling preservation", "Cultural documentation"],
      style: "Traditional Cheriyal with narrative themes",
      influence: "Preserved oral storytelling traditions"
    }
  ];

  const artforms = [
    "all", "Bhil Art", "Madhubani", "Warli", "Pithora", "Gond Art", 
    "Kalighat", "Pattachitra", "Tanjore Painting", "Kalamkari", "Cheriyal Scrolls"
  ];

  const filteredArtists = allArtists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.artform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArtform = selectedArtform === "all" || artist.artform === selectedArtform;
    return matchesSearch && matchesArtform;
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
                Master Artists
              </h1>
              <p className="font-modern text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover the guardians of India's cultural heritage - talented artists who have dedicated 
                their lives to preserving and promoting traditional folk artforms.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search artists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedArtform}
                    onChange={(e) => setSelectedArtform(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    {artforms.map(artform => (
                      <option key={artform} value={artform}>
                        {artform === "all" ? "All Art Forms" : artform}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Artists Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredArtists.length} of {allArtists.length} artists
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArtists.map((artist) => (
                <Card 
                  key={artist.id} 
                  className="group overflow-hidden hover:shadow-cultural transition-all duration-300 bg-card border-border/50"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-heritage-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge className="bg-heritage-gold text-heritage-brown font-semibold">
                        <Award className="w-3 h-3 mr-1" />
                        {artist.recognition}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to={`/artists/${artist.id}`}>
                        <Button className="w-full bg-heritage-gold text-heritage-brown hover:bg-heritage-gold/90 text-sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-cultural text-lg font-semibold text-primary line-clamp-1">
                        {artist.name}
                      </h3>
                      <Badge className="text-xs bg-heritage-gold/10 text-heritage-gold">
                        {artist.artform}
                      </Badge>
                    </div>
                    
                    <p className="font-modern text-muted-foreground mb-3 text-sm leading-relaxed line-clamp-2">
                      {artist.specialty}
                    </p>
                    
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <MapPin className="w-3 h-3 mr-1" />
                      {artist.location}
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {artist.experience}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {artist.followers}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{artist.artworks} artworks</span>
                      <Link to={`/artists/${artist.id}`}>
                        <Button variant="ghost" size="sm" className="text-xs h-8">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArtists.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No artists found matching your search criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedArtform("all");
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

export default AllArtists;
