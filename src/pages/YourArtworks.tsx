import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import ArtworkUpload from '../components/ArtworkUpload';
import ArtworkGrid from '../components/ArtworkGrid';

interface Artwork {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  userId: string;
  createdAt: string;
  tags?: string[];
}

const YourArtworks: React.FC = () => {
  const [user] = useAuthState(auth);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserArtworks();
    }
  }, [user]);

  const fetchUserArtworks = async (): Promise<void> => {
    try {
      const token = await user?.getIdToken();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/artworks/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userArtworks: Artwork[] = await response.json();
        setArtworks(userArtworks);
      } else {
        setError('Failed to fetch artworks');
      }
    } catch (err) {
      setError('Error loading artworks');
      console.error('Error fetching artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleArtworkUploaded = (newArtwork: Artwork): void => {
    setArtworks(prev => [newArtwork, ...prev]);
    setShowUploadForm(false);
  };

  const handleDeleteArtwork = async (artworkId: string): Promise<void> => {
    try {
      const token = await user?.getIdToken();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/artworks/${artworkId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setArtworks(prev => prev.filter(artwork => artwork.id !== artworkId));
      } else {
        setError('Failed to delete artwork');
      }
    } catch (err) {
      setError('Error deleting artwork');
      console.error('Error deleting artwork:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          <span className="ml-4 text-lg text-stone-600">Loading your cultural treasures...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gradient-to-br from-amber-50 to-stone-100">
      {/* Header Section */}
      <div className="mb-8 bg-gradient-to-r from-amber-800 to-stone-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Your Cultural <span className="text-amber-300">Artworks</span>
            </h1>
            <p className="text-amber-100 text-lg">
              Share your artistic heritage with the world
            </p>
          </div>
          <button 
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-full font-semibold transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            {showUploadForm ? '✕ Cancel' : '+ Upload New Artwork'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex justify-between items-center">
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
            <button 
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Upload Form */}
      {showUploadForm && (
        <ArtworkUpload 
          onArtworkUploaded={handleArtworkUploaded}
          onCancel={() => setShowUploadForm(false)}
        />
      )}

      {/* Content */}
      {artworks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-stone-200">
          <div className="mx-auto h-24 w-24 text-stone-400 mb-6">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-stone-700 mb-3">
            No Cultural Artworks Yet
          </h3>
          <p className="text-stone-500 mb-8 max-w-md mx-auto">
            Begin your journey of preserving cultural heritage. Upload your first artwork and share the beauty of traditional arts with the world.
          </p>
          <button 
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-3 rounded-full font-semibold transform transition-all duration-200 hover:scale-105 inline-flex items-center"
            onClick={() => setShowUploadForm(true)}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Upload Your First Artwork
          </button>
        </div>
      ) : (
        <ArtworkGrid 
          artworks={artworks} 
          onDelete={handleDeleteArtwork}
          showActions={true}
        />
      )}
    </div>
  );
};

export default YourArtworks;