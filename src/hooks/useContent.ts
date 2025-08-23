import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';

// Hooks for content management
export const useGames = (filters?: {
  artForm?: string;
  difficulty?: string;
  category?: string;
}) => {
  return useQuery({
    queryKey: ['games', filters],
    queryFn: () => apiService.getGames(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLearningModules = (artForm?: string) => {
  return useQuery({
    queryKey: ['learningModules', artForm],
    queryFn: () => apiService.getLearningModules(artForm),
    staleTime: 5 * 60 * 1000,
  });
};

export const useArtFacts = (artForm: string) => {
  return useQuery({
    queryKey: ['artFacts', artForm],
    queryFn: () => apiService.getArtFacts(artForm),
    enabled: !!artForm,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useQuiz = (artForm?: string, limit?: number) => {
  return useQuery({
    queryKey: ['quiz', artForm, limit],
    queryFn: () => apiService.getQuiz(artForm, limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useContentById = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: () => apiService.getContentById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

// Hooks for leaderboard management
export const useLeaderboard = (limit?: number, artForm?: string) => {
  return useQuery({
    queryKey: ['leaderboard', limit, artForm],
    queryFn: () => apiService.getLeaderboard(limit, artForm),
    staleTime: 2 * 60 * 1000, // 2 minutes for more real-time feel
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });
};

export const useArtFormLeaderboard = (artForm: string, limit?: number) => {
  return useQuery({
    queryKey: ['artFormLeaderboard', artForm, limit],
    queryFn: () => apiService.getArtFormLeaderboard(artForm, limit),
    enabled: !!artForm,
    staleTime: 2 * 60 * 1000,
  });
};

export const useUserRank = () => {
  return useQuery({
    queryKey: ['userRank'],
    queryFn: () => apiService.getUserRank(),
    staleTime: 2 * 60 * 1000,
  });
};

// Mutation for submitting scores
export const useSubmitScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scoreData: {
      contentId: string;
      score: number;
      maxScore: number;
      timeSpent: number;
    }) => apiService.submitScore(scoreData),
    onSuccess: () => {
      // Invalidate and refetch leaderboard and user rank queries
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['artFormLeaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['userRank'] });
    },
    onError: (error) => {
      console.error('Failed to submit score:', error);
    }
  });
};
