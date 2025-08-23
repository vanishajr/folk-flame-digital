import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  Shield, 
  Truck, 
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  User,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  processingFee: number;
}

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: React.ComponentType<any>;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  
  // Get artwork data from navigation state or URL params
  const artwork = location.state?.artwork || {
    id: '1',
    title: 'Traditional Madhubani Painting',
    description: 'Beautiful hand-painted Madhubani artwork depicting traditional Indian mythology',
    images: ['/src/assets/madhubani-art.jpg'],
    price: { amount: 15000, currency: 'INR' },
    artist: { name: 'Priya Sharma' }
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [selectedShippingOption, setSelectedShippingOption] = useState<string>('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState({
    fullName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay, American Express',
      processingFee: 0.02 // 2%
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: CreditCard,
      description: 'Google Pay, PhonePe, Paytm, BHIM',
      processingFee: 0.01 // 1%
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      description: 'All major Indian banks',
      processingFee: 0.015 // 1.5%
    }
  ];

  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: '5-7 business days',
      price: 200,
      estimatedDays: '5-7 days',
      icon: Truck
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: '2-3 business days',
      price: 500,
      estimatedDays: '2-3 days',
      icon: Truck
    },
    {
      id: 'premium',
      name: 'Premium Delivery',
      description: 'Next day delivery',
      price: 1000,
      estimatedDays: '1 day',
      icon: Truck
    }
  ];

  const selectedShipping = shippingOptions.find(option => option.id === selectedShippingOption);
  const selectedPayment = paymentMethods.find(method => method.id === selectedPaymentMethod);
  
  const subtotal = artwork.price.amount;
  const shippingCost = selectedShipping?.price || 0;
  const processingFee = selectedPayment ? (subtotal * selectedPayment.processingFee) : 0;
  const total = subtotal + shippingCost + processingFee;

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        navigate('/marketplace', { 
          state: { 
            message: 'Payment successful! Your artwork will be shipped soon.' 
          } 
        });
      }, 3000);
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. Your artwork will be shipped to you soon.
            </p>
            <div className="text-sm text-gray-500">
              Order ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p className="text-gray-600">Secure payment for your selected artwork</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Artwork Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Artwork Selected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <img
                    src={artwork.images[0]}
                    alt={artwork.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{artwork.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{artwork.description}</p>
                    <p className="text-gray-500 text-sm">Artist: {artwork.artist.name}</p>
                    <div className="text-xl font-bold text-amber-600 mt-2">
                      {formatPrice(artwork.price.amount, artwork.price.currency)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedPaymentMethod === method.id}
                          onChange={() => setSelectedPaymentMethod(method.id)}
                          className="text-amber-600"
                        />
                        <Icon className="h-6 w-6 text-gray-600" />
                        <div className="flex-1">
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {method.processingFee * 100}% fee
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Card Details (if card selected) */}
            {selectedPaymentMethod === 'card' && (
              <Card>
                <CardHeader>
                  <CardTitle>Card Details</CardTitle>
                  <CardDescription>Enter your card information securely</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <Input
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <Input
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Shipping Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Options
                </CardTitle>
                <CardDescription>Choose your preferred delivery method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {shippingOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedShippingOption === option.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedShippingOption(option.id)}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingOption"
                          value={option.id}
                          checked={selectedShippingOption === option.id}
                          onChange={() => setSelectedShippingOption(option.id)}
                          className="text-amber-600"
                        />
                        <Icon className="h-6 w-6 text-gray-600" />
                        <div className="flex-1">
                          <div className="font-medium">{option.name}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatPrice(option.price, 'INR')}</div>
                          <div className="text-sm text-gray-500">{option.estimatedDays}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Billing & Shipping Address
                </CardTitle>
                <CardDescription>Where should we deliver your artwork?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={billingAddress.fullName}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, fullName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={billingAddress.email}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={billingAddress.phone}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <Input
                    placeholder="123 Main Street, Apartment 4B"
                    value={billingAddress.address}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <Input
                      placeholder="Mumbai"
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <Input
                      placeholder="Maharashtra"
                      value={billingAddress.state}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, state: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <Input
                      placeholder="400001"
                      value={billingAddress.pincode}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, pincode: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox id="terms" className="mt-1" />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-amber-600 hover:underline">Terms & Conditions</a>
                    {' '}and{' '}
                    <a href="#" className="text-amber-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Artwork Price</span>
                    <span>{formatPrice(subtotal, artwork.price.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping ({selectedShipping?.name})</span>
                    <span>{formatPrice(shippingCost, artwork.price.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span>{formatPrice(processingFee, artwork.price.currency)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total, artwork.price.currency)}</span>
                    </div>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-600" />
                    Secure SSL Encryption
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lock className="h-4 w-4 text-green-600" />
                    PCI DSS Compliant
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Money Back Guarantee
                  </div>
                </div>

                {/* Pay Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ${formatPrice(total, artwork.price.currency)}`
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By clicking "Pay", you agree to our terms and authorize the charge
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
