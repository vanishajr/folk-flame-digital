import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, ArrowRight } from "lucide-react";
import madhubaniImage from "@/assets/madhubani-art.jpg";
import pithoraImage from "@/assets/pithora-art.jpg";
import heroImage from "@/assets/hero-warli-art.jpg";

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      title: "Warli: The Dance of Life",
      subtitle: "Traditional tribal art from Maharashtra",
      image: heroImage,
      type: "Collection",
      items: "127 artworks",
      description: "Explore the geometric patterns and storytelling traditions of the Warli tribe"
    },
    {
      id: 2,
      title: "Madhubani Masters",
      subtitle: "Colorful narratives from Bihar",
      image: madhubaniImage,
      type: "360° Experience",
      items: "89 pieces",
      description: "Immerse yourself in the vibrant world of Mithila paintings"
    },
    {
      id: 3,
      title: "Pithora Ceremonies",
      subtitle: "Sacred art of Gujarat's Rathwa tribe",
      image: pithoraImage,
      type: "Interactive",
      items: "64 works",
      description: "Discover the spiritual significance behind these colorful wall paintings"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated selections showcasing the rich diversity of Indian folk art traditions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <Card 
              key={collection.id} 
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {collection.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="sm" variant="ghost" className="bg-background/80 hover:bg-background">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-background/80 hover:bg-background">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {collection.subtitle}
                  </p>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm">
                  {collection.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {collection.items}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary hover:text-primary-foreground hover:bg-primary group-hover:translate-x-1 transition-transform"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4 ml-1" />
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
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;