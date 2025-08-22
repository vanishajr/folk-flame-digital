import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Heritage Arts & Culture</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Preserving and promoting traditional Indian folk art forms through digital innovation. 
              Connecting artists with global audiences while sustaining cultural heritage.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Art Collections</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Master Artists</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Virtual Tours</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">AR Experiences</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Children's Learning</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Art Marketplace</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Merchandise Store</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Cultural Maps</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Voice Navigation</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Personalized Recommendations</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Get updates on new collections, artist features, and cultural events.
            </p>
            <div className="space-y-2">
              <Input 
                placeholder="Your email address" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button 
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20 mb-8" />

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-primary-foreground/80" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-primary-foreground/80">contact@heritagearts.in</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-primary-foreground/80" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-primary-foreground/80">+91 12345 67890</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-primary-foreground/80" />
            <div>
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-primary-foreground/80">Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20 mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-primary-foreground/80 mb-4 md:mb-0">
            © 2024 Heritage Arts & Culture. All rights reserved.
          </div>
          <div className="flex items-center space-x-1 text-sm text-primary-foreground/80">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>for preserving cultural heritage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;