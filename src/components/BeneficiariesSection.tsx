import { useState } from "react";
import BeneficiaryCard from "./BeneficiaryCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp } from "lucide-react";
import girl from "@/assets/girl.webp";
import oldman from "@/assets/oldman.jpg";
import woman1 from "@/assets/woman1.avif";
import mary from "@/assets/mary.jpg";
import peter from "@/assets/peter.jpeg";
import Rebecca from "@/assets/Rebecca.jpg";
import Samuel from "@/assets/Samuel.jpg";
import Faith from "@/assets/Faith.jpg";
import Daniel from "@/assets/Daniel.jpeg";

const allBeneficiaries = [
  {
    id: "1",
    name: "Amina Wanjiku",
    age: 32,
    location: "Turkana County, Kenya",
    story: "Amina, a mother of three from Turkana County, suffered severe injuries during tribal conflicts. She needs urgent medical treatment for her broken leg and ongoing physiotherapy. As a widow, she has no means to afford the specialized care required.",
    image: woman1,
    raised: 2750,
    goal: 4000,
    donors: 243,
    urgency: "high" as const
  },
  {
    id: "2", 
    name: "Joseph Kipkoech",
    age: 58,
    location: "Baringo County, Kenya",
    story: "Joseph, a respected elder from Baringo County, lost his livestock and home during recent floods. This grandfather of twelve has spent his life as a community mediator and needs help rebuilding his life and supporting his extended family.",
    image: oldman,
    raised: 1300,
    goal: 3700,
    donors: 156,
    urgency: "medium" as const
  },
  {
    id: "3",
    name: "Grace Achieng",
    age: 14,
    location: "Siaya County, Kenya",
    story: "Grace from Siaya County is a brilliant student who lost both parents to illness. She needs support for school fees, uniforms, and books to continue her education. Her dream is to become a doctor and serve her community.",
    image: girl,
    raised: 780,
    goal: 2500,
    donors: 89,
    urgency: "low" as const
  },
  {
    id: "4",
    name: "Peter Mutua",
    age: 28,
    location: "Machakos County, Kenya",
    story: "Peter, a young farmer from Machakos, lost his entire crop to drought. He needs support to restart his farming business and provide for his pregnant wife and two young children. His determination to rebuild is inspiring.",
    image: peter, // Using available image
    raised: 950,
    goal: 3200,
    donors: 67,
    urgency: "high" as const
  },
  {
    id: "5",
    name: "Mary Nyong'o",
    age: 45,
    location: "Kisumu County, Kenya",
    story: "Mary, a single mother of four, runs a small fish business at Lake Victoria. Recent economic challenges have made it difficult for her to maintain her business and pay school fees for her children.",
    image: mary, // Using available image
    raised: 1850,
    goal: 2800,
    donors: 134,
    urgency: "medium" as const
  },
  {
    id: "6",
    name: "Samuel Kiptoo",
    age: 19,
    location: "Uasin Gishu County, Kenya",
    story: "Samuel is a talented young athlete who dreams of representing Kenya in international competitions. He needs support for training equipment, coaching, and travel expenses to competitions.",
    image: Samuel, // Using available image
    raised: 650,
    goal: 5000,
    donors: 45,
    urgency: "low" as const
  },
  {
    id: "7",
    name: "Faith Wangari",
    age: 26,
    location: "Nyeri County, Kenya",
    story: "Faith, a talented seamstress, lost her sewing machine and shop in a fire. She needs help rebuilding her tailoring business to support her elderly parents and continue serving her community with affordable clothing alterations.",
    image: Faith, // Using available image
    raised: 1200,
    goal: 2200,
    donors: 89,
    urgency: "high" as const
  },
  {
    id: "8",
    name: "Daniel Ochieng",
    age: 52,
    location: "Homa Bay County, Kenya",
    story: "Daniel, a fisherman from Lake Victoria, needs a new fishing boat after his old one was damaged in a storm. His livelihood depends on fishing, and he supports a family of eight with his daily catch.",
    image: Daniel, // Using available image
    raised: 2100,
    goal: 4500,
    donors: 178,
    urgency: "medium" as const
  },
  {
    id: "9",
    name: "Rebecca Chelimo",
    age: 16,
    location: "Nandi County, Kenya",
    story: "Rebecca is an exceptional student who scored top marks in her primary education. She needs support for secondary school fees and supplies to continue her education and achieve her dream of becoming an engineer.",
    image: Rebecca, // Using available image
    raised: 450,
    goal: 1800,
    donors: 32,
    urgency: "low" as const
  }
];

const BeneficiariesSection = () => {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 3;
  
  const displayedBeneficiaries = showAll 
    ? allBeneficiaries 
    : allBeneficiaries.slice(0, initialCount);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="stories" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories of Hope
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every person has a story. Every story deserves to be heard. 
            Here are some of the amazing individuals you can help today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedBeneficiaries.map((beneficiary) => (
            <BeneficiaryCard key={beneficiary.id} {...beneficiary} />
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleToggle}
            className="transition-all duration-200 hover:scale-105"
          >
            {showAll ? (
              <>
                Show Less Stories
                <ArrowUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                View More Stories ({allBeneficiaries.length - initialCount} more)
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BeneficiariesSection;