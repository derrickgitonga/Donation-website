import { Button } from "@/components/ui/button";
import { Heart, Users, Globe } from "lucide-react";
import heroImage from "@/assets/hero-donation.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Help Change a Life Today
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join our compassionate community in supporting those who need it most. 
              Every donation creates ripples of hope and transforms lives forever.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="animate-float"
              onClick={() => {
                document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Heart className="mr-2 h-5 w-5" />
              Start Helping Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-white border-white hover:bg-white/10"
              onClick={() => {
                document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-accent-light" />
              </div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-white/80">Lives Changed</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Heart className="h-12 w-12 text-accent-light" />
              </div>
              <div className="text-3xl font-bold text-white">$250K+</div>
              <div className="text-white/80">Raised Together</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Globe className="h-12 w-12 text-accent-light" />
              </div>
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-white/80">Kenyan Counties Reached</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;