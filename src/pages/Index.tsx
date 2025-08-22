import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import FeaturedArtists from "@/components/FeaturedArtists";
import FeatureHighlights from "@/components/FeatureHighlights";
import CulturalMap from "@/components/CulturalMap";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <FeaturedCollections />
        <FeaturedArtists />
        <FeatureHighlights />
        <CulturalMap />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
