import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import madhubaniArt from "@/assets/madhubani-art.jpg";
import pithoraArt from "@/assets/pithora-art.jpg";
import heroWarliArt from "@/assets/hero-warli-art.jpg";

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      title: "Warli Art",
      description: "Ancient tribal art form from Maharashtra depicting daily life through geometric patterns",
      image: heroWarliArt,
      items: "1,234 artworks",
      region: "Maharashtra",
      period: "3000+ years old"
    },
    {
      id: 2,
      title: "Madhubani Paintings",
      description: "Vibrant folk art from Bihar featuring nature, mythology, and social themes",
      image: madhubaniArt,
      items: "856 artworks",
      region: "Bihar",
      period: "600+ years old"
    },
    {
      id: 3,
      title: "Pithora Art",
      description: "Ritualistic wall paintings of Gujarat celebrating life and spiritual beliefs",
      image: pithoraArt,
      items: "523 artworks",
      region: "Gujarat",
      period: "800+ years old"
    }
  ];

  return (
    <section id="collections" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-cultural text-4xl md:text-5xl font-bold text-primary mb-4">
            Featured Collections
          </h2>
          <p className="font-modern text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our curated collections of traditional Indian folk artforms, 
            each telling unique stories of cultural heritage and artistic expression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collections.map((collection) => (
            <Card 
              key={collection.id} 
              className="group overflow-hidden hover:shadow-cultural transition-all duration-300 bg-card border-border/50"
            >
              <div className="relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-background/80 hover:bg-background">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-background/80 hover:bg-background">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="w-full bg-heritage-gold text-heritage-brown hover:bg-heritage-gold/90">
                    <Eye className="mr-2 h-4 w-4" />
                    Explore Collection
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-cultural text-xl font-semibold text-primary">
                    {collection.title}
                  </h3>
                  <span className="text-sm font-medium text-heritage-gold bg-heritage-gold/10 px-2 py-1 rounded">
                    {collection.region}
                  </span>
                </div>
                
                <p className="font-modern text-muted-foreground mb-4 text-sm leading-relaxed">
                  {collection.description}
                </p>
                
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <span>{collection.items}</span>
                  <span>{collection.period}</span>
                </div>
                
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/collections">
            <Button size="lg" className="bg-primary hover:bg-primary/90 font-semibold px-8">
              View All Collections
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;