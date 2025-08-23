import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'art' | 'artist' | 'collection' | 'temple' | 'cultural';
  image?: string;
  location?: string;
  language?: string;
}

interface SearchContextType {
  searchQuery: string;
  searchResults: SearchResult[];
  isSearching: boolean;
  performSearch: (query: string, language?: string) => void;
  clearSearch: () => void;
  performCulturalSearch: (query: string, language?: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search function - in a real app, this would call an API
  const performSearch = async (query: string, language?: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchQuery(query);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock search results based on query
      const mockResults: SearchResult[] = generateMockResults(query, language);
      
      setSearchResults(mockResults);
      
      toast.success(`Found ${mockResults.length} results for "${query}"`);
      
      // Scroll to search results if they exist
      if (mockResults.length > 0) {
        setTimeout(() => {
          const searchSection = document.getElementById('search-results');
          if (searchSection) {
            searchSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } catch (error) {
      toast.error('Search failed. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const performCulturalSearch = async (query: string, language?: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchQuery(query);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Enhanced cultural search results
      const culturalResults: SearchResult[] = generateCulturalResults(query, language);
      
      setSearchResults(culturalResults);
      
      toast.success(`Found ${culturalResults.length} cultural results for "${query}"`);
      
      // Scroll to search results
      setTimeout(() => {
        const searchSection = document.getElementById('search-results');
        if (searchSection) {
          searchSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      toast.error('Cultural search failed. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const value: SearchContextType = {
    searchQuery,
    searchResults,
    isSearching,
    performSearch,
    clearSearch,
    performCulturalSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// Mock data generation functions
const generateMockResults = (query: string, language?: string): SearchResult[] => {
  const lowerQuery = query.toLowerCase();
  
  // Mock data for different search types
  const allResults: SearchResult[] = [
    {
      id: '1',
      title: 'Warli Paintings Collection',
      description: 'Traditional tribal art from Maharashtra featuring geometric patterns and daily life scenes',
      type: 'art',
      image: '/src/assets/hero-warli-art.jpg',
      location: 'Maharashtra',
      language: 'en-IN'
    },
    {
      id: '2',
      title: 'Madhubani Art Gallery',
      description: 'Ancient folk art from Bihar with intricate designs and mythological themes',
      type: 'art',
      image: '/src/assets/madhubani-art.jpg',
      location: 'Bihar',
      language: 'hi-IN'
    },
    {
      id: '3',
      title: 'Pithora Paintings',
      description: 'Sacred tribal art from Gujarat depicting rituals and ceremonies',
      type: 'art',
      image: '/src/assets/pithora-art.jpg',
      location: 'Gujarat',
      language: 'gu-IN'
    },
    {
      id: '4',
      title: 'Traditional Temple Architecture',
      description: 'Ancient temple designs and architectural marvels from across India',
      type: 'temple',
      location: 'Pan India',
      language: 'en-IN'
    },
    {
      id: '5',
      title: 'Folk Music Instruments',
      description: 'Traditional musical instruments used in various cultural ceremonies',
      type: 'cultural',
      location: 'Various States',
      language: 'en-IN'
    }
  ];

  // Filter results based on query
  return allResults.filter(result => 
    result.title.toLowerCase().includes(lowerQuery) ||
    result.description.toLowerCase().includes(lowerQuery) ||
    result.location.toLowerCase().includes(lowerQuery) ||
    result.type.includes(lowerQuery)
  );
};

const generateCulturalResults = (query: string, language?: string): SearchResult[] => {
  const lowerQuery = query.toLowerCase();
  
  // Enhanced cultural search results
  const culturalResults: SearchResult[] = [
    {
      id: 'c1',
      title: 'Warli Tribal Art',
      description: 'Ancient tribal art form from Maharashtra, characterized by geometric patterns and depictions of daily life, rituals, and nature',
      type: 'art',
      image: '/src/assets/hero-warli-art.jpg',
      location: 'Maharashtra',
      language: 'en-IN'
    },
    {
      id: 'c2',
      title: 'Madhubani Folk Art',
      description: 'Traditional folk art from Mithila region of Bihar, featuring intricate designs, mythological themes, and vibrant colors',
      type: 'art',
      image: '/src/assets/madhubani-art.jpg',
      location: 'Bihar',
      language: 'hi-IN'
    },
    {
      id: 'c3',
      title: 'Pithora Ritual Art',
      description: 'Sacred tribal art from Gujarat, used in religious ceremonies and depicting gods, goddesses, and spiritual themes',
      type: 'art',
      image: '/src/assets/pithora-art.jpg',
      location: 'Gujarat',
      language: 'gu-IN'
    },
    {
      id: 'c4',
      title: 'Karnataka Temple Architecture',
      description: 'Magnificent temple architecture from Karnataka featuring Hoysala, Chalukya, and Vijayanagara styles',
      type: 'temple',
      location: 'Karnataka',
      language: 'kn-IN'
    },
    {
      id: 'c5',
      title: 'Classical Dance Forms',
      description: 'Traditional Indian classical dance forms including Bharatanatyam, Kathak, Odissi, and more',
      type: 'cultural',
      location: 'Pan India',
      language: 'en-IN'
    },
    {
      id: 'c6',
      title: 'Traditional Textiles',
      description: 'Handcrafted textiles including Banarasi silk, Kanjivaram, Pashmina, and various regional weaves',
      type: 'cultural',
      location: 'Various States',
      language: 'en-IN'
    },
    {
      id: 'c7',
      title: 'Ancient Sculptures',
      description: 'Historical sculptures from various periods including Mauryan, Gupta, and medieval eras',
      type: 'cultural',
      location: 'Pan India',
      language: 'en-IN'
    },
    {
      id: 'c8',
      title: 'Folk Music Traditions',
      description: 'Regional folk music traditions including Baul, Bhangra, Lavani, and various tribal music forms',
      type: 'cultural',
      location: 'Various States',
      language: 'en-IN'
    }
  ];

  // Enhanced filtering for cultural search
  return culturalResults.filter(result => {
    const searchableText = `${result.title} ${result.description} ${result.location} ${result.type}`.toLowerCase();
    return searchableText.includes(lowerQuery);
  });
};
