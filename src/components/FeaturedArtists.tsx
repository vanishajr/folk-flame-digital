import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Award, Users, ArrowRight } from "lucide-react";

const FeaturedArtists = () => {
  const artists = [
    {
      id: 1,
      name: "Bhuri Bai",
      artform: "Bhil Art",
      location: "Madhya Pradesh",
      experience: "40+ years",
      recognition: "Padma Shri",
      followers: "2.3k",
      artworks: 156,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      specialty: "Traditional dot paintings depicting tribal life"
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
      image: "https://images.unsplash.com/photo-1494790108755-2616c6d58ad1?w=400&h=400&fit=crop&crop=face",
      specialty: "Intricate fish and bird motifs in traditional style"
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
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      specialty: "Contemporary interpretations of ancient Warli traditions"
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
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      specialty: "Ritualistic horse paintings and spiritual symbols"
    }
  ];

  return (
    <section id="artists" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-cultural text-4xl md:text-5xl font-bold text-primary mb-4">
            Master Artists
          </h2>
          <p className="font-modern text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet the guardians of our cultural heritage - talented artists who have dedicated 
            their lives to preserving and promoting traditional folk artforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {artists.map((artist) => (
            <Card 
              key={artist.id} 
              className="group overflow-hidden hover:shadow-warm transition-all duration-300 bg-card border-border/50"
            >
              <div className="relative">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-heritage-gold text-heritage-brown font-semibold">
                    <Award className="w-3 h-3 mr-1" />
                    {artist.recognition}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardContent className="p-5">
                <h3 className="font-cultural text-lg font-semibold text-primary mb-1">
                  {artist.name}
                </h3>
                
                <div className="flex items-center text-heritage-gold text-sm font-medium mb-2">
                  <span>{artist.artform}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground text-sm mb-3">
                  <MapPin className="w-3 h-3 mr-1" />
                  {artist.location} • {artist.experience}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {artist.specialty}
                </p>
                
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {artist.followers} followers
                  </div>
                  <span>{artist.artworks} artworks</span>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-sm"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 font-semibold px-8">
            Discover More Artists
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;