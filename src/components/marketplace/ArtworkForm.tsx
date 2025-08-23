import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Upload, 
  X, 
  Plus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface ArtworkFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  artwork?: any; // For editing existing artwork
}

const ArtworkForm: React.FC<ArtworkFormProps> = ({ onClose, onSubmit, artwork }) => {
  const [formData, setFormData] = useState({
    title: artwork?.title || '',
    description: artwork?.description || '',
    category: artwork?.category || '',
    otherCategory: artwork?.otherCategory || '',
    price: artwork?.price?.amount || '',
    currency: artwork?.price?.currency || 'INR',
    images: [] as File[],
    dimensions: {
      width: artwork?.dimensions?.width || '',
      height: artwork?.dimensions?.height || '',
      depth: artwork?.dimensions?.depth || '',
      unit: artwork?.dimensions?.unit || 'cm'
    },
    materials: artwork?.materials || [],
    yearCreated: artwork?.yearCreated || '',
    isOriginal: artwork?.isOriginal ?? true,
    edition: artwork?.edition || '',
    condition: artwork?.condition || 'New',
    shippingInfo: {
      weight: artwork?.shippingInfo?.weight || '',
      weightUnit: artwork?.shippingInfo?.weightUnit || 'kg',
      shippingCost: artwork?.shippingInfo?.shippingCost || '',
      shippingCurrency: artwork?.shippingInfo?.shippingCurrency || 'INR',
      estimatedDelivery: artwork?.shippingInfo?.estimatedDelivery || '7'
    },
    tags: artwork?.tags || []
  });

  const [newMaterial, setNewMaterial] = useState('');
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Painting',
    'Sculpture',
    'Photography',
    'Handicraft',
    'Digital Art',
    'Others'
  ];

  const conditions = [
    'New',
    'Excellent',
    'Very Good',
    'Good',
    'Fair'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent as keyof typeof prev], [field]: value }
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...fileArray] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addMaterial = () => {
    if (newMaterial.trim() && !formData.materials.includes(newMaterial.trim())) {
      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, newMaterial.trim()]
      }));
      setNewMaterial('');
    }
  };

  const removeMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.category === 'Others' && !formData.otherCategory.trim()) {
      newErrors.otherCategory = 'Please specify the category';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    if (formData.images.length > 5) {
      newErrors.images = 'Maximum 5 images allowed';
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
      
      const submitData = {
        ...formData,
        price: {
          amount: parseFloat(formData.price),
          currency: formData.currency
        },
        shippingInfo: {
          ...formData.shippingInfo,
          weight: parseFloat(formData.shippingInfo.weight) || 0,
          shippingCost: parseFloat(formData.shippingInfo.shippingCost) || 0,
          estimatedDelivery: parseInt(formData.shippingInfo.estimatedDelivery)
        },
        dimensions: {
          ...formData.dimensions,
          width: parseFloat(formData.dimensions.width) || 0,
          height: parseFloat(formData.dimensions.height) || 0,
          depth: parseFloat(formData.dimensions.depth) || 0
        },
        yearCreated: formData.yearCreated ? parseInt(formData.yearCreated) : undefined
      };

      onSubmit(submitData);
    } catch (error) {
      console.error('Submit error:', error);
      setErrors({ submit: 'Failed to save artwork. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {artwork ? 'Edit Artwork' : 'Add New Artwork'}
          </DialogTitle>
          <DialogDescription>
            {artwork ? 'Update your artwork details' : 'Add a new artwork to your portfolio'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Artwork Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter artwork title"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            {formData.category === 'Others' && (
              <div className="space-y-2">
                <Label htmlFor="otherCategory">Specify Category *</Label>
                <Input
                  id="otherCategory"
                  value={formData.otherCategory}
                  onChange={(e) => handleInputChange('otherCategory', e.target.value)}
                  placeholder="Please specify the category"
                  className={errors.otherCategory ? 'border-red-500' : ''}
                />
                {errors.otherCategory && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.otherCategory}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your artwork, techniques used, inspiration, and what makes it unique..."
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Minimum 50 characters
                </span>
                <span className={`text-sm ${formData.description.length >= 50 ? 'text-green-600' : 'text-gray-500'}`}>
                  {formData.description.length}/2000
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

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Images *</h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Upload high-quality images of your artwork (max 5 images, 5MB each)
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="artwork-images"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('artwork-images')?.click()}
                >
                  Choose Images
                </Button>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}

              {errors.images && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.images}
                </p>
              )}
            </div>
          </div>

          {/* Dimensions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Dimensions (Optional)</h3>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  type="number"
                  value={formData.dimensions.width}
                  onChange={(e) => handleNestedChange('dimensions', 'width', e.target.value)}
                  placeholder="Width"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.dimensions.height}
                  onChange={(e) => handleNestedChange('dimensions', 'height', e.target.value)}
                  placeholder="Height"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="depth">Depth</Label>
                <Input
                  id="depth"
                  type="number"
                  value={formData.dimensions.depth}
                  onChange={(e) => handleNestedChange('dimensions', 'depth', e.target.value)}
                  placeholder="Depth"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select 
                  value={formData.dimensions.unit} 
                  onValueChange={(value) => handleNestedChange('dimensions', 'unit', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="inches">inches</SelectItem>
                    <SelectItem value="mm">mm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Materials */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Materials (Optional)</h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  placeholder="Add material (e.g., Canvas, Oil Paint)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                />
                <Button type="button" onClick={addMaterial}>
                  Add
                </Button>
              </div>

              {formData.materials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-sm">{material}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0 hover:bg-gray-200"
                        onClick={() => removeMaterial(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Additional Details</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearCreated">Year Created</Label>
                <Input
                  id="yearCreated"
                  type="number"
                  value={formData.yearCreated}
                  onChange={(e) => handleInputChange('yearCreated', e.target.value)}
                  placeholder="Year"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isOriginal"
                checked={formData.isOriginal}
                onCheckedChange={(checked) => handleInputChange('isOriginal', checked)}
              />
              <Label htmlFor="isOriginal">This is an original artwork</Label>
            </div>

            {!formData.isOriginal && (
              <div className="space-y-2">
                <Label htmlFor="edition">Edition Information</Label>
                <Input
                  id="edition"
                  value={formData.edition}
                  onChange={(e) => handleInputChange('edition', e.target.value)}
                  placeholder="e.g., Limited Edition 5/50"
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Tags (Optional)</h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag (e.g., Traditional, Cultural, Handmade)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag}>
                  Add
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                      <span className="text-sm text-blue-800">{tag}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0 hover:bg-blue-200"
                        onClick={() => removeTag(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                artwork ? 'Update Artwork' : 'Add Artwork'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkForm;
