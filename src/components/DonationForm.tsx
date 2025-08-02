import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, Shield, Globe, Banknote, Copy, CheckCircle } from "lucide-react";

const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [reason, setReason] = useState("General Support");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [copiedField, setCopiedField] = useState("");

  const suggestedAmounts = [10, 25, 50, 100];

  // Payment details
  const paymentDetails = {
    paypal: {
      email: "hopefortheinjured@gmail.com"
    },
    bank: {
      bankName: "Equity Bank",
      accountNumber: "0700186283211",
      branch: "Nairobi",
      branchCode: "247247"
    }
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleDonate = async () => {
    if (!amount) {
      alert("Please enter a donation amount.");
      return;
    }
  
    // Handle PayPal and Bank Transfer methods
    alert(
      `Thank you for choosing to donate ${amount} ${currency}! Please use the payment details shown below to complete your donation.`
    );
  
    console.log("Donation details:", { amount, currency, reason, paymentMethod });
  };

  return (
    <section id="donate" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Make a Difference Today
          </h2>
          <p className="text-xl text-muted-foreground">
            Your generosity creates lasting change. Choose how you'd like to help.
          </p>
        </div>

        <Card className="shadow-hero bg-gradient-card">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-2xl">
              <Heart className="mr-2 h-6 w-6 text-primary" />
              Donation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Amount Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Select Amount</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {suggestedAmounts.map((suggestedAmount) => (
                  <Button
                    key={suggestedAmount}
                    variant={amount === suggestedAmount.toString() ? "default" : "outline"}
                    onClick={() => setAmount(suggestedAmount.toString())}
                    className="h-12"
                  >
                    ${suggestedAmount}
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1"
                />
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="KSH">KSH</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer ${
                      paymentMethod === "paypal" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                      <Globe className="mr-2 h-4 w-4" />
                      PayPal
                    </Label>
                  </div>
                  <div 
                    className={`flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer ${
                      paymentMethod === "bank" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setPaymentMethod("bank")}
                  >
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex items-center cursor-pointer">
                      <Banknote className="mr-2 h-4 w-4" />
                      Bank Transfer
                    </Label>
                  </div>
                </div>
              </RadioGroup>
              
              {/* Payment Method Instructions */}
              {paymentMethod === "paypal" && (
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-4">
                    <Globe className="mr-2 h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">PayPal Payment Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <p className="text-sm font-medium text-gray-600">PayPal Email</p>
                        <p className="font-mono text-sm">{paymentDetails.paypal.email}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(paymentDetails.paypal.email, 'paypal-email')}
                      >
                        {copiedField === 'paypal-email' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="text-sm text-blue-700 bg-blue-100 p-3 rounded">
                      <p className="font-medium mb-1">Instructions:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Send payment to the email above</li>
                        <li>Mark as "Friends & Family" to avoid fees (optional)</li>
                        <li>Include "General Support" in the note</li>
                        <li>Email us a screenshot for confirmation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-center mb-4">
                    <Banknote className="mr-2 h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-900">Bank Transfer Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Bank Name</p>
                        <p className="font-mono text-sm">{paymentDetails.bank.bankName}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(paymentDetails.bank.bankName, 'bank-name')}
                      >
                        {copiedField === 'bank-name' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Account Number</p>
                        <p className="font-mono text-sm">{paymentDetails.bank.accountNumber}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(paymentDetails.bank.accountNumber, 'account-number')}
                      >
                        {copiedField === 'account-number' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Branch</p>
                        <p className="font-mono text-sm">{paymentDetails.bank.branch}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(paymentDetails.bank.branch, 'branch')}
                      >
                        {copiedField === 'branch' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Paybill</p>
                        <p className="font-mono text-sm">{paymentDetails.bank.branchCode}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(paymentDetails.bank.branchCode, 'branch-code')}
                      >
                        {copiedField === 'branch-code' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-green-700 bg-green-100 p-3 rounded">
                    <p className="font-medium mb-1">Reference/Memo:</p>
                    <p className="font-mono bg-white p-2 rounded border inline-block">
                      General Support - {amount} {currency}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Upload Proof of Payment (optional)</Label>
                    <Input type="file" className="mt-2" accept="image/*,.pdf" />
                  </div>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-accent-light/20 p-4 rounded-lg border border-accent/30">
              <div className="flex items-center text-sm text-accent-foreground text-green-600">
                <Shield className="mr-2 h-4 w-4" />
                Your donation is secure and encrypted. We never store your payment information.
              </div>
            </div>

            {/* Donate Button */}
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full"
              onClick={handleDonate}
              disabled={!amount}
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate {amount && `$${amount}`} {currency}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DonationForm;