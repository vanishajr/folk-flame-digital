// services/artworkApi.ts
import { auth } from '../lib/firebase'; // Your Firebase auth config

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function to get auth headers
const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  const token = await user.getIdToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Helper function for form data requests
const getAuthHeadersForFormData = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  const token = await user.getIdToken();
  return {
    'Authorization': `Bearer ${token}`,
    // Don't set Content-Type for FormData, browser will set it with boundary
  };
};

export interface Artwork {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  userId: string;
  userEmail?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ArtworkUpload {
  title: string;
  description?: string;
  tags?: string[];
  file: File;
}

class ArtworkAPI {
  // Upload new artwork
  async uploadArtwork(artworkData: ArtworkUpload): Promise<Artwork> {
    const formData = new FormData();
    formData.append('artwork', artworkData.file);
    formData.append('title', artworkData.title);
    
    if (artworkData.description) {
      formData.append('description', artworkData.description);
    }
    
    if (artworkData.tags && artworkData.tags.length > 0) {
      formData.append('tags', artworkData.tags.join(','));
    }

    const headers = await getAuthHeadersForFormData();
    
    const response = await fetch(`${API_BASE_URL}/artworks/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to upload artwork');
    }

    return response.json();
  }

  // Get user's artworks
  async getUserArtworks(): Promise<Artwork[]> {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}/artworks/user`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch artworks');
    }

    return response.json();
  }

  // Get public artworks (for gallery)
  async getPublicArtworks(): Promise<Artwork[]> {
    const response = await fetch(`${API_BASE_URL}/artworks/public`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch public artworks');
    }

    return response.json();
  }

  // Delete artwork
  async deleteArtwork(artworkId: string): Promise<void> {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}/artworks/${artworkId}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete artwork');
    }
  }

  // Get artwork by ID
  async getArtworkById(artworkId: string): Promise<Artwork> {
    const response = await fetch(`${API_BASE_URL}/artworks/${artworkId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch artwork');
    }

    return response.json();
  }

  // Search artworks
  async searchArtworks(query: string): Promise<Artwork[]> {
    const response = await fetch(`${API_BASE_URL}/artworks/search/${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to search artworks');
    }

    return response.json();
  }
}

export const artworkAPI = new ArtworkAPI();