import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Camera, 
  Eye, 
  Download, 
  Share2, 
  Info, 
  Play, 
  Sparkles,
  Globe,
  Smartphone,
  Send,
  Mail,
  Phone,
  Loader2
} from "lucide-react";
import ModelViewer from "./ModelViewer";

const ARExperience = () => {
  const [selectedModel, setSelectedModel] = useState(0);
  const [showSendModal, setShowSendModal] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [contactType, setContactType] = useState("email");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Your actual .usdz files
  const arModels = [
    {
      id: 1,
      name: "Traditional Painting",
      description: "Beautiful 3D representation of traditional Indian artwork",
      category: "Traditional Art",
      region: "India",
      file: "/models/painting1.usdz",
      features: ["Interactive viewing", "Cultural significance", "360° rotation"],
      instructions: "Point your iPhone camera at any surface and tap to place the artwork"
    },
    {
      id: 2,
      name: "Madhubani Art",
      description: "Sacred 3D model of traditional Madhubani artwork with intricate patterns",
      category: "Madhubani",
      region: "Bihar",
      file: "/models/madhubani.usdz",
      features: ["Sacred geometry", "Pattern exploration", "Cultural heritage"],
      instructions: "Use AR to explore the sacred geometry and patterns in your space"
    }
  ];

  const handleARLaunch = (modelFile: string) => {
    // Create AR experience URL for iPhone
    const arUrl = `${window.location.origin}/ar-viewer?model=${encodeURIComponent(modelFile)}`;
    
    // For iPhone/iPad, open the AR viewer directly
    if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
      window.location.href = arUrl;
    } else {
      // For desktop, show instructions
      alert(`To view in AR:\n\n1. Open this website on your iPhone\n2. Go to: ${arUrl}\n3. Allow camera access when prompted\n4. Point at a flat surface\n5. Tap to place the 3D model`);
    }
  };

  const handleSendFile = async (modelFile: string) => {
    if (!contactInfo.trim()) {
      alert('Please enter your contact information');
      return;
    }

    setIsSending(true);
    
    // Simulate sending process
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setShowSendModal(false);
      setContactInfo("");
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSendSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <section id="ar" className="py-20 bg-gradient-to-br from-heritage-beige to-heritage-gold/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Camera className="h-12 w-12 text-heritage-maroon mr-4" />
            <h2 className="font-cultural text-4xl md:text-5xl font-bold text-primary">
              AR Art Experience
            </h2>
          </div>
          <p className="font-modern text-lg text-muted-foreground max-w-3xl mx-auto">
            Step into the world of traditional Indian art through augmented reality. 
            Explore 3D models, interact with cultural artifacts, and bring heritage to life in your space.
          </p>
        </div>

        {/* AR Launch Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-heritage-maroon to-heritage-brown text-primary-foreground overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <Sparkles className="h-16 w-16 text-heritage-gold mr-4" />
                  <div>
                    <h3 className="font-cultural text-3xl font-bold mb-2">
                      Ready to Experience AR?
                    </h3>
                    <p className="font-modern text-lg opacity-90">
                      Transform any surface into your personal art gallery
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center mb-6">
                  <Button 
                    size="lg" 
                    onClick={() => handleARLaunch(arModels[selectedModel].file)}
                    className="bg-heritage-gold text-heritage-brown hover:bg-heritage-gold/90 font-semibold px-8 py-4 text-lg"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    View AR on iPhone
                  </Button>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
                  <div className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-2" />
                    iPhone/iPad Required
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Safari Browser
                  </div>
                  <div className="flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    Camera Access
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        {sendSuccess && (
          <div className="fixed top-4 right-4 z-50">
            <Card className="bg-green-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  <span>3D model sent successfully!</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Send File Modal */}
        {showSendModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-md mx-4">
              <CardContent className="p-6">
                <h3 className="font-cultural text-xl font-bold text-primary mb-4 text-center">
                  Send 3D Model
                </h3>
                <p className="text-muted-foreground mb-4 text-center">
                  Enter your contact information to receive the 3D model file
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-type">Contact Method</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant={contactType === "email" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setContactType("email")}
                        className="flex-1"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button
                        variant={contactType === "phone" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setContactType("phone")}
                        className="flex-1"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Phone
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-info">
                      {contactType === "email" ? "Email Address" : "Phone Number"}
                    </Label>
                    <Input
                      id="contact-info"
                      type={contactType === "email" ? "email" : "tel"}
                      placeholder={contactType === "email" ? "your@email.com" : "+1234567890"}
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                {isSending && (
                  <div className="text-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-heritage-maroon" />
                    <p className="text-sm text-muted-foreground">
                      Sending 3D model... it might take a few moments
                    </p>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <Button 
                    onClick={() => handleSendFile(arModels[selectedModel].file)}
                    disabled={isSending || !contactInfo.trim()}
                    className="flex-1"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send File
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowSendModal(false)}
                    disabled={isSending}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 3D Models Gallery */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-cultural text-3xl font-bold text-primary mb-4">
              Explore 3D Cultural Models
            </h3>
            <p className="font-modern text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover traditional art forms in three dimensions. Each model tells a story 
              and represents centuries of cultural heritage.
            </p>
          </div>

          <Tabs value={selectedModel.toString()} onValueChange={(value) => setSelectedModel(parseInt(value))}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              {arModels.map((model, index) => (
                <TabsTrigger key={model.id} value={index.toString()} className="font-cultural">
                  {model.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {arModels.map((model, index) => (
              <TabsContent key={model.id} value={index.toString()}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 3D Model Viewer */}
                  <ModelViewer
                    modelPath={model.file}
                    modelName={model.name}
                    description={model.description}
                    onARLaunch={() => handleARLaunch(model.file)}
                  />

                  {/* Model Information */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-cultural text-2xl font-bold text-primary mb-2">
                        {model.name}
                      </h3>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className="bg-heritage-gold text-heritage-brown">
                          {model.category}
                        </Badge>
                        <Badge variant="outline" className="border-heritage-maroon text-heritage-maroon">
                          {model.region}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {model.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-cultural text-lg font-semibold text-primary mb-3">
                        Features
                      </h4>
                      <ul className="space-y-2">
                        {model.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-muted-foreground">
                            <Sparkles className="h-4 w-4 text-heritage-gold mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-cultural text-lg font-semibold text-primary mb-3">
                        How to Use AR
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {model.instructions}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={() => handleARLaunch(model.file)}
                        className="bg-heritage-maroon hover:bg-heritage-maroon/90 text-primary-foreground"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        View in AR
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setShowSendModal(true)}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send File
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* AR Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="w-16 h-16 bg-heritage-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-heritage-gold" />
            </div>
            <h4 className="font-cultural text-lg font-semibold text-primary mb-2">
              Interactive Viewing
            </h4>
            <p className="text-sm text-muted-foreground">
              Rotate, zoom, and explore 3D models from every angle
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-16 h-16 bg-heritage-maroon/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-8 w-8 text-heritage-maroon" />
            </div>
            <h4 className="font-cultural text-lg font-semibold text-primary mb-2">
              AR Placement
            </h4>
            <p className="text-sm text-muted-foreground">
              Place cultural artifacts in your real-world environment
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-16 h-16 bg-heritage-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-heritage-brown" />
            </div>
            <h4 className="font-cultural text-lg font-semibold text-primary mb-2">
              Cultural Context
            </h4>
            <p className="text-sm text-muted-foreground">
              Learn about the history and significance of each artwork
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ARExperience; 