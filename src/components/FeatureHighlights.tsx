import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mic, 
  Gamepad2, 
  ShoppingBag, 
  Map, 
  Camera, 
  Building2, 
  Palette, 
  Volume2,
  ArrowRight,
  Sparkles
} from "lucide-react";

const FeatureHighlights = () => {
  const features = [
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice Navigation",
      description: "Explore art collections using natural voice commands in multiple Indian languages",
      color: "heritage-gold",
      gradient: "from-heritage-gold/20 to-heritage-gold/5"
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Children's Learning",
      description: "Interactive games and stories introducing kids to traditional art forms",
      color: "heritage-maroon",
      gradient: "from-heritage-maroon/20 to-heritage-maroon/5"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Personalized Recommendations",
      description: "AI-powered suggestions based on your interests and viewing history",
      color: "heritage-brown",
      gradient: "from-heritage-brown/20 to-heritage-brown/5"
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Artist Marketplace",
      description: "Buy authentic artworks directly from traditional artists and support their livelihood",
      color: "heritage-gold",
      gradient: "from-heritage-gold/20 to-heritage-gold/5"
    },
    {
      icon: <Map className="h-8 w-8" />,
      title: "Cultural Map",
      description: "Discover museums, galleries, and cultural centers near you",
      color: "heritage-maroon",
      gradient: "from-heritage-maroon/20 to-heritage-maroon/5"
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "AR Experience",
      description: "Bring artworks to life with augmented reality and 3D visualizations",
      color: "heritage-brown",
      gradient: "from-heritage-brown/20 to-heritage-brown/5"
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Virtual Museum Tours",
      description: "360° immersive tours of famous museums and heritage sites",
      color: "heritage-gold",
      gradient: "from-heritage-gold/20 to-heritage-gold/5"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Art Collections",
      description: "Curated galleries showcasing diverse traditional Indian folk artforms",
      color: "heritage-maroon",
      gradient: "from-heritage-maroon/20 to-heritage-maroon/5"
    }
  ];

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-cultural text-4xl md:text-5xl font-bold text-primary mb-4">
            Innovative Cultural Experience
          </h2>
          <p className="font-modern text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover traditional Indian art through cutting-edge technology and immersive experiences 
            designed to preserve and promote our cultural heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-cultural transition-all duration-300 bg-card border-border/50 overflow-hidden"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="font-cultural text-lg font-semibold text-primary mb-3">
                  {feature.title}
                </h3>
                
                <p className="font-modern text-sm text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Access Voice Panel */}
          <Card className="bg-gradient-cultural text-primary-foreground overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Volume2 className="h-6 w-6 mr-3" />
                <h3 className="font-cultural text-xl font-semibold">
                  Voice-Activated Discovery
                </h3>
              </div>
              <p className="font-modern mb-6 opacity-90">
                "Hey Heritage, show me Warli paintings from Maharashtra" - 
                Experience hands-free exploration of our cultural treasures.
              </p>
              <Button className="bg-heritage-gold text-heritage-brown hover:bg-heritage-gold/90 font-semibold">
                <Mic className="mr-2 h-4 w-4" />
                Try Voice Search
              </Button>
            </CardContent>
          </Card>

          {/* Featured Experience */}
          <Card className="bg-heritage-beige text-heritage-brown overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Camera className="h-6 w-6 mr-3" />
                <h3 className="font-cultural text-xl font-semibold">
                  AR Art Experience
                </h3>
              </div>
              <p className="font-modern mb-6">
                Point your camera at any surface and watch traditional artworks 
                come alive with stories, animations, and interactive elements.
              </p>
              <Button className="bg-heritage-maroon text-primary-foreground hover:bg-heritage-maroon/90 font-semibold">
                <Sparkles className="mr-2 h-4 w-4" />
                Launch AR Mode
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;