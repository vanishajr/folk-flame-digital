import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Award, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
      image: "https://mainbhibharat.co.in/wp-content/uploads/2023/12/Bhuri-bai.jpg",
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
      image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Sita_Devi_of_Kapurthala.jpg",
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
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Jivya_Soma_Mashe.jpg",
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp_yNnSSQa7xMov45V2jGOJK_14PwDfWr-yl_H46Kf0Mau9DieftVnocqSGTMy-DqKcu0&usqp=CAU",
      specialty: "Ritualistic horse paintings and spiritual symbols"
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
      specialty: "Revolutionary Gond art with contemporary themes"
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
      specialty: "Modern Kalighat paintings with social commentary"
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
      specialty: "Contemporary Madhubani with feminist themes"
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
      specialty: "Traditional Warli with environmental themes"
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
                
                <Link to={`/artists/${artist.id}`}>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-sm"
                  >
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/artists">
            <Button size="lg" className="bg-primary hover:bg-primary/90 font-semibold px-8">
              Discover More Artists
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;