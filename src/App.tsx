import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Children from "./pages/Children";
import Marketplace from "./pages/Marketplace";
import YourArtworks from "./pages/YourArtworks";

import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { Toaster as HotToaster } from "react-hot-toast";

import Index from "./pages/Index";
import ARViewer from "./pages/ARViewer";
import AllCollections from "./pages/AllCollections";
import CollectionDetail from "./pages/CollectionDetail";
import AllArtists from "./pages/AllArtists";
import ArtistProfile from "./pages/ArtistProfile";

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


    <AuthProvider>
      <SearchProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HotToaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ar-viewer" element={<ARViewer />} />

              <Route path="/collections" element={<AllCollections />} />
              <Route path="/collections/:id" element={<CollectionDetail />} />
              <Route path="/artists" element={<AllArtists />} />
              <Route path="/artists/:id" element={<ArtistProfile />} />

              <Route path="/auth-demo" element={<AuthDemo />} />
              <Route path="/children" element={<Children />} />
              <Route path="/artworks" element={<YourArtworks />} />
              <Route path="/marketplace" element={<Marketplace />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SearchProvider>
    </AuthProvider>


  </QueryClientProvider>
);

export default App;
