import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Palette, 
  Upload, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ArtistRegistrationProps {
  onRegistrationComplete: () => void;
}

const ArtistRegistration: React.FC<ArtistRegistrationProps> = ({ onRegistrationComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    artType: '',
    otherArtType: '',
    description: '',
    profilePicture: null as File | null,
    portfolioImages: [] as File[],
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const artTypes = [
    'Painting',
    'Sculpture', 
    'Photography',
    'Handicraft',
    'Digital Art',
    'Others'
  ];

  const handleInputChange = (field: string, value: string | boolean | File | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (field: 'profilePicture' | 'portfolioImages', files: FileList | null) => {
    if (!files) return;

    if (field === 'profilePicture') {
      if (files[0]) {
        setFormData(prev => ({ ...prev, profilePicture: files[0] }));
      }
    } else {
      const fileArray = Array.from(files);
      setFormData(prev => ({ ...prev, portfolioImages: fileArray }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.artType) {
      newErrors.artType = 'Please select your art type';
    }

    if (formData.artType === 'Others' && !formData.otherArtType.trim()) {
      newErrors.otherArtType = 'Please specify your art type';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe your art';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, send data to backend
      console.log('Artist registration data:', formData);
      
      // Show success and redirect
      onRegistrationComplete();
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Become an Artist</h1>
          <p className="text-gray-600">
            Join our marketplace and showcase your cultural artworks to art enthusiasts worldwide
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Artist Registration</CardTitle>
            <CardDescription>
              Please fill in your details to create your artist account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Create a password"
                        className={errors.password ? 'border-red-500' : ''}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Confirm your password"
                        className={errors.confirmPassword ? 'border-red-500' : ''}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Art Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Art Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="artType">Type of Art *</Label>
                  <Select value={formData.artType} onValueChange={(value) => handleInputChange('artType', value)}>
                    <SelectTrigger className={errors.artType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select your art type" />
                    </SelectTrigger>
                    <SelectContent>
                      {artTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.artType && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.artType}
                    </p>
                  )}
                </div>

                {formData.artType === 'Others' && (
                  <div className="space-y-2">
                    <Label htmlFor="otherArtType">Specify Art Type *</Label>
                    <Input
                      id="otherArtType"
                      value={formData.otherArtType}
                      onChange={(e) => handleInputChange('otherArtType', e.target.value)}
                      placeholder="Please specify your art type"
                      className={errors.otherArtType ? 'border-red-500' : ''}
                    />
                    {errors.otherArtType && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.otherArtType}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Describe Your Art *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Tell us about your art style, techniques, inspiration, and what makes your work unique..."
                    rows={4}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Minimum 50 characters
                    </span>
                    <span className={`text-sm ${formData.description.length >= 50 ? 'text-green-600' : 'text-gray-500'}`}>
                      {formData.description.length}/1000
                    </span>
                  </div>
                  {errors.description && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Portfolio Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Portfolio (Optional)</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="profilePicture">Profile Picture</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload a profile picture to help customers recognize your brand
                    </p>
                    <Input
                      id="profilePicture"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('profilePicture', e.target.files)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('profilePicture')?.click()}
                    >
                      Choose File
                    </Button>
                    {formData.profilePicture && (
                      <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        {formData.profilePicture.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolioImages">Portfolio Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload up to 5 images of your best artworks (max 5MB each)
                    </p>
                    <Input
                      id="portfolioImages"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload('portfolioImages', e.target.files)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('portfolioImages')?.click()}
                    >
                      Choose Files
                    </Button>
                    {formData.portfolioImages.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {formData.portfolioImages.map((file, index) => (
                          <p key={index} className="text-sm text-green-600 flex items-center justify-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            {file.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Terms & Conditions</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the Terms and Conditions *
                      </Label>
                      <p className="text-xs text-gray-500">
                        By checking this box, you agree to our marketplace terms and seller guidelines
                      </p>
                    </div>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.agreeToTerms}
                    </p>
                  )}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreeToPrivacy}
                      onCheckedChange={(checked) => handleInputChange('agreeToPrivacy', checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="privacy" className="text-sm">
                        I agree to the Privacy Policy *
                      </Label>
                      <p className="text-xs text-gray-500">
                        You consent to the collection and use of your information as described in our privacy policy
                      </p>
                    </div>
                  </div>
                  {errors.agreeToPrivacy && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.agreeToPrivacy}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  'Create Artist Account'
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to receive email communications from us about your account and marketplace updates.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArtistRegistration;
