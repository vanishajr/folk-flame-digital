import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Award, Users } from "lucide-react";

const FeaturedArtists = () => {
  const artists = [
    {
      id: 1,
      name: "Jivya Soma Mashe",
      specialty: "Warli Art Master",
      location: "Thane, Maharashtra",
      experience: "50+ years",
      recognition: "Padma Shri Awardee",
      works: 200,
      students: 500,
      bio: "Pioneer in bringing Warli art to the global stage",
      avatar: "👨‍🎨"
    },
    {
      id: 2,
      name: "Dulari Devi",
      specialty: "Madhubani Artist",
      location: "Ranti, Bihar",
      experience: "35+ years",
      recognition: "National Award Winner",
      works: 150,
      students: 300,
      bio: "Renowned for her innovative Madhubani techniques",
      avatar: "👩‍🎨"
    },
    {
      id: 3,
      name: "Lado Bai",
      specialty: "Pithora Painter",
      location: "Tejgadh, Gujarat",
      experience: "40+ years",
      recognition: "Master Craftsperson",
      works: 180,
      students: 250,
      bio: "Preserving traditional Pithora ceremonial art",
      avatar: "👩‍🎨"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Master Artists
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the guardians of traditional art forms who have dedicated their lives to preserving cultural heritage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <Card 
              key={artist.id}
              className="hover:shadow-lg transition-all duration-300 border-0 bg-card"
            >
              <CardContent className="p-6">
                {/* Artist Avatar & Basic Info */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{artist.avatar}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {artist.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {artist.specialty}
                  </p>
                  <div className="flex items-center justify-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {artist.location}
                  </div>
                  <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                    <Award className="h-3 w-3 mr-1" />
                    {artist.recognition}
                  </Badge>
                </div>

                {/* Artist Bio */}
                <p className="text-muted-foreground text-sm text-center mb-6">
                  {artist.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {artist.works}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Artworks
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {artist.students}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Students
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {artist.experience.split('+')[0]}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Years
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    View Gallery
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Discover More Artists
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;