import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BeneficiariesSection from "@/components/BeneficiariesSection";
import DonationForm from "@/components/DonationForm";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <BeneficiariesSection />
      <DonationForm />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
