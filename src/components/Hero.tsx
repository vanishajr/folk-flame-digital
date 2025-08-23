import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Mic, Map, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroWarliArt from "@/assets/hero-warli-art.jpg";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroWarliArt})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <h1 className="font-cultural text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          
          <p className="font-modern text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-heritage-gold text-heritage-brown hover:bg-heritage-gold/90 font-semibold px-8 py-6 text-lg shadow-glow-gold"
            >
              <Play className="mr-2 h-5 w-5" />
              {t('hero.cta_primary')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-6 text-lg"
            >
              {t('hero.cta_secondary')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" className="gap-2 bg-background/20 hover:bg-background/30 text-primary-foreground border-primary-foreground/20">
              <Mic className="h-4 w-4" />
              {t('nav.voice')} {t('common.search')}
            </Button>
            <Button variant="secondary" className="gap-2 bg-background/20 hover:bg-background/30 text-primary-foreground border-primary-foreground/20">
              <Map className="h-4 w-4" />
              {t('nav.museum_tours')}
            </Button>
            <Button variant="secondary" className="gap-2 bg-background/20 hover:bg-background/30 text-primary-foreground border-primary-foreground/20">
              <Camera className="h-4 w-4" />
              {t('nav.ar_experience')}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;