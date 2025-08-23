import React, { useState } from 'react';

interface Artwork {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  userId: string;
  createdAt: string;
  tags?: string[];
}

interface ArtworkCardProps {
  artwork: Artwork;
  onDelete?: (artworkId: string) => void;
  showActions?: boolean;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ 
  artwork, 
  onDelete, 
  showActions = false 
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const handleDeleteClick = (): void => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = (): void => {
    if (onDelete) {
      onDelete(artwork.id);
    }
    setShowDeleteConfirm(false);
  };

  const formatDate = (timestamp: string): string => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderTags = (): JSX.Element | null => {
    if (!artwork.tags || artwork.tags.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {artwork.tags.slice(0, 3).map((tag, index) => (
          <span 
            key={index} 
            className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
        {artwork.tags.length > 3 && (
          <span className="inline-block bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full font-medium">
            +{artwork.tags.length - 3} more
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-200">
      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-amber-50 to-stone-100 overflow-hidden group">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          </div>
        )}
        
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)} // Handle image load errors
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Overlay with cultural pattern */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {showActions && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleDeleteClick}
              className="bg-white/90 backdrop-blur-sm hover:bg-red-500 hover:text-white text-red-600 p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
              title="Delete artwork"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-stone-800 mb-3 line-clamp-2 leading-tight">
          {artwork.title}
        </h3>
        
        {artwork.description && (
          <p className="text-stone-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {artwork.description}
          </p>
        )}
        
        {renderTags()}
        
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div className="flex items-center text-stone-500 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m4 0H4m15.5 0l-.5 2m0 0L19 21h-8M21 9l-.5 2m-7 .5L12.5 9m0 0V4.5" />
            </svg>
            <span>Uploaded {formatDate(artwork.createdAt)}</span>
          </div>
          
          <div className="flex items-center text-amber-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">Heritage</span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-stone-800 mb-2">Delete Cultural Artwork?</h4>
              <p className="text-stone-600 mb-6">
                Are you sure you want to delete "<strong>{artwork.title}</strong>"? This action cannot be undone and will permanently remove this piece from our cultural heritage collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors duration-200 font-medium"
                >
                  Keep Artwork
                </button>
                <button 
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkCard;