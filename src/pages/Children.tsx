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
import { useAuth } from "@/contexts/AuthContext";

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

  // Madhubani art guessing game state
  const [currentMadhubaniQuestion, setCurrentMadhubaniQuestion] = useState(0);
  const [madhubaniScore, setMadhubaniScore] = useState(0);
  const [showMadhubaniResult, setShowMadhubaniResult] = useState(false);
  const [showMadhubaniCelebration, setShowMadhubaniCelebration] = useState(false);

  // Pithora bead game state (same as Warli)
  const [pithoraBeads, setPithoraBeads] = useState<string[]>([]);
  const [targetPithoraPattern, setTargetPithoraPattern] = useState<string[]>([]);
  const [draggedPithoraBead, setDraggedPithoraBead] = useState<string | null>(null);
  const [showPithoraCelebration, setShowPithoraCelebration] = useState(false);

  // Folk Art Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Art Form Memory Game state
  const [memoryCards, setMemoryCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [showMemoryCelebration, setShowMemoryCelebration] = useState(false);

  // Creative Art Studio state
  const [drawingCanvas, setDrawingCanvas] = useState<string[][]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('brush');
  const [selectedColorStudio, setSelectedColorStudio] = useState<string>('#8B4513');
  const [showStudioCelebration, setShowStudioCelebration] = useState(false);

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
      title: 'Madhubani Art Detective',
      description: 'Guess different types of Madhubani art forms and learn about their unique characteristics',
      ageGroup: 'all',
      difficulty: 'beginner',
      category: 'quiz',
      estimatedTime: 8,
      artForm: 'Madhubani',
      isCompleted: false,
      maxScore: 100,
      thumbnail: '🎭'
    },
    {
      id: '3',
      title: 'Pithora Art Pattern Match',
      description: 'Match traditional Pithora art patterns and learn about tribal culture',
      ageGroup: 'all',
      difficulty: 'intermediate',
      category: 'memory',
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

  // Folk Art Quiz Questions
  const quizQuestions = [
    {
      question: "Which art form is known for its white geometric patterns on red ochre background?",
      options: ["Madhubani", "Warli", "Pithora", "Gond"],
      correct: "Warli",
      fact: "Warli art uses simple geometric shapes like circles, triangles, and squares to tell stories!"
    },
    {
      question: "Madhubani paintings traditionally depict which themes?",
      options: ["Tribal life", "Hindu deities", "Nature scenes", "Modern art"],
      correct: "Hindu deities",
      fact: "Madhubani art often features Hindu gods, goddesses, and mythological stories!"
    },
    {
      question: "Pithora art is considered sacred and is used during what?",
      options: ["Daily activities", "Religious ceremonies", "Modern exhibitions", "Children's games"],
      correct: "Religious ceremonies",
      fact: "Pithora art is a sacred tribal art form used in important ceremonies and rituals!"
    }
  ];

  // Madhubani Art Guessing Questions
  const madhubaniQuestions = [
    {
      question: "What type of Madhubani art is this?",
      image: "🎭",
      options: ["Kohbar (Wedding)", "Aripan (Floor)", "Godna (Body)", "Bhitti (Wall)"],
      correct: "Kohbar (Wedding)",
      fact: "Kohbar paintings are created during weddings and feature symbols of fertility and prosperity!"
    },
    {
      question: "Identify this Madhubani art style:",
      image: "🏛️",
      options: ["Bhitti (Wall)", "Aripan (Floor)", "Kohbar (Wedding)", "Godna (Body)"],
      correct: "Bhitti (Wall)",
      fact: "Bhitti paintings are created on walls and often depict scenes from Hindu mythology!"
    },
    {
      question: "What is this Madhubani art form called?",
      image: "🌺",
      options: ["Aripan (Floor)", "Kohbar (Wedding)", "Bhitti (Wall)", "Godna (Body)"],
      correct: "Aripan (Floor)",
      fact: "Aripan is floor art created during festivals and ceremonies using rice paste!"
    },
    {
      question: "Which Madhubani art type is this?",
      image: "👁️",
      options: ["Godna (Body)", "Bhitti (Wall)", "Aripan (Floor)", "Kohbar (Wedding)"],
      correct: "Godna (Body)",
      fact: "Godna is traditional body art using natural dyes, often applied during festivals!"
    }
  ];

  // Art form pairs for memory game
  const artFormPairs = [
    "🏺", "🎨", "🏛️", "🌳", "🧵", "🗺️", "🎭", "🧩"
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
    
    // Initialize specific games based on title
    if (game.title === 'Warli Art Pattern Match') {
      initializeWarliGame();
    } else if (game.title === 'Madhubani Color Quest') {
      initializeMadhubaniGame();
    } else if (game.title === 'Pithora Art Puzzle') {
      initializePithoraGame();
    } else if (game.title === 'Folk Art Quiz Master') {
      setCurrentQuestion(0);
      setQuizScore(0);
      setQuizAnswers([]);
      setShowQuizResult(false);
    } else if (game.title === 'Art Form Memory Game') {
      initializeMemoryGame();
    } else if (game.title === 'Creative Art Studio') {
      initializeCreativeStudio();
    }
  };

  const initializeWarliGame = () => {
    const colors = ['#8B4513', '#D2691E', '#CD853F', '#F4A460', '#DEB887', '#F5DEB3'];
    const pattern = Array.from({ length: 8 }, () => colors[Math.floor(Math.random() * colors.length)]);
    const shuffledBeads = [...pattern].sort(() => Math.random() - 0.5);
    
    setTargetPattern(pattern);
    setWarliBeads(shuffledBeads);
  };

  const initializeMadhubaniGame = () => {
    setCurrentMadhubaniQuestion(0);
    setMadhubaniScore(0);
    setShowMadhubaniResult(false);
  };

  const initializePithoraGame = () => {
    const colors = ['#8B4513', '#D2691E', '#CD853F', '#F4A460', '#DEB887', '#F5DEB3'];
    const pattern = Array.from({ length: 8 }, () => colors[Math.floor(Math.random() * colors.length)]);
    const shuffledBeads = [...pattern].sort(() => Math.random() - 0.5);
    
    setTargetPithoraPattern(pattern);
    setPithoraBeads(shuffledBeads);
  };

  const initializeMemoryGame = () => {
    const cards = [...artFormPairs, ...artFormPairs].sort(() => Math.random() - 0.5);
    setMemoryCards(cards);
    setFlippedCards([]);
    setMatchedPairs([]);
  };

  const initializeCreativeStudio = () => {
    const canvas = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => '#FFFFFF'));
    setDrawingCanvas(canvas);
    setSelectedColorStudio('#8B4513');
    setSelectedTool('brush');
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

  // Madhubani Art Guessing Game Handlers
  const handleMadhubaniAnswer = (answer: string) => {
    const isCorrect = answer === madhubaniQuestions[currentMadhubaniQuestion].correct;
    
    if (isCorrect) {
      setMadhubaniScore(prev => prev + 25);
      setGameScore(prev => prev + 25);
    }
    
    setShowMadhubaniResult(true);
    
    // Move to next question after showing result
    setTimeout(() => {
      setShowMadhubaniResult(false);
      if (currentMadhubaniQuestion < madhubaniQuestions.length - 1) {
        setCurrentMadhubaniQuestion(prev => prev + 1);
      } else {
        // Game complete
        setShowMadhubaniCelebration(true);
        setTimeout(() => {
          setShowMadhubaniCelebration(false);
          initializeMadhubaniGame();
        }, 3000);
      }
    }, 2000);
  };

  // Pithora Pattern Game Handlers
  const handlePithoraBeadDrop = (index: number, symbol: string) => {
    const newBeads = [...pithoraBeads];
    const draggedIndex = pithoraBeads.indexOf(symbol);
    
    if (draggedIndex !== -1) {
      // Swap beads
      [newBeads[index], newBeads[draggedIndex]] = [newBeads[draggedIndex], newBeads[index]];
      setPithoraBeads(newBeads);
      
      // Check if pattern matches
      if (JSON.stringify(newBeads) === JSON.stringify(targetPithoraPattern)) {
        setGameScore(prev => prev + 150);
        
        // Show celebration
        setShowPithoraCelebration(true);
        
        // Generate new pattern after celebration
        setTimeout(() => {
          setShowPithoraCelebration(false);
          initializePithoraGame();
        }, 3000);
      }
    }
    setDraggedPithoraBead(null);
  };

  // Folk Art Quiz Handlers
  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuestion] = answer;
    setQuizAnswers(newAnswers);
    
    if (answer === quizQuestions[currentQuestion].correct) {
      setQuizScore(prev => prev + 50);
    }
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowQuizResult(true);
      setGameScore(quizScore + (answer === quizQuestions[currentQuestion].correct ? 50 : 0));
    }
  };

  // Memory Game Handlers
  const handleMemoryCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(index)) {
      return;
    }
    
    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first] === memoryCards[second]) {
        setMatchedPairs(prev => [...prev, first, second]);
        setGameScore(prev => prev + 20);
        
        if (matchedPairs.length + 2 === memoryCards.length) {
          setShowMemoryCelebration(true);
          setTimeout(() => {
            setShowMemoryCelebration(false);
            initializeMemoryGame();
          }, 3000);
        }
      } else {
        setTimeout(() => {
          setFlippedCards(flippedCards.filter(i => i !== first && i !== second));
        }, 1000);
      }
    }
  };

  // Creative Studio Handlers
  const handleCanvasClick = (row: number, col: number) => {
    const newCanvas = [...drawingCanvas];
    newCanvas[row][col] = selectedColorStudio;
    setDrawingCanvas(newCanvas);
  };

  const handleSaveArtwork = () => {
    setGameScore(prev => prev + 200);
    setShowStudioCelebration(true);
    setTimeout(() => {
      setShowStudioCelebration(false);
      initializeCreativeStudio();
    }, 3000);
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
                                 ) : activeGame.id === '2' ? (
                   // Madhubani Art Guessing Game
                   <div className="h-full flex flex-col">
                     <div className="text-center mb-4">
                       <h3 className="text-lg font-semibold text-amber-900 mb-2">Madhubani Art Detective</h3>
                       <p className="text-sm text-amber-800">Guess the type of Madhubani art form</p>
                     </div>
                     
                     {!showMadhubaniResult ? (
                       <div className="space-y-4">
                         <div className="bg-white/80 rounded-lg p-4">
                           <h4 className="text-lg font-semibold text-amber-900 mb-3">
                             Question {currentMadhubaniQuestion + 1} of {madhubaniQuestions.length}
                           </h4>
                           
                           {/* Art Image */}
                           <div className="text-center mb-4">
                             <div className="text-6xl mb-2">{madhubaniQuestions[currentMadhubaniQuestion].image}</div>
                             <p className="text-amber-800 mb-4">{madhubaniQuestions[currentMadhubaniQuestion].question}</p>
                           </div>
                           
                           {/* Answer Options */}
                           <div className="grid grid-cols-2 gap-2">
                             {madhubaniQuestions[currentMadhubaniQuestion].options.map((option, index) => (
                               <Button
                                 key={index}
                                 onClick={() => handleMadhubaniAnswer(option)}
                                 className="text-sm p-2 h-auto"
                                 variant="outline"
                               >
                                 {option}
                               </Button>
                             ))}
                           </div>
                         </div>
                       </div>
                                           ) : (
                        <div className="text-center">
                          <div className="text-4xl mb-4">
                            {madhubaniQuestions[currentMadhubaniQuestion].options.includes(madhubaniQuestions[currentMadhubaniQuestion].correct) ? '✅' : '❌'}
                          </div>
                          <h4 className="text-lg font-semibold text-amber-900 mb-2">
                            {madhubaniQuestions[currentMadhubaniQuestion].options.includes(madhubaniQuestions[currentMadhubaniQuestion].correct) ? 'Correct!' : 'Wrong Answer!'}
                          </h4>
                          <p className="text-amber-800 mb-4">
                            {madhubaniQuestions[currentMadhubaniQuestion].options.includes(madhubaniQuestions[currentMadhubaniQuestion].correct) 
                              ? madhubaniQuestions[currentMadhubaniQuestion].fact 
                              : `The correct answer is: ${madhubaniQuestions[currentMadhubaniQuestion].correct}`
                            }
                          </p>
                          {!madhubaniQuestions[currentMadhubaniQuestion].options.includes(madhubaniQuestions[currentMadhubaniQuestion].correct) && (
                            <p className="text-amber-700 text-sm mb-4">{madhubaniQuestions[currentMadhubaniQuestion].fact}</p>
                          )}
                        </div>
                      )}
                   </div>
                                 ) : activeGame.id === '3' ? (
                   // Pithora Bead Pattern Game (same as Warli)
                   <div className="h-full flex flex-col">
                     <div className="text-center mb-4">
                       <h3 className="text-lg font-semibold text-amber-900 mb-2">Pithora Bead Pattern Match</h3>
                       <p className="text-sm text-amber-800">Arrange the beads to match the target pattern</p>
                     </div>
                     
                     {/* Target Pattern */}
                     <div className="mb-4">
                       <p className="text-sm font-medium text-amber-900 mb-2">Target Pattern:</p>
                       <div className="flex gap-2 justify-center">
                         {targetPithoraPattern.map((color, index) => (
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
                         {pithoraBeads.map((color, index) => (
                           <div
                             key={index}
                             className="w-8 h-8 rounded-full border-2 border-amber-800 shadow-md cursor-pointer hover:scale-110 transition-transform"
                             style={{ backgroundColor: color }}
                             draggable
                             onDragStart={() => setDraggedPithoraBead(color)}
                             onDragOver={(e) => e.preventDefault()}
                             onDrop={() => handlePithoraBeadDrop(index, draggedPithoraBead || '')}
                             onClick={() => {
                               // Simple click-to-swap for mobile/accessibility
                               if (draggedPithoraBead) {
                                 handlePithoraBeadDrop(index, draggedPithoraBead);
                               } else {
                                 setDraggedPithoraBead(color);
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
                ) : activeGame.id === '4' ? (
                  // Folk Art Quiz Master
                  <div className="h-full flex flex-col">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-amber-900 mb-2">Folk Art Quiz Master</h3>
                      <p className="text-sm text-amber-800">Test your knowledge about Indian folk art</p>
                    </div>
                    
                    {!showQuizResult ? (
                      <div className="space-y-4">
                        <div className="bg-white/80 rounded-lg p-4">
                          <h4 className="text-lg font-semibold text-amber-900 mb-3">
                            Question {currentQuestion + 1} of {quizQuestions.length}
                          </h4>
                          <p className="text-amber-800 mb-4">{quizQuestions[currentQuestion].question}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {quizQuestions[currentQuestion].options.map((option, index) => (
                              <Button
                                key={index}
                                onClick={() => handleQuizAnswer(option)}
                                className="text-sm p-2 h-auto"
                                variant="outline"
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl mb-4">🎯</div>
                        <h4 className="text-lg font-semibold text-amber-900 mb-2">Quiz Complete!</h4>
                        <p className="text-amber-800 mb-4">Your Score: {quizScore} points</p>
                        <Button
                          onClick={() => {
                            setShowQuizResult(false);
                            setCurrentQuestion(0);
                            setQuizScore(0);
                            setQuizAnswers([]);
                          }}
                          className="bg-amber-600 hover:bg-amber-700"
                        >
                          Play Again
                        </Button>
                      </div>
                    )}
                  </div>
                ) : activeGame.id === '5' ? (
                  // Art Form Memory Game
                  <div className="h-full flex flex-col">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-amber-900 mb-2">Art Form Memory Game</h3>
                      <p className="text-sm text-amber-800">Find matching pairs of art form symbols</p>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 justify-center">
                      {memoryCards.map((card, index) => (
                        <div
                          key={index}
                          className={`w-12 h-12 rounded border-2 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-2xl ${
                            flippedCards.includes(index) || matchedPairs.includes(index)
                              ? 'bg-amber-200 border-amber-800'
                              : 'bg-amber-100 border-amber-600'
                          }`}
                          onClick={() => handleMemoryCardClick(index)}
                        >
                          {(flippedCards.includes(index) || matchedPairs.includes(index)) ? card : '❓'}
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center mt-4">
                      <p className="text-sm text-amber-800">Matched Pairs: {matchedPairs.length / 2}</p>
                    </div>
                  </div>
                ) : activeGame.id === '6' ? (
                  // Creative Art Studio
                  <div className="h-full flex flex-col">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-amber-900 mb-2">Creative Art Studio</h3>
                      <p className="text-sm text-amber-800">Create your own folk art masterpiece</p>
                    </div>
                    
                    {/* Color Palette */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-amber-900 mb-2">Select Color:</p>
                      <div className="flex gap-2 justify-center flex-wrap">
                        {['#8B4513', '#D2691E', '#CD853F', '#F4A460', '#DEB887', '#F5DEB3', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'].map((color, index) => (
                          <div
                            key={index}
                            className={`w-6 h-6 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform ${
                              selectedColorStudio === color ? 'border-amber-800' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColorStudio(color)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Drawing Canvas */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-amber-900 mb-2">Your Canvas:</p>
                      <div className="grid grid-cols-8 gap-1 justify-center">
                        {drawingCanvas.map((row, rowIndex) =>
                          row.map((cell, colIndex) => (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className="w-6 h-6 rounded border border-amber-800 cursor-pointer hover:scale-110 transition-transform"
                              style={{ backgroundColor: cell }}
                              onClick={() => handleCanvasClick(rowIndex, colIndex)}
                            />
                          ))
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button
                        onClick={handleSaveArtwork}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        Save Artwork
                      </Button>
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

               {/* Madhubani Celebration Modal */}
        {showMadhubaniCelebration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🎭</div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">Excellent!</h3>
                  <p className="text-lg text-amber-800 mb-4">Madhubani Quiz Complete!</p>
                  <div className="text-3xl font-bold text-amber-700 mb-4">+{madhubaniScore} Points</div>
                </div>
                
                <div className="bg-white/80 rounded-lg p-4 mb-6">
                  <div className="text-2xl mb-3">🎨</div>
                  <h4 className="text-lg font-semibold text-amber-900 mb-2">Madhubani Art Fact!</h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Madhubani art is known for its bright colors and intricate patterns, traditionally painted by women on walls and floors during festivals!
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setShowMadhubaniCelebration(false);
                      initializeMadhubaniGame();
                    }}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                  >
                    Play Again
                  </Button>
                  <Button
                    onClick={() => setShowMadhubaniCelebration(false)}
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

                                                               {/* Pithora Celebration Modal */}
          {showPithoraCelebration && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-amber-900 mb-2">Excellent!</h3>
                    <p className="text-lg text-amber-800 mb-4">Pattern Matched!</p>
                    <div className="text-3xl font-bold text-amber-700 mb-4">+150 Points</div>
                  </div>
                  
                  <div className="bg-white/80 rounded-lg p-4 mb-6">
                    <div className="text-2xl mb-3">🏛️</div>
                    <h4 className="text-lg font-semibold text-amber-900 mb-2">Pithora Art Fact!</h4>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      Pithora art is a sacred tribal art form used in religious ceremonies and rituals, telling stories of gods and tribal mythology!
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setShowPithoraCelebration(false);
                        initializePithoraGame();
                      }}
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                    >
                      Next Pattern
                    </Button>
                    <Button
                      onClick={() => setShowPithoraCelebration(false)}
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

       {/* Memory Game Celebration Modal */}
       {showMemoryCelebration && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <Card className="w-full max-w-md bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300">
             <CardContent className="p-8 text-center">
               <div className="mb-6">
                 <div className="text-6xl mb-4">🧠</div>
                 <h3 className="text-2xl font-bold text-amber-900 mb-2">Fantastic!</h3>
                 <p className="text-lg text-amber-800 mb-4">All Pairs Matched!</p>
                 <div className="text-3xl font-bold text-amber-700 mb-4">+{matchedPairs.length * 10} Points</div>
               </div>
               
               <div className="bg-white/80 rounded-lg p-4 mb-6">
                 <div className="text-2xl mb-3">🎨</div>
                 <h4 className="text-lg font-semibold text-amber-900 mb-2">Memory Game Fact!</h4>
                 <p className="text-sm text-amber-800 leading-relaxed">
                   Memory games help improve concentration and pattern recognition - skills that are important for understanding art forms!
                 </p>
               </div>
               
               <div className="flex gap-2">
                 <Button
                   onClick={() => {
                     setShowMemoryCelebration(false);
                     initializeMemoryGame();
                   }}
                   className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                 >
                   Play Again
                 </Button>
                 <Button
                   onClick={() => setShowMemoryCelebration(false)}
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

       {/* Creative Studio Celebration Modal */}
       {showStudioCelebration && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <Card className="w-full max-w-md bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300">
             <CardContent className="p-8 text-center">
               <div className="mb-6">
                 <div className="text-6xl mb-4">🎨</div>
                 <h3 className="text-2xl font-bold text-amber-900 mb-2">Masterpiece!</h3>
                 <p className="text-lg text-amber-800 mb-4">Artwork Saved!</p>
                 <div className="text-3xl font-bold text-amber-700 mb-4">+200 Points</div>
               </div>
               
               <div className="bg-white/80 rounded-lg p-4 mb-6">
                 <div className="text-2xl mb-3">🌟</div>
                 <h4 className="text-lg font-semibold text-amber-900 mb-2">Creative Fact!</h4>
                 <p className="text-sm text-amber-800 leading-relaxed">
                   Creating art helps develop creativity and self-expression. Every artist has their own unique style, just like you!
                 </p>
               </div>
               
               <div className="flex gap-2">
                 <Button
                   onClick={() => {
                     setShowStudioCelebration(false);
                     initializeCreativeStudio();
                   }}
                   className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                 >
                   Create New Art
                 </Button>
                 <Button
                   onClick={() => setShowStudioCelebration(false)}
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
