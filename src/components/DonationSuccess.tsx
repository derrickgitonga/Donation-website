import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, Loader2, Heart, Mail, Copy, ExternalLink } from "lucide-react";

interface DonationData {
  orderId: string;
  chargeId: string;
  amount: string;
  currency: string;
  purpose: string;
  email: string;
  timestamp: string;
}

const DonationSuccess = () => {
  const [donation, setDonation] = useState<DonationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Get donation info from localStorage
    const pendingDonation = localStorage.getItem('pendingDonation');
    if (pendingDonation) {
      try {
        const donationData: DonationData = JSON.parse(pendingDonation);
        setDonation(donationData);
        
        // Clean up localStorage after successful retrieval
        localStorage.removeItem('pendingDonation');
      } catch (err) {
        console.error('Error parsing donation data:', err);
        setError('Could not retrieve donation information');
      }
    } else {
      setError('No donation information found');
    }
    setLoading(false);
  }, []);

  const copyOrderId = async (): Promise<void> => {
    if (donation?.orderId) {
      try {
        await navigator.clipboard.writeText(donation.orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy order ID:', err);
      }
    }
  };

  const handleContactSupport = (): void => {
    const subject = encodeURIComponent(`Donation Support - Order ${donation?.orderId || 'N/A'}`);
    const body = encodeURIComponent(`Hi,

I need help with my donation:

Order ID: ${donation?.orderId || 'N/A'}
Amount: ${donation?.currency || 'USD'} ${donation?.amount || 'N/A'}
Purpose: ${donation?.purpose || 'N/A'}
Email: ${donation?.email || 'N/A'}
Date: ${donation?.timestamp ? new Date(donation.timestamp).toLocaleString() : 'N/A'}

Please assist me with: [Describe your issue here]

Thank you!`);
    
    window.location.href = `mailto:support@yourorganization.org?subject=${subject}&body=${body}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-lg font-semibold mb-2">Loading donation status...</h2>
            <p className="text-muted-foreground">Please wait while we retrieve your information.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <CardTitle className="text-xl text-orange-700">Information Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <p className="text-sm text-muted-foreground">
              If you completed a donation, please check your email for confirmation details.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => window.location.href = '/'}>
                Return Home
              </Button>
              <Button variant="outline" onClick={handleContactSupport}>
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Success Card */}
        <Card className="w-full mb-6">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-6">
              <div className="relative">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
                <div className="absolute inset-0 animate-ping">
                  <CheckCircle className="h-20 w-20 text-green-300 mx-auto" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl text-green-700 mb-2">
              Thank You for Your Generous Donation!
            </CardTitle>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your contribution means the world to us and will help create real, lasting change. 
              We're processing your payment and will send a confirmation email shortly.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Donation Details */}
            {donation && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-bold text-xl mb-6 text-center text-gray-800">
                  Donation Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <span className="font-semibold text-gray-600 block text-sm">AMOUNT</span>
                      <p className="text-2xl font-bold text-green-600">
                        {donation.currency} {donation.amount}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <span className="font-semibold text-gray-600 block text-sm">PURPOSE</span>
                      <p className="text-lg font-medium text-gray-800">{donation.purpose}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <span className="font-semibold text-gray-600 block text-sm">ORDER ID</span>
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-sm text-gray-700 truncate mr-2">
                          {donation.orderId}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyOrderId}
                          className="shrink-0"
                        >
                          {copied ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <span className="font-semibold text-gray-600 block text-sm">EMAIL</span>
                      <p className="text-sm text-gray-700 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {donation.email}
                      </p>
                    </div>
                  </div>
                </div>
                {donation.timestamp && (
                  <div className="mt-4 text-center">
                    <span className="text-sm text-gray-500">
                      Donation initiated on {new Date(donation.timestamp).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Payment Processing Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-blue-600 mt-1 mr-4 shrink-0" />
                <div className="space-y-3">
                  <h4 className="font-bold text-blue-800 text-lg">Payment Processing</h4>
                  <p className="text-blue-700">
                    Your cryptocurrency payment is being confirmed on the blockchain. 
                    This process typically takes:
                  </p>
                  <ul className="text-sm text-blue-600 space-y-1 ml-4">
                    <li>• Bitcoin (BTC): 10-60 minutes</li>
                    <li>• Ethereum (ETH): 2-5 minutes</li>
                    <li>• USD Coin (USDC): 2-5 minutes</li>
                    <li>• Other cryptocurrencies: 5-30 minutes</li>
                  </ul>
                  <div className="bg-blue-100 rounded-lg p-3 mt-4">
                    <p className="text-sm text-blue-800 font-medium">
                      📧 You'll receive an email confirmation once your transaction is fully verified.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h4 className="font-bold text-purple-800 text-lg mb-3">What Happens Next?</h4>
              <div className="space-y-3 text-purple-700">
                <div className="flex items-start">
                  <div className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-purple-800 mr-3 mt-0.5 shrink-0">1</div>
                  <p>Your payment is confirmed on the blockchain</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-purple-800 mr-3 mt-0.5 shrink-0">2</div>
                  <p>You receive an email receipt with transaction details</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-purple-800 mr-3 mt-0.5 shrink-0">3</div>
                  <p>Your funds are allocated to the chosen cause</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-purple-800 mr-3 mt-0.5 shrink-0">4</div>
                  <p>We'll send you updates on how your donation is making an impact</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="text-center space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Need help?</strong> Contact our support team with your Order ID above.
                  We're here to assist you 24/7.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Return Home
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleContactSupport}
                  size="lg"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/#donate'}
                  size="lg"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Donate Again
                </Button>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 text-center border border-pink-200">
              <h4 className="font-bold text-gray-800 mb-3">Share the Love ❤️</h4>
              <p className="text-gray-600 mb-4">
                Help us reach more people by sharing our cause with your friends and family.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="outline" size="sm">Share on Twitter</Button>
                <Button variant="outline" size="sm">Share on Facebook</Button>
                <Button variant="outline" size="sm">Share on LinkedIn</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationSuccess;