import { Heart, Mail, Phone, MapPin,  } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-primary-glow" />
              <span className="text-2xl font-bold">HeartReach</span>
            </div>
            <p className="text-background/80 text-lg leading-relaxed max-w-md">
              Connecting hearts across the globe to create lasting change. 
              Every donation is a step toward a more compassionate world.
            </p>
           
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#stories" className="text-background/80 hover:text-background transition-colors">Stories</a></li>
              <li><a href="#about" className="text-background/80 hover:text-background transition-colors">About Us</a></li>
              <li><a href="#success" className="text-background/80 hover:text-background transition-colors">Success Stories</a></li>
              <li><a href="#transparency" className="text-background/80 hover:text-background transition-colors">Transparency</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-primary-glow" />
                <span className="text-background/80">help@heartreach.org</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-primary-glow" />
                <span className="text-background/80">Global Operations</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60">
            © 2024 HeartReach. All rights reserved. | 
            <span className="hover:text-background cursor-pointer"> Privacy Policy</span> | 
            <span className="hover:text-background cursor-pointer"> Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;