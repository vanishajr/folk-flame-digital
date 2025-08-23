import { useState } from "react";

import { Menu, X, Mic, Search, User, ShoppingBag, Map, Camera, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useSearch } from "@/contexts/SearchContext";
import AuthModal from "@/components/auth/AuthModal";
import VoiceSearchModal from "@/components/VoiceSearchModal";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup" | "profile">("login");
  const { currentUser, userProfile } = useAuth();
  const { performSearch } = useSearch();

  const [showAuthModal, setShowAuthModal] = useState(false);


  const navItems = [
    { name: "Explore", href: "/", isLink: false },
    { name: "Learn", href: "/children", isLink: true },
    { name: "Marketplace", href: "#store", isLink: false },

  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-cultural rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">H</span>
              </div>
              <span className="font-cultural text-xl font-semibold text-primary">
                Heritage Arts
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) =>
                item.isLink ? (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50"
                    asChild
                  >
                    <Link to={item.href}>{item.name}</Link>
                  </Button>
                ) : (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50"
                    asChild
                  >
                    <a href={item.href}>{item.name}</a>
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search artforms, artists..."
                className="pl-10 w-full bg-muted/50 border-border focus:bg-background"
              />
            </div>
          </div>

          {/* Right Side Icons and Actions */}
          <div className="flex items-center space-x-2">
            {/* Voice Search Button */}
            <Button
              size="sm"
              variant="outline"
              className={`gap-2 hidden sm:flex ${isMenuOpen ? 'hidden' : ''}`}
              onClick={() => setIsVoiceSearchOpen(true)}
            >
              <Mic className="h-4 w-4" />
              <span className="hidden lg:inline">Voice</span>
            </Button>

            {/* Action Icons */}
            <Button size="sm" variant="outline" className={`hidden sm:flex ${isMenuOpen ? 'hidden' : ''}`}>
              <Map className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className={`hidden sm:flex ${isMenuOpen ? 'hidden' : ''}`}>
              <Camera className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className={`hidden sm:flex ${isMenuOpen ? 'hidden' : ''}`}>
              <ShoppingBag className="h-4 w-4" />
            </Button>


            {/* User Authentication */}

            {currentUser ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setAuthView("profile");
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center space-x-2"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={userProfile?.photoURL}
                    alt={userProfile?.displayName || "User"}
                  />
                  <AvatarFallback className="text-xs">
                    {userProfile?.displayName
                      ? userProfile.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:inline">{userProfile?.displayName || "User"}</span>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setAuthView("login");
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />

                <span className="hidden lg:inline">Sign In</span>

              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {/* Mobile Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 bg-muted/50" />
              </div>

              {/* Navigation Links */}
              {navItems.map((item) =>
                item.isLink ? (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="justify-start text-sm font-medium"
                    asChild
                  >
                    <Link to={item.href} onClick={() => setIsMenuOpen(false)}>
                      {item.name}
                    </Link>
                  </Button>
                ) : (
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
                )
              )}

              {/* Mobile Action Buttons */}
              <div className="pt-2 mt-2 border-t border-border">
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
