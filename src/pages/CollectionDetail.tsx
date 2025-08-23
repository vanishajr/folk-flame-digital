import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

  const collectionsData: Record<string, CollectionData> = {
    "warli-art": {
      id: "warli-art",
      title: "Warli Art",
      subtitle: "Ancient tribal art from Maharashtra",
      description: "Warli painting is an ancient tribal art form practiced by the Warli tribe of Maharashtra, India. This minimalist art form is characterized by its simple geometric shapes, stick figures, and depictions of daily life. The art form uses only three basic shapes: circle, triangle, and square, creating intricate patterns that tell stories of village life, festivals, and rituals.",
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
    "madhubani-painting": {
      id: "madhubani-painting",
      title: "Madhubani Painting",
      subtitle: "Ancient folk art from the land of Sita",
      description: "Madhubani painting, also known as Mithila art, is a traditional folk art form practiced in the Mithila region of Bihar, India. This art form is characterized by its intricate line drawings, vibrant colors, and depictions of Hindu deities. Traditionally painted by women on walls and floors during festivals, Madhubani art has five distinct styles: Bharni, Kachni, Tantrik, Godna, and Kohbar.",
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
    "pithora-art": {
      id: "pithora-art",
      title: "Pithora Art",
      subtitle: "Sacred ritualistic art from Gujarat",
      description: "Pithora art is a sacred ritualistic art form practiced by the Rathwa, Bhil, and Nayak tribes of Gujarat. This art form is created during religious ceremonies and is characterized by its use of natural colors, spiritual motifs, and depictions of the sacred horse. Pithora paintings are believed to bring good fortune and are often created on walls during important life events.",
      region: "Gujarat",
      period: "800+ years old",
      category: "Sacred Art",
      facts: [
        "Pithora art is created during religious ceremonies and rituals",
        "The sacred horse is a central motif in Pithora paintings",
        "Traditionally painted on walls using natural colors and materials",
        "Pithora art is believed to bring good fortune and prosperity"
      ]
    },
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
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Collection Not Found</h1>
            <p className="text-muted-foreground mb-6">The collection you're looking for doesn't exist.</p>
            <Link to="/collections">
              <Button>Back to Collections</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              {collection.category}
            </Badge>
            <h1 className="font-cultural text-4xl md:text-6xl font-bold text-primary mb-4">
              {collection.title}
            </h1>
            <p className="font-modern text-xl text-muted-foreground mb-6">
              {collection.subtitle}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>📍 {collection.region}</span>
              <span>⏰ {collection.period}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Description */}
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold text-primary mb-4">About {collection.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {collection.description}
                    </p>
                    
                    <h3 className="text-xl font-semibold text-primary mb-3">Quick Facts</h3>
                    <ul className="space-y-2">
                      {collection.facts.map((fact, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Collection Info</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium">{collection.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Region:</span>
                        <span className="font-medium">{collection.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Period:</span>
                        <span className="font-medium">{collection.period}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setIsLiked(!isLiked)}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        {isLiked ? 'Liked' : 'Like'}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionDetail;
