import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mic, 
  Gamepad2, 
  Heart, 
  ShoppingBag, 
  Store, 
  Map, 
  Camera,
  Eye,
  Palette
} from "lucide-react";

const FeatureHighlights = () => {
  const features = [
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice Navigation",
      description: "Navigate the platform using voice commands in multiple Indian languages",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Children's Learning",
      description: "Interactive games and activities to teach traditional art forms to kids",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Personalized Recommendations",
      description: "AI-powered suggestions based on your art preferences and viewing history",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Merchandise Store",
      description: "Shop authentic handicrafts, prints, and art supplies from local artisans",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Store className="h-8 w-8" />,
      title: "Art Marketplace",
      description: "Buy and sell original paintings directly from artists and collectors",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: <Map className="h-8 w-8" />,
      title: "Cultural Maps",
      description: "Discover museums, galleries, and cultural centers near you",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "AR Experiences",
      description: "View artworks in your space using augmented reality technology",
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "360° Museum Tours",
      description: "Immersive virtual tours of famous museums and art galleries",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Art Collections",
      description: "Curated collections showcasing different styles and regional art forms",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Platform Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover traditional art through cutting-edge technology and community-driven experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-all duration-300 border-0 bg-card group cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.bgColor} ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {feature.description}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-primary hover:text-primary-foreground hover:bg-primary"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Empowering Artists, Preserving Heritage
            </h3>
            <p className="text-muted-foreground mb-6">
              Our platform bridges the gap between traditional art forms and modern technology, 
              creating sustainable livelihoods for artists while preserving cultural heritage for future generations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                Start Exploring
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Join as Artist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;