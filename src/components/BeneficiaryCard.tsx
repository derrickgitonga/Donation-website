import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, MapPin } from "lucide-react";

interface BeneficiaryCardProps {
  id: string;
  name: string;
  age: number;
  location: string;
  story: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
  urgency?: "high" | "medium" | "low";
}

const BeneficiaryCard = ({ 
  name, 
  age, 
  location, 
  story, 
  image, 
  raised, 
  goal, 
  donors,
  urgency = "medium"
}: BeneficiaryCardProps) => {
  const progressPercentage = (raised / goal) * 100;
  
  const urgencyStyles = {
    high: "border-l-4 border-l-destructive",
    medium: "border-l-4 border-l-secondary",
    low: "border-l-4 border-l-accent"
  };

  return (
    <Card className={`bg-gradient-card shadow-card hover:shadow-donate transition-all duration-300 hover:scale-105 ${urgencyStyles[urgency]}`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <img 
            src={image} 
            alt={`${name}'s photo`}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground">{name}, {age}</h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          {urgency === "high" && (
            <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-medium">
              Urgent
            </span>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6">
          {story}
        </p>

        <div className="space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${raised.toLocaleString()} raised</span>
            <span>${goal.toLocaleString()} goal</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-accent font-medium">{progressPercentage.toFixed(0)}% funded</span>
            <span className="text-muted-foreground">{donors} donors</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button variant="donate" className="w-full" size="lg"
        onClick={() => {
          document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
        }}
        >
          <Heart className="mr-2 h-4 w-4"  />
          Donate to {name}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BeneficiaryCard;