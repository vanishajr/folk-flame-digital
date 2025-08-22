import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Explore",
      links: [
        "Art Collections",
        "Featured Artists",
        "Museum Tours",
        "Cultural Map",
        "AR Experience"
      ]
    },
    {
      title: "Learn",
      links: [
        "Children's Corner",
        "Art Tutorials",
        "Cultural Stories",
        "Artist Interviews",
        "Educational Resources"
      ]
    },
    {
      title: "Shop",
      links: [
        "Original Artworks",
        "Prints & Posters",
        "Craft Supplies",
        "Gift Cards",
        "Artist Merchandise"
      ]
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact Us",
        "Community Guidelines",
        "Privacy Policy",
        "Terms of Service"
      ]
    }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h3 className="font-cultural text-2xl font-semibold mb-4">
            Stay Connected with Cultural Heritage
          </h3>
          <p className="font-modern text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Get the latest updates on new artworks, artist features, and cultural events. 
            Join our community of art enthusiasts and heritage preservers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
            <Button className="bg-heritage-gold text-heritage-brown hover:bg-heritage-gold/90 font-semibold px-6">
              Subscribe
            </Button>
          </div>
        </div>

        <Separator className="mb-12 bg-primary-foreground/20" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-heritage-gold rounded-lg flex items-center justify-center">
                <span className="text-heritage-brown font-bold text-lg">H</span>
              </div>
              <span className="font-cultural text-xl font-semibold">
                Heritage Arts
              </span>
            </div>
            <p className="font-modern text-sm text-primary-foreground/80 mb-6 leading-relaxed">
              Preserving and promoting traditional Indian folk artforms through 
              digital innovation and community engagement.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="ghost" className="h-9 w-9 p-0 hover:bg-primary-foreground/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-9 w-9 p-0 hover:bg-primary-foreground/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-9 w-9 p-0 hover:bg-primary-foreground/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-9 w-9 p-0 hover:bg-primary-foreground/10">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-cultural text-lg font-semibold mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Button 
                      variant="ghost" 
                      className="h-auto p-0 font-normal text-primary-foreground/80 hover:text-primary-foreground hover:bg-transparent justify-start text-sm"
                    >
                      {link}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-heritage-gold" />
            <div>
              <p className="font-medium">Email Us</p>
              <p className="text-sm text-primary-foreground/80">hello@heritagearts.in</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-heritage-gold" />
            <div>
              <p className="font-medium">Call Us</p>
              <p className="text-sm text-primary-foreground/80">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-heritage-gold" />
            <div>
              <p className="font-medium">Visit Us</p>
              <p className="text-sm text-primary-foreground/80">Mumbai, Maharashtra</p>
            </div>
          </div>
        </div>

        <Separator className="mb-8 bg-primary-foreground/20" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/80">
          <div className="flex items-center space-x-1 mb-4 md:mb-0">
            <p>© 2024 Heritage Arts & Culture. Made with</p>
            <Heart className="h-4 w-4 text-heritage-gold fill-current" />
            <p>for preserving our cultural heritage.</p>
          </div>
          <div className="flex space-x-6">
            <Button variant="ghost" className="h-auto p-0 text-sm hover:text-primary-foreground">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="h-auto p-0 text-sm hover:text-primary-foreground">
              Terms of Service
            </Button>
            <Button variant="ghost" className="h-auto p-0 text-sm hover:text-primary-foreground">
              Accessibility
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;