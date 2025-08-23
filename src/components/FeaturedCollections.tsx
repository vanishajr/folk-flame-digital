import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroWarliArt from "@/assets/hero-warli-art.jpg";
import madhubaniArt from "@/assets/madhubani-art.jpg";
import pithoraArt from "@/assets/pithora-art.jpg";

const FeaturedCollections = () => {
  const { t } = useLanguage();

  const featuredCollections = [
    {
      id: 1,
      title: "Warli Art",
      description: "Ancient tribal art from Maharashtra, featuring simple geometric patterns and scenes from daily life",
      image: heroWarliArt,
      category: "Tribal Art",
      rating: 4.8,
      followers: "2.1k",
      lastUpdated: "2 days ago",
      items: 45
    },
    {
      id: 2,
      title: "Madhubani Painting",
      description: "Traditional folk art from Bihar, known for its vibrant colors and intricate patterns depicting mythology and nature",
      image: madhubaniArt,
      category: "Folk Painting",
      rating: 4.9,
      followers: "3.2k",
      lastUpdated: "1 week ago",
      items: 67
    },
    {
      id: 3,
      title: "Pithora Art",
      description: "Sacred art form from Gujarat, created during religious ceremonies with natural colors and spiritual motifs",
      image: pithoraArt,
      category: "Sacred Art",
      rating: 4.7,
      followers: "1.8k",
      lastUpdated: "3 days ago",
      items: 38
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-cultural text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('collections.title')}
          </h2>
          <p className="font-modern text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('collections.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCollections.map((collection) => (
            <Card key={collection.id} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                  {collection.category}
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="font-cultural text-2xl text-primary group-hover:text-primary/80 transition-colors">
                  {collection.title}
                </CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  {collection.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{collection.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{collection.followers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{collection.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {collection.items} {t('collections.items')}
                  </span>
                  <Link to={`/collections/${collection.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {t('collections.view_details')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/collections">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg">
              {t('collections.view_all')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;