const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: this.getAuthHeaders(),
        ...options
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth API
  async register(userData: {
    username: string;
    email: string;
    password: string;
    parentEmail?: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (response.success && response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  async logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(profileData: {
    displayName?: string;
    avatar?: string;
    parentEmail?: string;
  }) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  // Content API
  async getGames(filters?: {
    artForm?: string;
    difficulty?: string;
    category?: string;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    return this.request(`/content/games?${params}`);
  }

  async getLearningModules(artForm?: string) {
    const params = artForm ? `?artForm=${artForm}` : '';
    return this.request(`/content/learning-modules${params}`);
  }

  async getArtFacts(artForm: string) {
    return this.request(`/content/art-facts/${artForm}`);
  }

  async getQuiz(artForm?: string, limit?: number) {
    const params = new URLSearchParams();
    if (artForm) params.append('artForm', artForm);
    if (limit) params.append('limit', limit.toString());
    
    return this.request(`/content/quiz?${params}`);
  }

  async getContentById(id: string) {
    return this.request(`/content/${id}`);
  }

  // Leaderboard API
  async getLeaderboard(limit?: number, artForm?: string) {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (artForm) params.append('artForm', artForm);
    
    return this.request(`/leaderboard?${params}`);
  }

  async getArtFormLeaderboard(artForm: string, limit?: number) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/leaderboard/artform/${artForm}${params}`);
  }

  async submitScore(scoreData: {
    contentId: string;
    score: number;
    maxScore: number;
    timeSpent: number;
  }) {
    return this.request('/leaderboard/submit-score', {
      method: 'POST',
      body: JSON.stringify(scoreData)
    });
  }

  async getUserRank() {
    return this.request('/leaderboard/my-rank');
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export const apiService = new ApiService();
export default apiService;
