import { useState } from "react";
import { Menu, X, Mic, Search, User, ShoppingBag, Map, Camera, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useSearch } from "@/contexts/SearchContext";
import AuthModal from "@/components/auth/AuthModal";
import VoiceSearchModal from "@/components/VoiceSearchModal";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup' | 'profile'>('login');
  const { currentUser, userProfile } = useAuth();
  const { performSearch } = useSearch();

  const navItems = [
    { name: "Explore", href: "#explore" },
    { name: "Collections", href: "#collections" },
    { name: "Artists", href: "#artists" },
    { name: "Museum Tours", href: "#tours" },
    { name: "Children", href: "#children" },
    { name: "Store", href: "#store" },
    { name: "AR Experience", href: "#ar" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-cultural rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <span className="font-cultural text-xl font-semibold text-primary">
              Heritage Arts
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50"
                asChild
              >
                <a href={item.href}>{item.name}</a>
              </Button>
            ))}
          </div>

          {/* Search and Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search artforms, artists..."
                className="pl-10 w-64 bg-muted/50 border-border focus:bg-background"
              />
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-2"
              onClick={() => setIsVoiceSearchOpen(true)}
            >
              <Mic className="h-4 w-4" />
              Voice
            </Button>
            <Button size="sm" variant="outline">
              <Map className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Camera className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <ShoppingBag className="h-4 w-4" />
            </Button>
            {currentUser ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setAuthView('profile');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center space-x-2"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={userProfile?.photoURL} alt={userProfile?.displayName || 'User'} />
                  <AvatarFallback className="text-xs">
                    {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{userProfile?.displayName || 'User'}</span>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setAuthView('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="justify-start text-sm font-medium"
                  asChild
                >
                  <a href={item.href} onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </a>
                </Button>
              ))}
              <div className="pt-2 mt-2 border-t border-border">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 bg-muted/50"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => setIsVoiceSearchOpen(true)}
                  >
                    <Mic className="h-4 w-4" />
                    Voice
                  </Button>
                  <Button size="sm" variant="outline">
                    <Map className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authView}
      />

      {/* Voice Search Modal */}
      <VoiceSearchModal
        isOpen={isVoiceSearchOpen}
        onClose={() => setIsVoiceSearchOpen(false)}
        onSearch={performSearch}
        isCulturalSearch={false}
      />
    </nav>
  );
};

export default Navigation;