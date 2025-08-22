import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Search, X, Volume2, Globe, Sparkles } from 'lucide-react';
import { useVoiceSearch } from '@/hooks/use-voice-search';
import { toast } from 'sonner';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string, language: string) => void;
  isCulturalSearch?: boolean;
}

const VoiceSearchModal = ({ 
  isOpen, 
  onClose, 
  onSearch, 
  isCulturalSearch = false 
}: VoiceSearchModalProps) => {
  const {
    isListening,
    transcript,
    language,
    error,
    startListening,
    stopListening,
    reset,
  } = useVoiceSearch();

  const [searchQuery, setSearchQuery] = useState('');

  // Auto-stop listening after 10 seconds of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isListening && transcript) {
      timeout = setTimeout(() => {
        stopListening();
      }, 10000);
    }
    return () => clearTimeout(timeout);
  }, [isListening, transcript, stopListening]);

  // Handle search submission
  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim(), language);
      onClose();
      reset();
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      reset();
      startListening();
    }
  };

  // Get language display name
  const getLanguageName = (langCode: string) => {
    const languageMap: { [key: string]: string } = {
      'en-IN': 'English',
      'hi-IN': 'Hindi',
      'kn-IN': 'Kannada',
      'ta-IN': 'Tamil',
      'te-IN': 'Telugu',
      'ml-IN': 'Malayalam',
      'gu-IN': 'Gujarati',
      'pa-IN': 'Punjabi',
      'bn-IN': 'Bengali',
      'or-IN': 'Odia',
      'as-IN': 'Assamese',
      'mr-IN': 'Marathi',
    };
    return languageMap[langCode] || langCode;
  };

  // Get cultural search suggestions
  const getCulturalSuggestions = () => [
    "Show me Warli paintings from Maharashtra",
    "Find Madhubani art from Bihar",
    "Display Pithora paintings from Gujarat",
    "Show traditional temple architecture",
    "Find folk music instruments",
    "Display classical dance forms",
    "Show me traditional textiles",
    "Find ancient sculptures",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            {isCulturalSearch ? 'Cultural Voice Search' : 'Voice Search'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Voice Input Section */}
          <div className="text-center space-y-4">
            <div className="relative">
              <Button
                onClick={handleVoiceInput}
                size="lg"
                className={`h-20 w-20 rounded-full transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isListening ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
              
              {isListening && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-ping" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {isListening ? 'Listening... Speak now!' : 'Tap to start voice input'}
              </p>
              
              {language && (
                <Badge variant="secondary" className="gap-1">
                  <Globe className="h-3 w-3" />
                  {getLanguageName(language)}
                </Badge>
              )}
            </div>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">What you said:</span>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">{transcript}</p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => setSearchQuery(transcript)}
                  size="sm"
                  className="flex-1"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Use This Text
                </Button>
                <Button
                  onClick={reset}
                  variant="outline"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Manual Input */}
          <div className="space-y-2">
            <label htmlFor="search-input" className="text-sm font-medium">
              Or type your search:
            </label>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isCulturalSearch ? "e.g., Warli paintings from Maharashtra" : "Search for anything..."}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Cultural Search Suggestions */}
          {isCulturalSearch && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {getCulturalSuggestions().map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(suggestion)}
                    className="text-left p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
              className="flex-1"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceSearchModal;
