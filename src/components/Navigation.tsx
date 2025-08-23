import { useState } from "react";
import {
  Menu,
  X,
  Mic,
  Search,
  User,
  ShoppingBag,
  Map,
  Camera,
  LogIn,
  LogOut,
  Globe,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useSearch } from "@/contexts/SearchContext";
import { useLanguage } from "@/contexts/LanguageContext";
import AuthModal from "@/components/auth/AuthModal";
import VoiceSearchModal from "@/components/VoiceSearchModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup" | "profile">(
    "login"
  );

  const { currentUser, userProfile, logout } = useAuth();
  const { performSearch } = useSearch();
  const { language, setLanguage, t, currentLanguage } = useLanguage();

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
    { code: "ml", name: "Malayalam", native: "മലയാളം" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const navItems = [
    { name: t("nav.explore"), href: "#explore", isLink: false },
    { name: t("nav.museum_tours"), href: "#tours", isLink: false },
    { name: t("nav.children"), href: "/children", isLink: true },
    { name: "Marketplace", href: "/marketplace", isLink: false },
    { name: t("nav.ar_experience"), href: "#ar", isLink: false },
    { name: "Export Guide", href: "/export-compliance", isLink: true },
    { name: "Artist Badges", href: "/artist-badging", isLink: true },
  ];

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setLanguage(lang.code as any);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-cultural rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">H</span>
              </div>
              <span className="font-cultural text-xl font-semibold text-primary">
                Heritage Arts
              </span>
            </Link>

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

          {/* Search + Language + Icons */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("nav.search_placeholder")}
                className="pl-10 w-full bg-muted/50 border-border focus:bg-background"
              />
            </div>

            {/* Language Selector */}
            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              >
                <Globe className="h-4 w-4" />
                {currentLanguage.native}
                <ChevronDown className="h-3 w-3" />
              </Button>

              {isLanguageDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary/50 transition-colors ${
                          language === lang.code
                            ? "bg-secondary text-primary"
                            : "text-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{lang.native}</span>
                          <span className="text-xs text-muted-foreground">
                            {lang.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <Button
              size="sm"
              variant="outline"
              className="gap-2 hidden sm:flex"
              onClick={() => setIsVoiceSearchOpen(true)}
            >
              <Mic className="h-4 w-4" />
              <span className="hidden lg:inline">{t("nav.voice")}</span>
            </Button>

            <Button size="sm" variant="outline" className="hidden sm:flex">
              <Map className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="hidden sm:flex">
              <Camera className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="hidden sm:flex">
              <ShoppingBag className="h-4 w-4" />
            </Button>

            {/* User Authentication */}
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={userProfile?.photoURL}
                        alt={userProfile?.displayName || t("nav.user")}
                      />
                      <AvatarFallback className="text-xs">
                        {userProfile?.displayName
                          ? userProfile.displayName.charAt(0).toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">
                      {userProfile?.displayName || t("nav.user")}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/artworks">
                      <User className="mr-2 h-4 w-4" />
                      Your Artworks
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            {/* Mobile menu content (search, links, language, actions) */}
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
