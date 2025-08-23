import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface CollectionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  region: string;
  period: string;
  category: string;
  facts: string[];
}

const CollectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [collection, setCollection] = useState<CollectionData | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const collectionsData: Record<string, CollectionData> = {
    "gond-art": {
      id: "gond-art",
      title: "Gond Art",
      subtitle: "Vibrant tribal art from the heart of India",
      description: "Gond art is a form of tribal art practiced by the Gond people of central India. This vibrant art form is characterized by its use of bright colors, intricate patterns, and depictions of nature, animals, and tribal life.",
      region: "Madhya Pradesh",
      period: "1400+ years old",
      category: "Tribal Art",
      facts: [
        "Gond art originated from the Gond tribe, one of India's largest tribal communities",
        "Traditionally painted on walls and floors using natural colors",
        "Each artist has a unique style and signature pattern",
        "Gond paintings often feature animals like tigers, elephants, and birds"
      ]
    },
    "madhubani": {
      id: "madhubani",
      title: "Madhubani Paintings",
      subtitle: "Ancient folk art from the land of Sita",
      description: "Madhubani painting, also known as Mithila art, is a traditional folk art form practiced in the Mithila region of Bihar, India. This art form is characterized by its intricate line drawings, vibrant colors, and depictions of Hindu deities.",
      region: "Bihar",
      period: "600+ years old",
      category: "Folk Art",
      facts: [
        "Madhubani art originated in the Mithila region, the birthplace of Sita from the Ramayana",
        "Traditionally painted by women on walls and floors during festivals",
        "The art form has five distinct styles: Bharni, Kachni, Tantrik, Godna, and Kohbar",
        "Madhubani paintings often depict scenes from Hindu mythology"
      ]
    },
    "warli-painting": {
      id: "warli-painting",
      title: "Warli Painting",
      subtitle: "Ancient tribal art from Maharashtra",
      description: "Warli painting is an ancient tribal art form practiced by the Warli tribe of Maharashtra, India. This minimalist art form is characterized by its simple geometric shapes, stick figures, and depictions of daily life.",
      region: "Maharashtra",
      period: "3000+ years old",
      category: "Tribal Art",
      facts: [
        "Warli art is one of the oldest art forms in India, dating back over 3000 years",
        "The art form uses only three basic shapes: circle, triangle, and square",
        "Traditionally painted on walls using rice paste and natural colors",
        "Warli paintings often depict scenes from daily life, festivals, and rituals"
      ]
    },
    "pattachitra": {
      id: "pattachitra",
      title: "Pattachitra",
      subtitle: "Traditional scroll paintings from Odisha",
      description: "Pattachitra is a traditional scroll painting art form from Odisha, India. These intricate paintings are characterized by their detailed depictions of Hindu mythology, particularly stories from the Puranas and epics.",
      region: "Odisha",
      period: "1000+ years old",
      category: "Scroll Painting",
      facts: [
        "Pattachitra literally means 'picture on cloth' in Sanskrit",
        "Traditionally painted on cloth using natural colors and gum",
        "The art form is practiced by the Chitrakar community of Odisha",
        "Pattachitra paintings often depict scenes from Hindu mythology"
      ]
    },
    "tanjore-painting": {
      id: "tanjore-painting",
      title: "Tanjore Painting",
      subtitle: "Rich, gilded paintings from Tamil Nadu",
      description: "Tanjore painting is a classical South Indian painting style that originated in the town of Thanjavur in Tamil Nadu. This art form is characterized by its rich colors, gold leaf work, and depictions of Hindu deities.",
      region: "Tamil Nadu",
      period: "400+ years old",
      category: "Religious Art",
      facts: [
        "Tanjore painting originated during the reign of the Nayak dynasty in the 16th century",
        "The art form is characterized by its use of gold leaf and precious stones",
        "Traditional Tanjore paintings are created on wooden panels",
        "Tanjore paintings often feature Hindu deities with elaborate jewelry"
      ]
    }
  };

  useEffect(() => {
    if (id && collectionsData[id]) {
      setCollection(collectionsData[id]);
    }
  }, [id]);

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Simple Header */}
        <section className="pt-20 pb-8 bg-gradient-to-r from-heritage-gold/10 to-heritage-maroon/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/collections" className="flex items-center text-primary hover:text-primary/80">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Link>
              <Badge className="bg-heritage-gold/20 text-heritage-gold">
                {collection.category}
              </Badge>
            </div>
            
            <h1 className="font-cultural text-4xl md:text-5xl font-bold text-primary mb-2">
              {collection.title}
            </h1>
            
            <p className="font-modern text-lg text-muted-foreground mb-4">
              {collection.subtitle}
            </p>
            
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button size="sm" variant="ghost">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Simple Image */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="w-full h-64 bg-gradient-to-br from-heritage-gold/20 via-heritage-maroon/20 to-heritage-brown/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-heritage-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <p className="text-muted-foreground">{collection.title} Artwork</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Main Content */}
              <div>
                <h2 className="font-cultural text-2xl font-bold text-primary mb-4">
                  About {collection.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {collection.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-background border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Region</p>
                    <p className="font-semibold text-primary">{collection.region}</p>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="font-semibold text-primary">{collection.period}</p>
                  </div>
                </div>
              </div>
              
              {/* Facts */}
              <div>
                <h3 className="font-cultural text-xl font-semibold text-primary mb-4">
                  Interesting Facts
                </h3>
                <div className="space-y-3">
                  {collection.facts.map((fact, index) => (
                    <div key={index} className="flex items-start p-3 bg-background border border-border rounded-lg">
                      <span className="w-2 h-2 bg-heritage-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <p className="text-sm text-muted-foreground">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionDetail;
