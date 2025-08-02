import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Shield, Calendar } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Our Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Born from crisis, strengthened by compassion - helping Kenyans since 2007
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Our Beginning (2007)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform was founded in late 2007 during one of Kenya's most challenging periods - 
                  the post-election violence. What began as an emergency response to help cover hospital 
                  bills for the injured and assist in relocating people from danger zones to safer places 
                  has grown into a comprehensive support network for vulnerable Kenyans.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Heart className="mr-2 h-5 w-5 text-primary" />
                  Our Evolution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Over the years, our mission expanded beyond emergency relief. We began supporting 
                  vulnerable individuals across Kenya with medical bills, education costs, food security, 
                  and shelter needs. During the COVID-19 pandemic, our platform played a crucial role 
                  in helping Kenyans navigate those unprecedented difficult times.
                 </p>
                 <p>
                  Today, we continue to adapt and respond to the evolving needs of our communities, 
                  ensuring that no one is left behind in times of crisis.
                  We managed to help the victims of protest during the 2024 and 2025 GENZ protests in Kenya,
                   providing medical assistance and support to those affected.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Our Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Lives Changed</div>
                  </div>
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Counties Reached</div>
                  </div>
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">Families Helped</div>
                  </div>
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">17</div>
                    <div className="text-sm text-muted-foreground">Years of Service</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Our Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We remain committed to transparency, accountability, and direct impact. Every donation 
                  goes directly to those in need, with regular updates provided to our donors. Our focus 
                  remains on empowering Kenyan communities, especially in marginalized areas like Turkana 
                  County and other vulnerable regions across the country.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;