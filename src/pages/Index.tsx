import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import FeaturedArtists from "@/components/FeaturedArtists";
import FeatureHighlights from "@/components/FeatureHighlights";

import ARExperience from "@/components/ARExperience";
import PersonalizedRecommendations from "@/components/PersonalizedRecommendations";

import CulturalMap from "@/components/CulturalMap";
import SearchResults from "@/components/SearchResults";

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

        <ARExperience />
        <PersonalizedRecommendations />

        <CulturalMap />
        <SearchResults />

      </main>
      <Footer />
    </div>
  );
};

export default Index;
