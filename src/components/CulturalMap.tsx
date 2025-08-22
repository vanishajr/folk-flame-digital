import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Globe, Users, Building2 } from "lucide-react";

const CulturalMap = () => {
  return (
    <section id="cultural-map" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-cultural text-4xl md:text-5xl font-bold text-primary mb-4">
            Cultural Heritage Map
          </h2>
          <p className="font-modern text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore museums, galleries, cultural centers, and traditional art hubs across India. 
            Discover the rich tapestry of our cultural heritage through an interactive map experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-border/50 shadow-warm">
              <CardHeader className="bg-gradient-to-r from-heritage-maroon/5 to-heritage-brown/5">
                <CardTitle className="flex items-center gap-3 text-primary">
                  <MapPin className="h-6 w-6 text-heritage-gold" />
                  Interactive Cultural Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <iframe 
                    src="https://www.google.com/maps/d/embed?mid=1gO4tGAQZ3Uvz_alVL7ggE_Vunzp6gP0&ehbc=2E312F" 
                    width="100%" 
                    height="480"
                    className="w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <Card className="border-border/50 shadow-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Globe className="h-5 w-5 text-heritage-gold" />
                  Map Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-heritage-gold rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-primary">Museums & Galleries</h4>
                    <p className="text-sm text-muted-foreground">Discover traditional art collections and exhibitions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-heritage-maroon rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-primary">Cultural Centers</h4>
                    <p className="text-sm text-muted-foreground">Visit hubs of traditional art and craft</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-heritage-brown rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-primary">Artist Villages</h4>
                    <p className="text-sm text-muted-foreground">Connect with traditional artisans</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-heritage-beige rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-primary">Heritage Sites</h4>
                    <p className="text-sm text-muted-foreground">Explore historical art locations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Users className="h-5 w-5 text-heritage-gold" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Locations</span>
                  <span className="font-semibold text-primary">150+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Art Forms</span>
                  <span className="font-semibold text-primary">25+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">States Covered</span>
                  <span className="font-semibold text-primary">18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Artists</span>
                  <span className="font-semibold text-primary">500+</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Building2 className="h-5 w-5 text-heritage-gold" />
                  Featured Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-heritage-cream/50 rounded-lg">
                  <h4 className="font-semibold text-primary text-sm">National Museum, Delhi</h4>
                  <p className="text-xs text-muted-foreground">Extensive collection of traditional Indian art</p>
                </div>
                <div className="p-3 bg-heritage-cream/50 rounded-lg">
                  <h4 className="font-semibold text-primary text-sm">Chitrakala Parishath, Bangalore</h4>
                  <p className="text-xs text-muted-foreground">Contemporary and traditional art exhibitions</p>
                </div>
                <div className="p-3 bg-heritage-cream/50 rounded-lg">
                  <h4 className="font-semibold text-primary text-sm">Victoria Memorial, Kolkata</h4>
                  <p className="text-xs text-muted-foreground">Colonial and Indian art heritage</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalMap;
