import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, Mic, User, Heart, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary">Heritage Arts & Culture</h1>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Home
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Explore
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Play
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Nearby
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Collections
            </Button>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center space-x-3">
            {isSearchActive ? (
              <div className="flex items-center space-x-2">
                <Input 
                  placeholder="Search traditional arts..." 
                  className="w-64"
                  onBlur={() => setIsSearchActive(false)}
                  autoFocus
                />
                <Button variant="ghost" size="sm">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsSearchActive(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;