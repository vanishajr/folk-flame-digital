import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

interface Artwork {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  userId: string;
  createdAt: string;
  tags?: string[];
}

interface FormData {
  title: string;
  description: string;
  tags: string;
}

interface ArtworkUploadProps {
  onArtworkUploaded: (artwork: Artwork) => void;
  onCancel: () => void;
}

const ArtworkUpload: React.FC<ArtworkUploadProps> = ({ onArtworkUploaded, onCancel }) => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    tags: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }

      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setFile(selectedFile);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an image to upload');
      return;
    }

    if (!formData.title.trim()) {
      setError('Please enter a title for your artwork');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const token = await user?.getIdToken();
      const uploadFormData = new FormData();
      
      uploadFormData.append('artwork', file);
      uploadFormData.append('title', formData.title.trim());
      uploadFormData.append('description', formData.description.trim());
      uploadFormData.append('tags', formData.tags.trim());

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/artworks/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      });

      if (response.ok) {
        const newArtwork: Artwork = await response.json();
        onArtworkUploaded(newArtwork);
        
        // Reset form
        setFormData({ title: '', description: '', tags: '' });
        setFile(null);
        setPreview(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to upload artwork');
      }
    } catch (err) {
      setError('Error uploading artwork. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-8 bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-stone-600 px-6 py-4">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Share Your Cultural Heritage
        </h3>
        <p className="text-amber-100 text-sm mt-1">
          Upload your artwork and contribute to preserving our cultural legacy
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-stone-700 mb-2">
            Select Artwork Image *
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-stone-300 border-dashed rounded-xl hover:border-amber-400 transition-colors duration-200">
            <div className="space-y-1 text-center">
              {preview ? (
                <div className="mb-4">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="mx-auto h-32 w-auto rounded-lg shadow-md"
                  />
                </div>
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-stone-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div className="flex text-sm text-stone-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="sr-only"
                    required
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-stone-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-semibold text-stone-700 mb-2">
            Artwork Title *
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Traditional Warli Art, Madhubani Painting..."
            disabled={uploading}
            required
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-stone-50 disabled:cursor-not-allowed transition-colors duration-200"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-semibold text-stone-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your artwork, its cultural significance, techniques used..."
            rows={4}
            disabled={uploading}
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-stone-50 disabled:cursor-not-allowed transition-colors duration-200"
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <label htmlFor="tags" className="block text-sm font-semibold text-stone-700 mb-2">
            Tags
          </label>
          <input
            id="tags"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="e.g., warli, traditional, tribal art, madhubani (comma separated)"
            disabled={uploading}
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-stone-50 disabled:cursor-not-allowed transition-colors duration-200"
          />
          <p className="mt-1 text-xs text-stone-500">Separate tags with commas to help others discover your artwork</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button 
            type="button" 
            onClick={onCancel}
            disabled={uploading}
            className="px-6 py-3 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={uploading}
            className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center justify-center"
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Artwork
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtworkUpload;