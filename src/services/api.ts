const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Helper function to make API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  // Google login with Firebase ID token
  googleLogin: async (idToken: string) => {
    return apiCall('/api/auth/google-login', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  },

  // Verify Firebase token
  verifyToken: async (idToken: string) => {
    return apiCall('/api/auth/verify-token', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  },

  // Get user profile (protected route)
  getProfile: async (token?: string) => {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return apiCall('/api/auth/profile', {
      method: 'GET',
      headers,
    });
  },

  // Update user profile (protected route)
  updateProfile: async (data: any, token?: string) => {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return apiCall('/api/auth/profile', {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
  },

  // Traditional login
  login: async (email: string, password: string) => {
    return apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Traditional registration
  register: async (userData: any) => {
    return apiCall('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

// Content API calls
export const contentAPI = {
  getContent: async () => {
    return apiCall('/api/content');
  },

  // Get games with optional filters
  getGames: async (filters?: {
    artForm?: string;
    difficulty?: string;
    category?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    return apiCall(`/api/content/games?${params}`);
  },

  // Get learning modules
  getLearningModules: async (artForm?: string) => {
    const params = artForm ? `?artForm=${artForm}` : '';
    return apiCall(`/api/content/learning-modules${params}`);
  },

  // Get art facts
  getArtFacts: async (artForm: string) => {
    return apiCall(`/api/content/art-facts/${artForm}`);
  },

  // Get quiz questions
  getQuiz: async (artForm?: string, limit?: number) => {
    const params = new URLSearchParams();
    if (artForm) params.append('artForm', artForm);
    if (limit) params.append('limit', limit.toString());
    
    return apiCall(`/api/content/quiz?${params}`);
  },

  // Get content by ID
  getContentById: async (id: string) => {
    return apiCall(`/api/content/${id}`);
  },
};

// Leaderboard API calls
export const leaderboardAPI = {
  getLeaderboard: async (limit?: number, artForm?: string) => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (artForm) params.append('artForm', artForm);
    
    return apiCall(`/api/leaderboard?${params}`);
  },

  // Get art form specific leaderboard
  getArtFormLeaderboard: async (artForm: string, limit?: number) => {
    const params = limit ? `?limit=${limit}` : '';
    return apiCall(`/api/leaderboard/artform/${artForm}${params}`);
  },

  // Submit score
  submitScore: async (scoreData: {
    contentId: string;
    score: number;
    maxScore: number;
    timeSpent: number;
  }) => {
    return apiCall('/api/leaderboard/submit-score', {
      method: 'POST',
      body: JSON.stringify(scoreData),
    });
  },

  // Get user rank
  getUserRank: async () => {
    return apiCall('/api/leaderboard/my-rank');
  },
};

// Legacy API service for backward compatibility
export const apiService = {
  // Auth methods
  register: authAPI.register,
  login: authAPI.login,
  getProfile: authAPI.getProfile,
  updateProfile: authAPI.updateProfile,
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Content methods
  getGames: contentAPI.getGames,
  getLearningModules: contentAPI.getLearningModules,
  getArtFacts: contentAPI.getArtFacts,
  getQuiz: contentAPI.getQuiz,
  getContentById: contentAPI.getContentById,

  // Leaderboard methods
  getLeaderboard: leaderboardAPI.getLeaderboard,
  getArtFormLeaderboard: leaderboardAPI.getArtFormLeaderboard,
  submitScore: leaderboardAPI.submitScore,
  getUserRank: leaderboardAPI.getUserRank,

  // Utility methods
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken') || !!localStorage.getItem('backendToken');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export default {
  auth: authAPI,
  content: contentAPI,
  leaderboard: leaderboardAPI,
  apiService, // Export for backward compatibility
};
