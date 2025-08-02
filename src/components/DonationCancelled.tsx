import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, Heart, RefreshCw, Home, Mail, HelpCircle, ArrowRight, Clock } from "lucide-react";

interface DonationData {
  orderId?: string;
  chargeId?: string;
  amount: string;
  currency: string;
  purpose: string;
  email: string;
  timestamp: string;
}

interface CommonReason {
  icon: JSX.Element;
  title: string;
  description: string;
}

const DonationCancelled = () => {
  const [donation, setDonation] = useState<DonationData | null>(null);

  useEffect(() => {
    // Get donation info from localStorage if available
    const pendingDonation = localStorage.getItem('pendingDonation');
    if (pendingDonation) {
      try {
        const donationData: DonationData = JSON.parse(pendingDonation);
        setDonation(donationData);
        // Keep in localStorage in case they want to try again
      } catch (err) {
        console.error('Error parsing donation data:', err);
      }
    }
  }, []);

  const handleTryAgain = (): void => {
    // Redirect to donation form with preserved data
    const donationParams = donation 
      ? `?amount=${donation.amount}&currency=${donation.currency}&purpose=${encodeURIComponent(donation.purpose)}&email=${encodeURIComponent(donation.email)}` 
      : '';
    window.location.href = `/#donate${donationParams}`;
  };

  const handleContactSupport = (): void => {
    const subject = encodeURIComponent('Donation Assistance Required');
    const body = encodeURIComponent(`Hi,

I was trying to make a donation but encountered an issue during the payment process.

${donation ? `
Donation Details:
- Amount: ${donation.currency} ${donation.amount}
- Purpose: ${donation.purpose}
- Email: ${donation.email}
- Order ID: ${donation.orderId || 'N/A'}
- Time: ${donation.timestamp ? new Date(donation.timestamp).toLocaleString() : 'N/A'}
` : ''}

Please help me complete my donation or provide alternative payment methods.

Thank you!`);
    
    window.location.href = `mailto:support@yourorganization.org?subject=${subject}&body=${body}`;
  };

  const commonReasons: CommonReason[] = [
    {
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      title: "Payment took too long",
      description: "Cryptocurrency transactions can sometimes take longer than expected."
    },
    {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      title: "Insufficient funds",
      description: "Your wallet may not have had enough cryptocurrency for the transaction."
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-purple-500" />,
      title: "Technical difficulty",
      description: "There might have been a temporary issue with the payment processor."
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Cancellation Card */}
        <Card className="w-full mb-6">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-6">
              <div className="relative">
                <XCircle className="h-20 w-20 text-orange-500 mx-auto" />
                <div className="absolute inset-0 animate-pulse">
                  <XCircle className="h-20 w-20 text-orange-300 mx-auto" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl text-orange-700 mb-2">
              Donation Not Completed
            </CardTitle>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your donation was cancelled and no payment was processed. 
              Don't worry - you can easily try again or choose a different payment method.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Saved Donation Details */}
            {donation && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
                <h3 className="font-bold text-xl mb-4 text-center text-gray-800 flex items-center justify-center">
                  <Heart className="mr-2 h-5 w-5 text-orange-500" />
                  Your Donation Details Are Saved
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <span className="font-semibold text-gray-600 block text-sm">AMOUNT</span>
                    <p className="text-xl font-bold text-orange-600">
                      {donation.currency} {donation.amount}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <span className="font-semibold text-gray-600 block text-sm">PURPOSE</span>
                    <p className="text-lg font-medium text-gray-800">{donation.purpose}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <span className="font-semibold text-gray-600 block text-sm">EMAIL</span>
                    <p className="text-sm text-gray-700">{donation.email}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <span className="font-semibold text-gray-600 block text-sm">ORDER ID</span>
                    <p className="font-mono text-xs text-gray-600">
                      {donation.orderId || 'Not generated'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Common Reasons */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-800 text-lg mb-4 text-center">
                Common Reasons for Payment Cancellation
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {commonReasons.map((reason, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-3">
                      {reason.icon}
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">{reason.title}</h5>
                    <p className="text-sm text-gray-600">{reason.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Still Want to Help Section */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center mb-6">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h4 className="font-bold text-gray-800 text-xl mb-2">
                  Still Want to Make a Difference?
                </h4>
                <p className="text-gray-600">
                  Your support means everything to us. Here are some easy ways to complete your donation:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Try Again */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 text-green-500 mx-auto mb-3" />
                    <h5 className="font-bold text-gray-800 mb-2">Try Again</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      Use the same details and try the payment process again.
                    </p>
                    <Button 
                      onClick={handleTryAgain}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Retry Payment
                    </Button>
                  </div>
                </div>

                {/* Contact Support */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-200">
                  <div className="text-center">
                    <Mail className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                    <h5 className="font-bold text-gray-800 mb-2">Get Help</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      Our team can help you complete your donation or suggest alternatives.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={handleContactSupport}
                      className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Ways to Help */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h4 className="font-bold text-purple-800 text-lg mb-4 text-center">
                Other Ways to Support Our Cause
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <Heart className="h-6 w-6 text-pink-500 mx-auto mb-2" />
                  <h6 className="font-semibold text-gray-800 mb-1">Volunteer</h6>
                  <p className="text-xs text-gray-600">Join our volunteer program</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <ArrowRight className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <h6 className="font-semibold text-gray-800 mb-1">Share</h6>
                  <p className="text-xs text-gray-600">Spread awareness on social media</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <Mail className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <h6 className="font-semibold text-gray-800 mb-1">Newsletter</h6>
                  <p className="text-xs text-gray-600">Stay updated with our progress</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Payment Issues?</strong> Our support team is available 24/7 to help you complete your donation.
                  We accept various payment methods and can find the best solution for you.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleTryAgain}
                  className="bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Try Again
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'}
                  size="lg"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Return Home
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleContactSupport}
                  size="lg"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get Help
                </Button>
              </div>
            </div>

            {/* Motivational Message */}
            <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-6 text-center border border-pink-200">
              <h4 className="font-bold text-gray-800 mb-3">Every Contribution Matters ❤️</h4>
              <p className="text-gray-600 mb-4">
                Even though this payment didn't go through, your intention to help makes a difference. 
                Thank you for caring and for wanting to be part of the solution.
              </p>
              <p className="text-sm text-gray-500 italic">
                "The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationCancelled;