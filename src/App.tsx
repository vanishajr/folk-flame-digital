import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Index from "./pages/Index";
import ARViewer from "./pages/ARViewer";
import AllCollections from "./pages/AllCollections";
import CollectionDetail from "./pages/CollectionDetail";
import AllArtists from "./pages/AllArtists";
import ArtistProfile from "./pages/ArtistProfile";
import Children from "./pages/Children";
import Marketplace from "./pages/Marketplace";
import YourArtworks from "./pages/YourArtworks";
import ExportCompliance from "./components/ExportCompliance";
import ArtistBadging from "./components/ArtistBadging";
import PaymentPage from "./components/marketplace/PaymentPage";
import NotFound from "./pages/NotFound";
import AuthDemo from "./pages/AuthDemo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <SearchProvider>
          <TooltipProvider>
            <Toaster />
            <HotToaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ar-viewer" element={<ARViewer />} />
                <Route path="/collections" element={<AllCollections />} />
                <Route path="/collections/:id" element={<CollectionDetail />} />
                <Route path="/artists" element={<AllArtists />} />
                <Route path="/artists/:id" element={<ArtistProfile />} />
                <Route path="/children" element={<Children />} />
                <Route path="/artworks" element={<YourArtworks />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/export-compliance" element={<ExportCompliance />} />
                <Route path="/artist-badging" element={<ArtistBadging />} />
                <Route path="/auth-demo" element={<AuthDemo />} />
                <Route path="/payment" element={<PaymentPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SearchProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
