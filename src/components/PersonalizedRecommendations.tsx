import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, X, ArrowRight, Sparkles, Palette, Heart, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ArtworkRecommendation {
  title: string;
  artist: string;
  artform: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  tags: string[];
}

const PersonalizedRecommendations = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    favoriteArtforms: [] as string[],
    favoriteColors: [] as string[],
    favoriteThemes: [] as string[],
    budget: "",
    additionalNotes: ""
  });
  const [recommendations, setRecommendations] = useState<ArtworkRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const artformOptions = [
    "Warli", "Madhubani", "Pithora", "Gond", "Kalighat", "Phad", "Cheriyal", "Pattachitra"
  ];

  const colorOptions = [
    "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White"
  ];

  const themeOptions = [
    "Nature", "Mythology", "Daily Life", "Spiritual", "Festivals", "Animals", "Landscapes", "Abstract"
  ];

  const budgetOptions = [
    "Under ₹1,000", "₹1,000 - ₹5,000", "₹5,000 - ₹10,000", "₹10,000 - ₹25,000", "Above ₹25,000"
  ];

  const GEMINI_API_KEY = "AIzaSyDd3NTJd5NgazyXwCnZL9FJvruQvIkVf5E";
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  const generateRecommendations = async () => {
    setIsLoading(true);
    const prompt = `You are an expert art curator specializing in Indian folk art. Based on the following user preferences, recommend 6 specific Indian folk artworks:

User Preferences:
- Favorite Art Forms: ${preferences.favoriteArtforms.join(', ')}
- Favorite Colors: ${preferences.favoriteColors.join(', ')}
- Favorite Themes: ${preferences.favoriteThemes.join(', ')}
- Budget: ${preferences.budget}
- Additional Notes: ${preferences.additionalNotes}

Please provide recommendations in the following JSON format:
[
  {
    "title": "Artwork Title",
    "artist": "Artist Name",
    "artform": "Art Form",
    "description": "Brief description of the artwork",
    "price": "Price range",
    "image": "emoji representation",
    "rating": 4.5,
    "tags": ["tag1", "tag2", "tag3"]
  }
]

Focus on authentic Indian folk art that matches their preferences. Make the recommendations diverse and interesting.`;

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;
      
      try {
        // Try to extract JSON from the response
        const jsonMatch = aiText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsedRecommendations = JSON.parse(jsonMatch[0]);
          setRecommendations(parsedRecommendations);
        } else {
          // Fallback to mock data if parsing fails
          setRecommendations(mockRecommendations);
        }
      } catch (parseError) {
        console.log('AI response parsing failed, using mock data');
        setRecommendations(mockRecommendations);
      }
      
      setStep(3);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setRecommendations(mockRecommendations);
      setStep(3);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPreferences({
      favoriteArtforms: [],
      favoriteColors: [],
      favoriteThemes: [],
      budget: "",
      additionalNotes: ""
    });
    setStep(1);
    setRecommendations([]);
  };

  const mockRecommendations: ArtworkRecommendation[] = [
    {
      title: "Warli Village Scene",
      artist: "Jivya Soma Mashe",
      artform: "Warli",
      description: "Traditional Warli painting depicting daily village life with geometric patterns",
      price: "₹3,500 - ₹5,000",
      image: "🏘️",
      rating: 4.8,
      tags: ["Traditional", "Village Life", "Geometric"]
    },
    {
      title: "Madhubani Goddess",
      artist: "Sita Devi",
      artform: "Madhubani",
      description: "Vibrant Madhubani painting of Goddess Lakshmi with intricate floral motifs",
      price: "₹4,200 - ₹6,500",
      image: "🌸",
      rating: 4.9,
      tags: ["Mythological", "Vibrant", "Floral"]
    },
    {
      title: "Gond Tree of Life",
      artist: "Jangarh Singh Shyam",
      artform: "Gond",
      description: "Contemporary Gond art showing the sacred tree with animals and nature",
      price: "₹5,500 - ₹8,000",
      image: "🌳",
      rating: 4.7,
      tags: ["Nature", "Contemporary", "Sacred"]
    },
    {
      title: "Pithora Horse",
      artist: "Local Artist",
      artform: "Pithora",
      description: "Ritualistic Pithora painting of the sacred horse with spiritual symbols",
      price: "₹2,800 - ₹4,200",
      image: "🐎",
      rating: 4.6,
      tags: ["Ritual", "Spiritual", "Traditional"]
    },
    {
      title: "Kalighat Social Scene",
      artist: "Kalam Patua",
      artform: "Kalighat",
      description: "Modern Kalighat painting with social commentary and contemporary themes",
      price: "₹3,200 - ₹4,800",
      image: "👥",
      rating: 4.5,
      tags: ["Social", "Modern", "Commentary"]
    },
    {
      title: "Phad Scroll",
      artist: "Traditional Phad Artist",
      artform: "Phad",
      description: "Ancient Phad scroll painting telling stories of local heroes and legends",
      price: "₹6,500 - ₹9,000",
      image: "📜",
      rating: 4.8,
      tags: ["Ancient", "Storytelling", "Legendary"]
    }
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">{t('recommendations.step1.title')}</h2>
        <p className="text-muted-foreground">{t('recommendations.step1.subtitle')}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Select your favorite art forms:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {artformOptions.map((artform) => (
              <Button
                key={artform}
                type="button"
                variant={preferences.favoriteArtforms.includes(artform) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setPreferences(prev => ({
                    ...prev,
                    favoriteArtforms: prev.favoriteArtforms.includes(artform)
                      ? prev.favoriteArtforms.filter(f => f !== artform)
                      : [...prev.favoriteArtforms, artform]
                  }));
                }}
                className="justify-start"
              >
                {artform}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={() => setStep(2)} disabled={preferences.favoriteArtforms.length === 0}>
          {t('recommendations.continue')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">{t('recommendations.step2.title')}</h2>
        <p className="text-muted-foreground">{t('recommendations.step2.subtitle')}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Favorite colors:</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {colorOptions.map((color) => (
              <Button
                key={color}
                type="button"
                variant={preferences.favoriteColors.includes(color) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setPreferences(prev => ({
                    ...prev,
                    favoriteColors: prev.favoriteColors.includes(color)
                      ? prev.favoriteColors.filter(c => c !== color)
                      : [...prev.favoriteColors, color]
                  }));
                }}
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Favorite themes:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {themeOptions.map((theme) => (
              <Button
                key={theme}
                type="button"
                variant={preferences.favoriteThemes.includes(theme) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setPreferences(prev => ({
                    ...prev,
                    favoriteThemes: prev.favoriteThemes.includes(theme)
                      ? prev.favoriteThemes.filter(t => t !== theme)
                      : [...prev.favoriteThemes, theme]
                  }));
                }}
              >
                {theme}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Budget range:</label>
          <select
            value={preferences.budget}
            onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
            className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          >
            <option value="">Select budget range</option>
            {budgetOptions.map((budget) => (
              <option key={budget} value={budget}>{budget}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Additional notes (optional):</label>
          <Textarea
            value={preferences.additionalNotes}
            onChange={(e) => setPreferences(prev => ({ ...prev, additionalNotes: e.target.value }))}
            placeholder="Tell us more about your preferences, style, or any specific requirements..."
            className="min-h-[100px]"
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)}>
          {t('recommendations.back')}
        </Button>
        <Button onClick={generateRecommendations} disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              {t('recommendations.generate')}
              <Sparkles className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">{t('recommendations.step3.title')}</h2>
        <p className="text-muted-foreground">{t('recommendations.step3.subtitle')}</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((artwork, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="text-4xl mb-2">{artwork.image}</div>
              <CardTitle className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
                {artwork.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                by {artwork.artist} • {artwork.artform}
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {artwork.description}
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{artwork.rating}</span>
                </div>
                <span className="text-sm font-semibold text-primary">{artwork.price}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {artwork.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Button variant="outline" onClick={() => setStep(2)}>
          {t('recommendations.adjust_preferences')}
        </Button>
        <Button className="bg-primary hover:bg-primary/90">
          {t('recommendations.explore_collection')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  if (!isExpanded) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            
            <h2 className="font-cultural text-4xl md:text-5xl font-bold text-primary mb-4">
              {t('recommendations.title')}
            </h2>
            
            <p className="font-modern text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('recommendations.subtitle')}
            </p>
            
            <Button 
              size="lg" 
              onClick={() => setIsExpanded(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg"
            >
              {t('recommendations.learn_more')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary">
              <Bot className="h-4 w-4" />
              Powered by Google Gemini AI
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">{t('recommendations.title')}</h1>
            <p className="text-muted-foreground">{t('recommendations.step')} {step} {t('common.of')} 3</p>
          </div>
          <Button onClick={() => { setIsExpanded(false); resetForm(); }}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
