import React from 'react';
import ArtworkCard from './ArtworkCard';

interface Artwork {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  userId: string;
  createdAt: string;
  tags?: string[];
}

interface ArtworkGridProps {
  artworks: Artwork[];
  onDelete?: (artworkId: string) => void;
  showActions?: boolean;
}

const ArtworkGrid: React.FC<ArtworkGridProps> = ({ 
  artworks, 
  onDelete, 
  showActions = false 
}) => {
  if (artworks.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-stone-200">
        <div className="mx-auto h-24 w-24 text-stone-400 mb-6">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1" 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
        <p className="text-stone-500 text-lg">No cultural artworks to display yet</p>
        <p className="text-stone-400 text-sm mt-2">Your uploaded artworks will appear here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onDelete={onDelete}
          showActions={showActions}
        />
      ))}
    </div>
  );
};

export default ArtworkGrid;