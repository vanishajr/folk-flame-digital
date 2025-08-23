import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Award, 
  Users, 
  Palette, 
  Calendar,
  Star,
  Heart,
  Share2
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface ArtistData {
  id: number;
  name: string;
  artform: string;
  location: string;
  experience: string;
  recognition: string;
  followers: string;
  artworks: number;
  image: string;
  specialty: string;
  bio: string;
  achievements: string[];
  style: string;
  influence: string;
}

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const artistsData: Record<number, ArtistData> = {
    1: {
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
    2: {
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
    3: {
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
    4: {
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
    5: {
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
    6: {
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
    7: {
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
    8: {
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
    }
  };

  useEffect(() => {
    if (id && artistsData[parseInt(id)]) {
      setArtist(artistsData[parseInt(id)]);
    }
  }, [id]);

  if (!artist) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Header */}
        <section className="pt-20 pb-8 bg-gradient-to-r from-heritage-gold/10 to-heritage-maroon/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/artists" className="flex items-center text-primary hover:text-primary/80">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Artists
              </Link>
              <Badge className="bg-heritage-gold/20 text-heritage-gold">
                {artist.artform}
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Artist Image */}
              <div className="w-full md:w-80 flex-shrink-0">
                <div className="relative">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-heritage-gold text-heritage-brown font-semibold">
                      <Award className="w-3 h-3 mr-1" />
                      {artist.recognition}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Artist Info */}
              <div className="flex-1">
                <h1 className="font-cultural text-4xl md:text-5xl font-bold text-primary mb-4">
                  {artist.name}
                </h1>
                
                <p className="font-modern text-xl text-muted-foreground mb-6">
                  {artist.specialty}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-semibold text-primary">{artist.experience}</p>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="font-semibold text-primary">{artist.followers}</p>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Artworks</p>
                    <p className="font-semibold text-primary">{artist.artworks}</p>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold text-primary">{artist.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Biography */}
                <Card className="bg-card border-border/50">
                  <CardContent className="p-6">
                    <h2 className="font-cultural text-2xl font-bold text-primary mb-4">
                      Biography
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {artist.bio}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Style & Influence */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-cultural text-xl font-semibold text-primary mb-3">
                        Artistic Style
                      </h3>
                      <p className="text-muted-foreground">
                        {artist.style}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-cultural text-xl font-semibold text-primary mb-3">
                        Cultural Influence
                      </h3>
                      <p className="text-muted-foreground">
                        {artist.influence}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Achievements */}
                <Card className="bg-card border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-cultural text-xl font-semibold text-primary mb-4">
                      Achievements
                    </h3>
                    <div className="space-y-3">
                      {artist.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start">
                          <Star className="h-4 w-4 text-heritage-gold mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Quick Stats */}
                <Card className="bg-card border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-cultural text-xl font-semibold text-primary mb-4">
                      Quick Stats
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Art Form</span>
                        <span className="text-sm font-medium text-primary">{artist.artform}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Experience</span>
                        <span className="text-sm font-medium text-primary">{artist.experience}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Recognition</span>
                        <span className="text-sm font-medium text-primary">{artist.recognition}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Followers</span>
                        <span className="text-sm font-medium text-primary">{artist.followers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Artworks</span>
                        <span className="text-sm font-medium text-primary">{artist.artworks}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistProfile;
