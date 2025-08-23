import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, MapPin, Award, Users, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedArtists = () => {
  const { t } = useLanguage();

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
      artworks: 89,
      image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Sita_Devi_of_Kapurthala.jpg",
      specialty: "Mythological and nature themes"
    },
    {
      id: 3,
      name: "Jivya Soma Mashe",
      artform: "Warli",
      location: "Maharashtra",
      experience: "50+ years",
      recognition: "Padma Shri",
      followers: "3.1k",
      artworks: 234,
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Jivya_Soma_Mashe.jpg",
      specialty: "Contemporary Warli with social messages"
    },
    {
      id: 4,
      name: "Kalam Patua",
      artform: "Kalighat",
      location: "West Bengal",
      experience: "30+ years",
      recognition: "State Award",
      followers: "1.5k",
      artworks: 67,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp_yNnSSQa7xMov45V2jGOJK_14PwDfWr-yl_H46Kf0Mau9DieftVnocqSGTMy-DqKcu0&usqp=CAU",
      specialty: "Modern interpretations of traditional Kalighat"
    },
    {
      id: 5,
      name: "Rani Jha",
      artform: "Madhubani",
      location: "Bihar",
      experience: "25+ years",
      recognition: "International Recognition",
      followers: "2.7k",
      artworks: 123,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDYKDkh9IJNECuJ_AM_3GcBT1rfo1pVKp63XyWqcHPwW155eF-3142Q55ohiX6nDiRv9I&usqp=CAU",
      specialty: "Contemporary Madhubani with feminist themes"
    },
    {
      id: 6,
      name: "Jangarh Singh Shyam",
      artform: "Gond Art",
      location: "Madhya Pradesh",
      experience: "45+ years",
      recognition: "Padma Shri",
      followers: "4.2k",
      artworks: 189,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpe_nJrY7Y0fU6SS4QqpynEBvpGqlfoXLw9ZdgKgsz-LZHmDbhrcDxoPgz4wEY63W10Uc&usqp=CAU",
      specialty: "Traditional Gond with contemporary elements"
    },
    {
      id: 7,
      name: "Kalam Patua",
      artform: "Kalighat",
      location: "West Bengal",
      experience: "30+ years",
      recognition: "State Award",
      followers: "1.5k",
      artworks: 67,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxP1XmZ2ZK-fevL6QntPbBYOn-z9S7ij2axQ&s",
      specialty: "Modern interpretations of traditional Kalighat"
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
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-cultural text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('artists.title')}
          </h2>
          <p className="font-modern text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('artists.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {artists.map((artist) => (
            <Card key={artist.id} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={artist.image} alt={artist.name} />
                    <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                      {artist.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="font-cultural text-lg text-primary group-hover:text-primary/80 transition-colors">
                      {artist.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">
                      {artist.artform}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{artist.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>{artist.recognition}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{artist.followers} {t('artists.followers')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Palette className="h-4 w-4" />
                    <span>{artist.artworks} {t('artists.artworks')}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {artist.specialty}
                </p>
                
                <Link to={`/artists/${artist.id}`}>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {t('artists.view_profile')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/artists">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg">
              {t('artists.discover_more')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;