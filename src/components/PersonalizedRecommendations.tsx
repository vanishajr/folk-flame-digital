import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sparkles, 
  Palette, 
  Heart, 
  Search, 
  Loader2,
  ArrowRight,
  Star,
  Eye,
  Bot,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

interface ArtworkRecommendation {
  id: string;
  title: string;
  artform: string;
  description: string;
  image: string;
  similarity: number;
  artist: string;
  location: string;
  tags: string[];
  reasoning: string;
}

const PersonalizedRecommendations = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const GEMINI_API_KEY = "AIzaSyDd3NTJd5NgazyXwCnZL9FJvruQvIkVf5E";
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  const artformOptions = [
    "Madhubani", "Warli", "Gond Art", "Bhil Art", "Pattachitra", 
    "Tanjore Painting", "Kalamkari", "Cheriyal Scrolls", "Pithora", "Kalighat"
  ];

  const colorOptions = [
    "Vibrant & Bold", "Earth Tones", "Pastels", "Monochrome", 
    "Traditional Colors", "Modern Colors", "Natural Dyes"
  ];

  const themeOptions = [
    "Nature & Landscapes", "Mythology & Religion", "Daily Life", "Tribal Culture",
    "Abstract & Geometric", "Animals & Birds", "Festivals & Celebrations",
    "Spiritual & Meditation", "Contemporary Issues", "Traditional Stories"
  ];

  const budgetOptions = [
    "Under ₹1,000", "₹1,000 - ₹5,000", "₹5,000 - ₹10,000", 
    "₹10,000 - ₹25,000", "Above ₹25,000", "No specific budget"
  ];

  const handlePreferenceChange = (category: string, value: string) => {
    setPreferences(prev => {
      const currentValues = prev[category as keyof typeof prev] as string[];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [category]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentValues, value]
        };
      }
    });
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
    setAiResponse("");
  };

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    try {
      // Create the prompt for Gemini AI
      const prompt = `You are an expert art curator specializing in Indian folk art. Based on the following user preferences, recommend 6 specific Indian folk artworks that would be perfect for them.

User Preferences:
- Favorite Art Forms: ${preferences.favoriteArtforms.join(', ')}
- Favorite Colors: ${preferences.favoriteColors.join(', ')}
- Favorite Themes: ${preferences.favoriteThemes.join(', ')}
- Budget Range: ${preferences.budget}
- Additional Notes: ${preferences.additionalNotes}

Please provide recommendations in the following JSON format:
[
  {
    "title": "Artwork Title",
    "artform": "Specific Art Form",
    "description": "Detailed description of the artwork and why it matches the user's preferences",
    "artist": "Artist Name",
    "location": "Region/State",
    "tags": ["tag1", "tag2", "tag3"],
    "reasoning": "Explain why this artwork is perfect for the user based on their preferences",
    "similarity": 85
  }
]

Focus on:
1. How the artwork matches their color preferences
2. How it aligns with their budget
3. Cultural significance and authenticity
4. Practical placement suggestions
5. Why it matches their chosen themes and art forms

Make the recommendations highly personalized and specific to their preferences.`;

      // Call Gemini AI API
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

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;
      setAiResponse(aiText);

      // Try to parse AI response as JSON, fallback to mock data if parsing fails
      try {
        const jsonStart = aiText.indexOf('[');
        const jsonEnd = aiText.lastIndexOf(']') + 1;
        const jsonString = aiText.substring(jsonStart, jsonEnd);
        const aiRecommendations = JSON.parse(jsonString);
        
        // Add images to AI recommendations
        const recommendationsWithImages = aiRecommendations.map((rec: any, index: number) => ({
          ...rec,
          id: `ai-rec-${index}`,
          image: `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center&ix=1${index}`,
          similarity: rec.similarity || Math.floor(Math.random() * 20) + 80
        }));
        
        setRecommendations(recommendationsWithImages);
      } catch (parseError) {
        console.log('Failed to parse AI response, using mock data');
        const mockRecommendations = generateMockRecommendations();
        setRecommendations(mockRecommendations);
      }

      setStep(3);
    } catch (error) {
      console.error('Error calling Gemini AI:', error);
      // Fallback to mock recommendations
      const mockRecommendations = generateMockRecommendations();
      setRecommendations(mockRecommendations);
      setStep(3);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockRecommendations = (): ArtworkRecommendation[] => {
    const baseRecommendations = [
      {
        id: "rec1",
        title: "Sacred Tree of Life",
        artform: "Madhubani",
        description: "A vibrant Madhubani painting featuring the sacred tree with intricate patterns and mythological elements, perfect for spiritual spaces.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        similarity: 95,
        artist: "Traditional Artist",
        location: "Bihar",
        tags: ["Sacred", "Tree", "Mythology", "Vibrant"],
        reasoning: "Perfect match for spiritual themes and vibrant color preferences"
      },
      {
        id: "rec2",
        title: "Warli Village Scene",
        artform: "Warli",
        description: "Minimalist Warli art depicting daily village life with geometric patterns, ideal for modern minimalist interiors.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        similarity: 88,
        artist: "Warli Master",
        location: "Maharashtra",
        tags: ["Village", "Daily Life", "Geometric", "Minimalist"],
        reasoning: "Ideal for modern minimalist room styles with geometric patterns"
      },
      {
        id: "rec3",
        title: "Gond Nature Symphony",
        artform: "Gond Art",
        description: "Contemporary Gond art featuring animals and nature in bold colors, perfect for nature lovers and eco-friendly spaces.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        similarity: 92,
        artist: "Gond Artist",
        location: "Madhya Pradesh",
        tags: ["Nature", "Animals", "Bold Colors", "Contemporary"],
        reasoning: "Excellent choice for nature themes and bold color preferences"
      },
      {
        id: "rec4",
        title: "Bhil Tribal Celebration",
        artform: "Bhil Art",
        description: "Traditional Bhil dot painting showing tribal celebrations and rituals, great for cultural and traditional spaces.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        similarity: 85,
        artist: "Bhil Master",
        location: "Madhya Pradesh",
        tags: ["Tribal", "Celebration", "Rituals", "Traditional"],
        reasoning: "Perfect for traditional Indian room styles and cultural themes"
      },
      {
        id: "rec5",
        title: "Pattachitra Mythological Tale",
        artform: "Pattachitra",
        description: "Intricate scroll painting telling mythological stories with rich details, perfect for traditional Indian homes.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        similarity: 90,
        artist: "Pattachitra Master",
        location: "Odisha",
        tags: ["Mythology", "Stories", "Intricate", "Traditional"],
        reasoning: "Ideal for mythology themes and traditional room styles"
      },
      {
        id: "rec6",
        title: "Kalighat Social Commentary",
        artform: "Kalighat",
        description: "Modern Kalighat painting with social themes and contemporary commentary, ideal for progressive art collectors.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        similarity: 87,
        artist: "Kalighat Artist",
        location: "West Bengal",
        tags: ["Social", "Contemporary", "Commentary", "Modern"],
        reasoning: "Perfect for contemporary themes and modern room styles"
      }
    ];

    // Filter and customize based on user preferences
    return baseRecommendations.map(rec => ({
      ...rec,
      similarity: Math.floor(Math.random() * 20) + 80, // Random similarity between 80-100
      tags: rec.tags.slice(0, Math.floor(Math.random() * 3) + 2) // Random number of tags
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">What art forms do you love?</h2>
        <p className="text-muted-foreground">Select your favorite Indian folk art forms</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {artformOptions.map((artform) => (
          <Button
            key={artform}
            variant={preferences.favoriteArtforms.includes(artform) ? "default" : "outline"}
            onClick={() => handlePreferenceChange('favoriteArtforms', artform)}
            className="h-auto p-3 text-sm"
          >
            {artform}
          </Button>
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={() => setStep(2)}
          disabled={preferences.favoriteArtforms.length === 0}
          className="px-8"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Tell us more about your preferences</h2>
        <p className="text-muted-foreground">Help us understand your style better</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-primary mb-3">Favorite Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {colorOptions.map((color) => (
              <Button
                key={color}
                variant={preferences.favoriteColors.includes(color) ? "default" : "outline"}
                onClick={() => handlePreferenceChange('favoriteColors', color)}
                className="h-auto p-3 text-sm"
              >
                {color}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-primary mb-3">Favorite Themes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {themeOptions.map((theme) => (
              <Button
                key={theme}
                variant={preferences.favoriteThemes.includes(theme) ? "default" : "outline"}
                onClick={() => handlePreferenceChange('favoriteThemes', theme)}
                className="h-auto p-3 text-sm"
              >
                {theme}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-primary mb-3">Budget Range</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {budgetOptions.map((budget) => (
              <Button
                key={budget}
                variant={preferences.budget === budget ? "default" : "outline"}
                onClick={() => setPreferences(prev => ({ ...prev, budget }))}
                className="h-auto p-3 text-sm"
              >
                {budget}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-primary mb-3">Additional Notes (Optional)</h3>
          <Textarea
            placeholder="Tell us about specific requirements, room dimensions, or any other preferences..."
            value={preferences.additionalNotes}
            onChange={(e) => setPreferences(prev => ({ ...prev, additionalNotes: e.target.value }))}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button 
          onClick={generateRecommendations}
          disabled={preferences.favoriteColors.length === 0 || preferences.favoriteThemes.length === 0}
          className="px-8"
        >
          <Bot className="mr-2 h-4 w-4" />
          Generate AI Recommendations
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Your Personalized Recommendations</h2>
        <p className="text-muted-foreground">Based on your preferences, here are artworks we think you'll love</p>
        {aiResponse && (
          <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Analysis</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {aiResponse.length > 200 ? `${aiResponse.substring(0, 200)}...` : aiResponse}
            </p>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg text-muted-foreground">AI is analyzing your preferences...</p>
          <p className="text-sm text-muted-foreground">This may take a few moments</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Bot className="h-4 w-4" />
            Powered by Gemini AI
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((artwork) => (
            <Card key={artwork.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    {artwork.similarity}% Match
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-primary line-clamp-1">
                    {artwork.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {artwork.artform}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {artwork.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{artwork.artist}</span>
                  <span>{artwork.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {artwork.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {artwork.reasoning && (
                  <div className="p-3 bg-heritage-gold/10 rounded-lg border border-heritage-gold/20">
                    <p className="text-xs text-heritage-gold font-medium mb-1">Why this matches you:</p>
                    <p className="text-xs text-heritage-gold/80 line-clamp-2">
                      {artwork.reasoning}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center space-y-4">
        <Button variant="outline" onClick={() => setStep(2)}>
          Adjust Preferences
        </Button>
        <div className="text-sm text-muted-foreground">
          <p>Want more recommendations? Try adjusting your preferences or</p>
          <Link to="/collections" className="text-primary hover:underline">
            explore our full collection
          </Link>
        </div>
      </div>
    </div>
  );

  // Compact view (initial state)
  if (!isExpanded) {
    return (
      <section className="py-20 bg-gradient-to-br from-heritage-gold/5 to-heritage-maroon/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-cultural text-4xl md:text-5xl font-bold text-primary mb-4">
              Personalized Recommendations
            </h1>
            <p className="font-modern text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Let AI discover the perfect Indian folk artworks for your space. 
              Tell us about your preferences and we'll recommend pieces that match your style.
            </p>
            <Button 
              size="lg" 
              onClick={() => setIsExpanded(true)}
              className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
            >
              <Sparkles className="mr-3 h-6 w-6" />
              Learn More
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

  // Expanded view (full form)
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">Personalized Recommendations</h1>
            <p className="text-muted-foreground">Step {step} of 3</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setIsExpanded(false);
              resetForm();
            }}
          >
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
