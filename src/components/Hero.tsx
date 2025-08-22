import { Button } from "@/components/ui/button";
import { Play, Search, Volume2 } from "lucide-react";
import heroImage from "@/assets/hero-warli-art.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-primary-foreground px-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Where Heritage Lives
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Discover the timeless beauty of traditional Indian folk art - from ancient Warli paintings to vibrant Madhubani masterpieces
        </p>
        
        {/* Featured Cards Grid */}
        <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto mt-12">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg p-6 text-card-foreground hover:bg-card transition-colors group cursor-pointer">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold mb-2">Warli Art</h3>
            <p className="text-sm text-muted-foreground mb-4">Traditional tribal paintings</p>
            <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
              <Play className="h-4 w-4 mr-2" />
              Explore
            </Button>
          </div>

          <div className="bg-card/90 backdrop-blur-sm rounded-lg p-6 text-card-foreground hover:bg-card transition-colors group cursor-pointer">
            <div className="text-3xl mb-3">🐟</div>
            <h3 className="font-semibold mb-2">Madhubani</h3>
            <p className="text-sm text-muted-foreground mb-4">Bihar's colorful storytelling</p>
            <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
              <Volume2 className="h-4 w-4 mr-2" />
              Listen
            </Button>
          </div>

          <div className="bg-card/90 backdrop-blur-sm rounded-lg p-6 text-card-foreground hover:bg-card transition-colors group cursor-pointer">
            <div className="text-3xl mb-3">🐎</div>
            <h3 className="font-semibold mb-2">Pithora</h3>
            <p className="text-sm text-muted-foreground mb-4">Gujarat's ceremonial art</p>
            <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
              <Search className="h-4 w-4 mr-2" />
              Discover
            </Button>
          </div>

          <div className="bg-card/90 backdrop-blur-sm rounded-lg p-6 text-card-foreground hover:bg-card transition-colors group cursor-pointer">
            <div className="text-3xl mb-3">🏛️</div>
            <h3 className="font-semibold mb-2">Virtual Tours</h3>
            <p className="text-sm text-muted-foreground mb-4">360° museum experiences</p>
            <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
              <Play className="h-4 w-4 mr-2" />
              Enter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;