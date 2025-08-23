import { useSearch } from '@/contexts/SearchContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Globe, Palette, Building2, Music, X } from 'lucide-react';

const SearchResults = () => {
  const { searchQuery, searchResults, isSearching, clearSearch } = useSearch();

  if (!searchQuery) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'art':
        return <Palette className="h-4 w-4" />;
      case 'temple':
        return <Building2 className="h-4 w-4" />;
      case 'cultural':
        return <Music className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'art':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'temple':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cultural':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section id="search-results" className="py-16 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Search className="h-6 w-6 text-primary" />
            <div>
              <h2 className="font-cultural text-2xl font-bold text-primary">
                Search Results
              </h2>
              <p className="text-muted-foreground">
                {isSearching ? 'Searching...' : `Found ${searchResults.length} results for "${searchQuery}"`}
              </p>
            </div>
          </div>
          
          <Button
            onClick={clearSearch}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Clear Search
          </Button>
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Searching for cultural treasures...</p>
          </div>
        )}

        {/* No Results */}
        {!isSearching && searchResults.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or use voice search for better results
            </p>
            <Button onClick={clearSearch} variant="outline">
              Try Different Search
            </Button>
          </div>
        )}

        {/* Search Results Grid */}
        {!isSearching && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result) => (
              <Card 
                key={result.id} 
                className="group hover:shadow-cultural transition-all duration-300 bg-card border-border/50 overflow-hidden"
              >
                {result.image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-cultural text-lg font-semibold text-primary line-clamp-2">
                      {result.title}
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`${getTypeColor(result.type)} border`}
                    >
                      <div className="flex items-center gap-1">
                        {getTypeIcon(result.type)}
                        <span className="capitalize">{result.type}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {result.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {result.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {result.location}
                        </div>
                      )}
                      {result.language && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {result.language}
                        </div>
                      )}
                    </div>
                    
                    <Button size="sm" variant="ghost" className="group-hover:bg-primary/10 group-hover:text-primary">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Search Suggestions */}
        {!isSearching && searchResults.length > 0 && (
          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-primary mb-3">Try these related searches:</h3>
            <div className="flex flex-wrap gap-2">
              {['Traditional Art', 'Temple Architecture', 'Folk Music', 'Cultural Heritage', 'Indian Artforms'].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    // This would trigger a new search
                    console.log('Searching for:', suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
