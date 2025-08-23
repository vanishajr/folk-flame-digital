import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gamepad2, 
  BookOpen, 
  Trophy, 
  Star, 
  Target, 
  Users,
  Play,
  RotateCcw,
  CheckCircle,
  Clock,
  Award,
  Crown,
  Medal
} from "lucide-react";
import { useGames, useLearningModules, useLeaderboard, useSubmitScore, useArtFacts } from "@/hooks/useContent";
import { useAuth } from "@/hooks/useAuth";

interface Game {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'puzzle' | 'memory' | 'creative' | 'quiz';
  estimatedTime: number;
  artForm: string;
  isCompleted: boolean;
  score?: number;
  maxScore: number;
  thumbnail: string;
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  artForm: string;
  duration: number;
  isCompleted: boolean;
  progress: number;
  thumbnail: string;
}

const Children = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  
  // Warli bead game state
  const [warliBeads, setWarliBeads] = useState<string[]>([]);
  const [targetPattern, setTargetPattern] = useState<string[]>([]);
  const [draggedBead, setDraggedBead] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentFact, setCurrentFact] = useState('');
  const [showArtFact, setShowArtFact] = useState(false);
  const [currentArtFact, setCurrentArtFact] = useState('');
  const [showLearningPage, setShowLearningPage] = useState(false);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  // Backend data hooks
  const { data: gamesData, isLoading: gamesLoading } = useGames();
  const { data: modulesData, isLoading: modulesLoading } = useLearningModules();
  const { data: leaderboardData, isLoading: leaderboardLoading } = useLeaderboard(5);
  const submitScoreMutation = useSubmitScore();

  // Mock data for games (fallback when backend is not available)
  const mockGames: Game[] = [
    {
      id: '1',
      title: 'Warli Art Pattern Match',
      description: 'Match traditional Warli art patterns and learn about tribal art forms',
      ageGroup: 'all',
      difficulty: 'beginner',
      category: 'memory',
      estimatedTime: 5,
      artForm: 'Warli',
      isCompleted: false,
      maxScore: 100,
      thumbnail: '🎨'
    },
    {
      id: '2',
      title: 'Madhubani Color Quest',
      description: 'Learn about Madhubani painting colors and create beautiful patterns',
      ageGroup: 'all',
      difficulty: 'beginner',
      category: 'creative',
      estimatedTime: 8,
      artForm: 'Madhubani',
      isCompleted: false,
      maxScore: 100,
      thumbnail: '🎭'
    },
    {
      id: '3',
      title: 'Pithora Art Puzzle',
      description: 'Solve puzzles featuring Pithora art and learn about tribal culture',
      ageGroup: 'all',
      difficulty: 'intermediate',
      category: 'puzzle',
      estimatedTime: 10,
      artForm: 'Pithora',
      isCompleted: false,
      maxScore: 150,
      thumbnail: '🧩'
    },
    {
      id: '4',
      title: 'Folk Art Quiz Master',
      description: 'Test your knowledge about Indian folk art forms and artists',
      ageGroup: 'all',
      difficulty: 'intermediate',
      category: 'quiz',
      estimatedTime: 7,
      artForm: 'Mixed',
      isCompleted: false,
      maxScore: 200,
      thumbnail: '❓'
    },
    {
      id: '5',
      title: 'Art Form Memory Game',
      description: 'Match different art forms and learn about their unique characteristics',
      ageGroup: 'all',
      difficulty: 'beginner',
      category: 'memory',
      estimatedTime: 4,
      artForm: 'Mixed',
      isCompleted: false,
      maxScore: 80,
      thumbnail: '🧠'
    },
    {
      id: '6',
      title: 'Creative Art Studio',
      description: 'Create your own folk art masterpiece using digital tools',
      ageGroup: 'all',
      difficulty: 'advanced',
      category: 'creative',
      estimatedTime: 15,
      artForm: 'Mixed',
      isCompleted: false,
      maxScore: 300,
      thumbnail: '🎨'
    }
  ];

  // Mock data for learning modules (fallback when backend is not available)
  const mockLearningModules: LearningModule[] = [
    {
      id: '1',
      title: 'Introduction to Warli Art',
      description: 'Learn about the ancient tribal art form from Maharashtra',
      ageGroup: 'all',
      artForm: 'Warli',
      duration: 10,
      isCompleted: false,
      progress: 0,
      thumbnail: '🏺'
    },
    {
      id: '2',
      title: 'Madhubani Painting Basics',
      description: 'Discover the colorful world of Madhubani art from Bihar',
      ageGroup: 'all',
      artForm: 'Madhubani',
      duration: 15,
      isCompleted: false,
      progress: 0,
      thumbnail: '🎨'
    },
    {
      id: '3',
      title: 'Pithora Art History',
      description: 'Explore the rich cultural heritage of Pithora art',
      ageGroup: 'all',
      artForm: 'Pithora',
      duration: 12,
      isCompleted: false,
      progress: 0,
      thumbnail: '🏛️'
    },
    {
      id: '4',
      title: 'Gond Art Traditions',
      description: 'Discover the vibrant Gond tribal art from Madhya Pradesh',
      ageGroup: 'all',
      artForm: 'Gond',
      duration: 12,
      isCompleted: false,
      progress: 0,
      thumbnail: '🌳'
    },
    {
      id: '5',
      title: 'Kalamkari Textile Art',
      description: 'Learn about the ancient hand-painted textile art from Andhra Pradesh',
      ageGroup: 'all',
      artForm: 'Kalamkari',
      duration: 15,
      isCompleted: false,
      progress: 0,
      thumbnail: '🧵'
    },
    {
      id: '6',
      title: 'Folk Art Around India',
      description: 'Journey through different folk art forms across India',
      ageGroup: 'all',
      artForm: 'Mixed',
      duration: 20,
      isCompleted: false,
      progress: 0,
      thumbnail: '🗺️'
    }
  ];

  // Get backend data or fallback to mock data
  const games = (gamesData?.data as any)?.games || mockGames;
  const learningModules = (modulesData?.data as any)?.modules || mockLearningModules;
  const leaderboard = (leaderboardData?.data as any)?.leaderboard || [];
  const userProgress = user?.gameStats || {
    gamesPlayed: 0,
    modulesCompleted: 0,
    totalScore: 0,
    averageScore: 0
  };

  // Art facts for different art forms
  const artFacts = {
    'Warli': [
      "Warli art originated from the Warli tribe in Maharashtra, India, over 2,500 years ago!",
      "Traditional Warli paintings are made using only white paint on a red ochre background.",
      "Warli art depicts daily life activities like farming, fishing, dancing, and hunting.",
      "The art form uses basic geometric shapes: circles, triangles, and squares.",
      "Warli paintings are often created during festivals and special occasions."
    ],
    'Madhubani': [
      "Madhubani art originated in the Mithila region of Bihar, India!",
      "This art form was traditionally practiced by women on walls and floors.",
      "Madhubani paintings feature bright colors and intricate patterns.",
      "The art form often depicts Hindu deities and mythological stories.",
      "Madhubani art is now recognized as a protected geographical indication (GI)."
    ],
    'Pithora': [
      "Pithora art is a sacred tribal art form from Gujarat and Madhya Pradesh!",
      "These paintings are created during important ceremonies and rituals.",
      "Pithora art tells stories of gods, ancestors, and tribal mythology.",
      "The paintings are made using natural colors and traditional techniques.",
      "Pithora art is considered a form of prayer and spiritual expression."
    ],
    'Gond': [
      "Gond art comes from the Gond tribe of Madhya Pradesh, India!",
      "This art form features vibrant colors and nature-inspired motifs.",
      "Gond artists use dots and lines to create intricate patterns.",
      "The art form often depicts animals, birds, and tribal life.",
      "Gond art is now popular worldwide and has been adapted to modern themes."
    ],
    'Kalamkari': [
      "Kalamkari is an ancient hand-painted textile art from Andhra Pradesh!",
      "The name 'Kalamkari' means 'pen work' in Persian language.",
      "This art form uses natural dyes and traditional block printing techniques.",
      "Kalamkari textiles often feature mythological stories and nature motifs.",
      "The art form has been practiced for over 3,000 years!"
    ]
  };

  // Warli art facts for celebration
  const warliFacts = [
    "Warli art originated from the Warli tribe in Maharashtra, India, over 2,500 years ago!",
    "Traditional Warli paintings are made using only white paint on a red ochre background.",
    "Warli art depicts daily life activities like farming, fishing, dancing, and hunting.",
    "The art form uses basic geometric shapes: circles, triangles, and squares.",
    "Warli paintings are often created during festivals and special occasions.",
    "The art form was traditionally practiced only by women in the Warli community.",
    "Warli art tells stories without using any written words - it's pure visual storytelling!",
    "The circular patterns in Warli art represent the cycle of life and nature.",
    "Warli artists use rice paste mixed with water and gum to create their paintings.",
    "This ancient art form was discovered by the outside world only in the 1970s!",
    "Warli paintings often show the 'Tarpa dance' - a traditional tribal dance.",
    "The art form is considered sacred and is used in religious ceremonies.",
    "Warli art is now recognized as a protected geographical indication (GI) in India.",
    "Modern Warli artists have adapted the art form to contemporary themes and colors.",
    "The art form is passed down from generation to generation through oral tradition."
  ];

  const handleGameStart = async (game: Game) => {
    setActiveGame(game);
    setGameScore(0);
    setGameTime(0);
    setIsGameActive(true);
    
    // Fetch and show art fact for the specific art form
    try {
      // Use the useArtFacts hook to get fresh facts from backend
      const artFactsQuery = useArtFacts(game.artForm);
      if ((artFactsQuery.data?.data as any)?.fact) {
        setCurrentArtFact((artFactsQuery.data.data as any).fact);
      } else {
        // Fallback to local facts
        const facts = artFacts[game.artForm as keyof typeof artFacts] || artFacts['Warli'];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        setCurrentArtFact(randomFact);
      }
      setShowArtFact(true);
    } catch (error) {
      // Fallback to local facts on error
      const facts = artFacts[game.artForm as keyof typeof artFacts] || artFacts['Warli'];
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setCurrentArtFact(randomFact);
      setShowArtFact(true);
    }
    
    // Initialize Warli bead game if it's the Warli pattern match game
    if (game.title === 'Warli Art Pattern Match') {
      initializeWarliGame();
    }
  };

  const initializeWarliGame = () => {
    const colors = ['#8B4513', '#D2691E', '#CD853F', '#F4A460', '#DEB887', '#F5DEB3'];
    const pattern = Array.from({ length: 8 }, () => colors[Math.floor(Math.random() * colors.length)]);
    const shuffledBeads = [...pattern].sort(() => Math.random() - 0.5);
    
    setTargetPattern(pattern);
    setWarliBeads(shuffledBeads);
  };

  const handleBeadDrop = (index: number, color: string) => {
    const newBeads = [...warliBeads];
    const draggedIndex = warliBeads.indexOf(color);
    
    if (draggedIndex !== -1) {
      // Swap beads
      [newBeads[index], newBeads[draggedIndex]] = [newBeads[draggedIndex], newBeads[index]];
      setWarliBeads(newBeads);
      
      // Check if pattern matches
      if (JSON.stringify(newBeads) === JSON.stringify(targetPattern)) {
        setGameScore(prev => prev + 50);
        
        // Show celebration with random fact
        const randomFact = warliFacts[Math.floor(Math.random() * warliFacts.length)];
        setCurrentFact(randomFact);
        setShowCelebration(true);
        
        // Generate new pattern after celebration
        setTimeout(() => {
          setShowCelebration(false);
          initializeWarliGame();
        }, 3000);
      }
    }
    setDraggedBead(null);
  };

  const handleGameComplete = async (finalScore: number) => {
    if (!activeGame) return;
    
    try {
      // Submit score to backend if user is authenticated
      if (isAuthenticated) {
        await submitScoreMutation.mutateAsync({
          contentId: activeGame.id,
          score: finalScore,
          maxScore: activeGame.maxScore,
          timeSpent: gameTime
        });
      }
      
      setActiveGame(null);
      setIsGameActive(false);
    } catch (error) {
      console.error('Failed to submit score:', error);
      // Still close the game even if score submission fails
      setActiveGame(null);
      setIsGameActive(false);
    }
  };

  const handleLearningComplete = (moduleId: string) => {
    // Learning completion is handled through the backend when modules are marked complete
    console.log('Learning module completed:', moduleId);
  };

  const handleLearningModuleClick = (module: LearningModule) => {
    setSelectedModule(module);
    setShowLearningPage(true);
  };

  // Game timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && activeGame) {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, activeGame]);

  // Show loading state while data is being fetched
  if (gamesLoading || modulesLoading || leaderboardLoading) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-800">Loading children's learning content...</p>
        </div>
      </div>
    );
  }

  // All games and modules are now available for all ages
  const filteredGames = games;
  const filteredModules = learningModules;

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
            Children's Learning Corner
          </h1>
                     <p className="text-xl text-amber-800 max-w-3xl mx-auto mb-8">
             Interactive games and learning modules designed to introduce children to traditional Indian folk art forms
           </p>
        </div>
      </section>

             {/* Progress Overview and Leaderboard */}
       <section className="py-12 bg-orange-50">
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Your Progress */}
             <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-0 shadow-lg">
               <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-2xl">
                   <Trophy className="h-6 w-6 text-amber-700" />
                   Your Learning Progress
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="text-center">
                     <div className="text-3xl font-bold text-amber-700">{userProgress.gamesPlayed}</div>
                     <div className="text-sm text-amber-800">Games Played</div>
                   </div>
                   <div className="text-center">
                     <div className="text-3xl font-bold text-orange-700">{userProgress.modulesCompleted}</div>
                     <div className="text-sm text-amber-800">Modules Completed</div>
                   </div>
                   <div className="text-center">
                     <div className="text-3xl font-bold text-amber-600">{userProgress.averageScore}</div>
                     <div className="text-sm text-amber-800">Average Score</div>
                   </div>
                   <div className="text-center">
                     <div className="text-3xl font-bold text-orange-600">{userProgress.totalScore}</div>
                     <div className="text-sm text-amber-800">Total Score</div>
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* Leaderboard */}
             <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-0 shadow-lg">
               <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-2xl">
                   <Crown className="h-6 w-6 text-amber-700" />
                   Top Players
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-3">
                   {leaderboard.map((player, index) => (
                     <div key={player.id || player.username} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                       <div className="flex items-center gap-3">
                         <div className="text-2xl">{player.avatar}</div>
                         <div>
                           <div className="font-semibold text-amber-900">{player.displayName || player.username}</div>
                           <div className="text-sm text-amber-700">Rank #{player.rank}</div>
                         </div>
                       </div>
                       <div className="text-right">
                         <div className="font-bold text-amber-700">{player.totalScore}</div>
                         <div className="text-sm text-amber-600">points</div>
                       </div>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>
           </div>
         </div>
       </section>

      {/* Games and Learning Tabs */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="games" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="games" className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Games
              </TabsTrigger>
              <TabsTrigger value="learning" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Learning Modules
              </TabsTrigger>
            </TabsList>

            <TabsContent value="games" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <Card key={game.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4 text-center">{game.thumbnail}</div>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant={game.difficulty === 'beginner' ? 'default' : 'secondary'}>
                          {game.difficulty}
                        </Badge>
                        <Badge variant="outline">{game.artForm}</Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {game.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        {game.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {game.estimatedTime} min
                        </span>
                        <span>{game.category}</span>
                      </div>
                      
                      {game.isCompleted && game.score !== undefined && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-800">Completed!</span>
                            <span className="text-sm text-green-600">
                              Score: {game.score}/{game.maxScore}
                            </span>
                          </div>
                          <Progress value={(game.score / game.maxScore) * 100} className="mt-2" />
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => handleGameStart(game)}
                        className="w-full"
                        disabled={isGameActive}
                      >
                        {game.isCompleted ? 'Play Again' : 'Start Game'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModules.map((module) => (
                  <Card key={module.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4 text-center">{module.thumbnail}</div>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">{module.ageGroup}</Badge>
                        <Badge variant="secondary">{module.artForm}</Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {module.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        {module.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>Duration: {module.duration} min</span>
                        <span>{module.progress}% Complete</span>
                      </div>
                      
                      <Progress value={module.progress} className="mb-4" />
                      
                                             <Button 
                         onClick={() => handleLearningModuleClick(module)}
                         className="w-full"
                         variant={module.isCompleted ? "outline" : "default"}
                       >
                         {module.isCompleted ? 'Completed' : 'Continue Learning'}
                       </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Active Game Modal */}
      {activeGame && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{activeGame.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveGame(null)}
                >
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Score: {gameScore}</span>
                <span>Time: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}</span>
              </div>
              
              <div className="h-96 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-6">
                {activeGame.id === '1' ? (
                  // Warli Bead Pattern Game
                  <div className="h-full flex flex-col">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-amber-900 mb-2">Warli Bead Pattern Match</h3>
                      <p className="text-sm text-amber-800">Arrange the beads to match the target pattern</p>
                    </div>
                    
                    {/* Target Pattern */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-amber-900 mb-2">Target Pattern:</p>
                      <div className="flex gap-2 justify-center">
                        {targetPattern.map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full border-2 border-amber-800 shadow-md"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Your Pattern */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-amber-900 mb-2">Your Pattern:</p>
                      <div className="flex gap-2 justify-center">
                        {warliBeads.map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full border-2 border-amber-800 shadow-md cursor-pointer hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            draggable
                            onDragStart={() => setDraggedBead(color)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleBeadDrop(index, draggedBead || '')}
                            onClick={() => {
                              // Simple click-to-swap for mobile/accessibility
                              if (draggedBead) {
                                handleBeadDrop(index, draggedBead);
                              } else {
                                setDraggedBead(color);
                              }
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-lg font-semibold text-amber-900">Score: {gameScore}</p>
                      <p className="text-sm text-amber-800 mt-1">Drag and drop beads or click to select and place</p>
                    </div>
                  </div>
                ) : (
                  // Default game interface for other games
                  <div className="text-center h-full flex flex-col justify-center">
                    <div className="text-6xl mb-4">{activeGame.thumbnail}</div>
                    <p className="text-lg font-medium text-amber-900 mb-2">Game Interface</p>
                    <p className="text-sm text-amber-800 mb-4">Score: {gameScore}</p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={() => setGameScore(prev => prev + 10)}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        +10 Points
                      </Button>
                      <Button
                        onClick={() => setGameScore(prev => prev + 25)}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        +25 Points
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => handleGameComplete(gameScore)}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                >
                  Complete Game
                </Button>
                <Button
                  onClick={() => {
                    setGameScore(0);
                    setGameTime(0);
                  }}
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">Excellent!</h3>
                <p className="text-lg text-amber-800 mb-4">Pattern Matched!</p>
                <div className="text-3xl font-bold text-amber-700 mb-4">+50 Points</div>
              </div>
              
              <div className="bg-white/80 rounded-lg p-4 mb-6">
                <div className="text-2xl mb-3">🏺</div>
                <h4 className="text-lg font-semibold text-amber-900 mb-2">Warli Art Fact!</h4>
                <p className="text-sm text-amber-800 leading-relaxed">
                  {currentFact}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setShowCelebration(false);
                    initializeWarliGame();
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                >
                  Next Pattern
                </Button>
                <Button
                  onClick={() => setShowCelebration(false)}
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-100"
                >
                  Continue Playing
                </Button>
              </div>
            </CardContent>
                     </Card>
         </div>
       )}

       {/* Art Fact Modal */}
       {showArtFact && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <Card className="w-full max-w-md bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300">
             <CardContent className="p-8 text-center">
               <div className="mb-6">
                 <div className="text-4xl mb-4">🎨</div>
                 <h3 className="text-xl font-bold text-amber-900 mb-4">Fun Art Fact!</h3>
                 <p className="text-sm text-amber-800 leading-relaxed mb-6">
                   {currentArtFact}
                 </p>
               </div>
               
               <Button
                 onClick={() => setShowArtFact(false)}
                 className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
               >
                 OK, Let's Play!
               </Button>
             </CardContent>
           </Card>
         </div>
       )}

       {/* Learning Module Page */}
       {showLearningPage && selectedModule && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300">
             <CardHeader>
               <CardTitle className="flex items-center justify-between">
                 <span className="text-2xl text-amber-900">{selectedModule.title}</span>
                 <Button
                   variant="ghost"
                   size="sm"
                   onClick={() => setShowLearningPage(false)}
                 >
                   ✕
                 </Button>
               </CardTitle>
             </CardHeader>
             <CardContent className="p-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Left Column - Information */}
                 <div className="space-y-6">
                   <div>
                     <h3 className="text-xl font-semibold text-amber-900 mb-3">Introduction</h3>
                     <p className="text-amber-800 leading-relaxed">
                       {selectedModule.artForm === 'Warli' && 
                         "Warli art is one of the oldest tribal art forms in India, originating from the Warli tribe in Maharashtra. This ancient art form uses simple geometric shapes to tell stories of daily life, nature, and tribal culture."
                       }
                       {selectedModule.artForm === 'Madhubani' && 
                         "Madhubani art, also known as Mithila painting, is a traditional art form from the Mithila region of Bihar. It features vibrant colors and intricate patterns, often depicting Hindu deities and mythological stories."
                       }
                       {selectedModule.artForm === 'Pithora' && 
                         "Pithora art is a sacred tribal art form practiced by the Rathwa, Bhil, and Nayak tribes of Gujarat and Madhya Pradesh. These paintings are created during important ceremonies and rituals."
                       }
                       {selectedModule.artForm === 'Gond' && 
                         "Gond art comes from the Gond tribe of Madhya Pradesh and features vibrant colors with nature-inspired motifs. Artists use dots and lines to create intricate patterns depicting animals, birds, and tribal life."
                       }
                       {selectedModule.artForm === 'Kalamkari' && 
                         "Kalamkari is an ancient hand-painted textile art from Andhra Pradesh. The name means 'pen work' in Persian, and it uses natural dyes and traditional block printing techniques."
                       }
                     </p>
                   </div>

                   <div>
                     <h3 className="text-xl font-semibold text-amber-900 mb-3">History & Origin</h3>
                     <p className="text-amber-800 leading-relaxed">
                       {selectedModule.artForm === 'Warli' && 
                         "Warli art dates back over 2,500 years and was traditionally practiced by women in the Warli community. It was discovered by the outside world only in the 1970s and has since gained international recognition."
                       }
                       {selectedModule.artForm === 'Madhubani' && 
                         "Madhubani art has been practiced for centuries, traditionally by women who painted walls and floors during festivals and ceremonies. It gained national recognition in the 1960s and is now a protected GI."
                       }
                       {selectedModule.artForm === 'Pithora' && 
                         "Pithora art has been passed down through generations and is deeply connected to tribal spirituality and mythology. It's considered a form of prayer and spiritual expression."
                       }
                       {selectedModule.artForm === 'Gond' && 
                         "Gond art has evolved over centuries, originally created as a form of storytelling and spiritual expression. Modern Gond artists have adapted the art form to contemporary themes while preserving traditional techniques."
                       }
                       {selectedModule.artForm === 'Kalamkari' && 
                         "Kalamkari has been practiced for over 3,000 years, with evidence found in ancient temples and texts. The art form flourished during the Mughal era and continues to be practiced today."
                       }
                     </p>
                   </div>

                   <div>
                     <h3 className="text-xl font-semibold text-amber-900 mb-3">Common Museums</h3>
                     <ul className="text-amber-800 space-y-2">
                       {selectedModule.artForm === 'Warli' && (
                         <>
                           <li>• National Museum, New Delhi</li>
                           <li>• Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mumbai</li>
                           <li>• Tribal Museum, Bhopal</li>
                         </>
                       )}
                       {selectedModule.artForm === 'Madhubani' && (
                         <>
                           <li>• Bihar Museum, Patna</li>
                           <li>• National Museum, New Delhi</li>
                           <li>• Mithila Museum, Darbhanga</li>
                         </>
                       )}
                       {selectedModule.artForm === 'Pithora' && (
                         <>
                           <li>• Tribal Museum, Ahmedabad</li>
                           <li>• National Museum, New Delhi</li>
                           <li>• Gujarat State Museum, Vadodara</li>
                         </>
                       )}
                       {selectedModule.artForm === 'Gond' && (
                         <>
                           <li>• Tribal Museum, Bhopal</li>
                           <li>• National Museum, New Delhi</li>
                           <li>• Indira Gandhi Rashtriya Manav Sangrahalaya, Bhopal</li>
                         </>
                       )}
                       {selectedModule.artForm === 'Kalamkari' && (
                         <>
                           <li>• Salar Jung Museum, Hyderabad</li>
                           <li>• National Museum, New Delhi</li>
                           <li>• Victoria Memorial Hall, Kolkata</li>
                         </>
                       )}
                     </ul>
                   </div>

                   <div>
                     <h3 className="text-xl font-semibold text-amber-900 mb-3">Usage & Applications</h3>
                     <p className="text-amber-800 leading-relaxed">
                       {selectedModule.artForm === 'Warli' && 
                         "Warli art is used in festivals, ceremonies, and storytelling. Modern applications include home decor, clothing, and contemporary art installations."
                       }
                       {selectedModule.artForm === 'Madhubani' && 
                         "Madhubani art is used in religious ceremonies, festivals, and home decoration. It's also applied to textiles, paper, and canvas for commercial purposes."
                       }
                       {selectedModule.artForm === 'Pithora' && 
                         "Pithora art is primarily used in religious ceremonies and rituals. It's considered sacred and is often created as offerings to deities."
                       }
                       {selectedModule.artForm === 'Gond' && 
                         "Gond art is used in storytelling, spiritual expression, and cultural preservation. Modern applications include contemporary art, home decor, and fashion."
                       }
                       {selectedModule.artForm === 'Kalamkari' && 
                         "Kalamkari is primarily used in textile decoration, creating beautiful fabrics for clothing, home furnishings, and religious textiles."
                       }
                     </p>
                   </div>
                 </div>

                 {/* Right Column - Visual */}
                 <div className="space-y-6">
                   <div className="text-center">
                     <div className="text-8xl mb-4">{selectedModule.thumbnail}</div>
                     <h4 className="text-lg font-semibold text-amber-900">{selectedModule.artForm} Art</h4>
                   </div>
                   
                   <div className="bg-white/80 rounded-lg p-6">
                     <h4 className="text-lg font-semibold text-amber-900 mb-3">Key Features</h4>
                     <ul className="text-amber-800 space-y-2">
                       {selectedModule.artForm === 'Warli' && (
                         <>
                           <li>• Simple geometric shapes</li>
                           <li>• White paint on red ochre background</li>
                           <li>• Depicts daily life activities</li>
                           <li>• Traditional rice paste medium</li>
                         </>
                       )}
                       {selectedModule.artForm === 'Madhubani' && (
                         <>
                           <li>• Bright, vibrant colors</li>
                           <li>• Intricate patterns and designs</li>
                           <li>• Mythological themes</li>
                           <li>• Natural dyes and materials</li>
                         </>
                       )}
                       {selectedModule.artForm === 'Pithora' && (
                         <>
                           <li>• Sacred and spiritual themes</li>
                           <li>• Natural colors and materials</li>
                           <li>• Ritualistic creation process</li>
                           <li>• Tribal mythology stories</li>
                         </>
                       )}
                       {selectedModule.artForm === 'Gond' && (
                         <>
                           <li>• Dots and lines technique</li>
                           <li>• Nature-inspired motifs</li>
                           <li>• Vibrant color palette</li>
                           <li>• Animal and bird depictions</li>
                         </>
                       )}
                       {selectedModule.artForm === 'Kalamkari' && (
                         <>
                           <li>• Hand-painted textiles</li>
                           <li>• Natural dye techniques</li>
                           <li>• Mythological narratives</li>
                           <li>• Traditional block printing</li>
                         </>
                       )}
                     </ul>
                   </div>

                   <div className="text-center">
                     <Button
                       onClick={() => {
                         setShowLearningPage(false);
                         handleLearningComplete(selectedModule.id);
                       }}
                       className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                     >
                       Mark as Completed
                     </Button>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>
       )}
     </div>
   );
 };

 export default Children;
