// Mock content data for demo purposes
const mockGames = [
  {
    id: '1',
    name: 'Warli Art Bead Match',
    description: 'Match colorful beads to create beautiful Warli art patterns',
    category: 'Art & Creativity',
    difficulty: 'Easy',
    minAge: 5,
    maxAge: 12,
    image: 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Warli+Art+Game',
    instructions: 'Drag and drop beads to match the target pattern. Complete the pattern to learn about Warli art!'
  },
  {
    id: '2',
    name: 'Madhubani Pattern Creator',
    description: 'Create intricate Madhubani art patterns with interactive tools',
    category: 'Art & Creativity',
    difficulty: 'Medium',
    minAge: 7,
    maxAge: 15,
    image: 'https://via.placeholder.com/300x200/CD853F/FFFFFF?text=Madhubani+Game',
    instructions: 'Use the pattern tools to create beautiful Madhubani designs. Learn about this ancient art form!'
  },
  {
    id: '3',
    name: 'Pithora Art Explorer',
    description: 'Explore the vibrant world of Pithora tribal art',
    category: 'Art & Creativity',
    difficulty: 'Easy',
    minAge: 6,
    maxAge: 14,
    image: 'https://via.placeholder.com/300x200/D2691E/FFFFFF?text=Pithora+Game',
    instructions: 'Discover Pithora art through interactive storytelling and creative activities!'
  }
];

const mockLearningModules = [
  {
    id: '1',
    title: 'Introduction to Warli Art',
    description: 'Learn about the ancient tribal art form from Maharashtra',
    category: 'Art History',
    difficulty: 'Beginner',
    duration: '15 minutes',
    image: 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Warli+Art',
    sections: [
      { title: 'Introduction', content: 'Warli art is a tribal art form that originated in Maharashtra, India.' },
      { title: 'History', content: 'This art form dates back to 2500 BCE and is practiced by the Warli tribe.' },
      { title: 'Museums', content: 'Visit the Tribal Museum in Pune to see authentic Warli art collections.' },
      { title: 'Origin', content: 'Warli art originated in the mountainous and coastal regions of Maharashtra.' },
      { title: 'Usage', content: 'Traditionally used to decorate walls during festivals and celebrations.' }
    ]
  },
  {
    id: '2',
    title: 'Madhubani Art Masterclass',
    description: 'Discover the rich heritage of Madhubani painting from Bihar',
    category: 'Art History',
    difficulty: 'Intermediate',
    duration: '20 minutes',
    image: 'https://via.placeholder.com/300x200/CD853F/FFFFFF?text=Madhubani+Art',
    sections: [
      { title: 'Introduction', content: 'Madhubani art is a traditional painting style from the Mithila region of Bihar.' },
      { title: 'History', content: 'This art form has been practiced for centuries and is deeply rooted in Hindu mythology.' },
      { title: 'Museums', content: 'The National Museum in Delhi houses several Madhubani masterpieces.' },
      { title: 'Origin', content: 'Originated in the ancient kingdom of Mithila, now part of Bihar and Nepal.' },
      { title: 'Usage', content: 'Used for wall paintings, floor art, and religious ceremonies.' }
    ]
  },
  {
    id: '3',
    title: 'Pithora Art Journey',
    description: 'Explore the colorful world of Pithora tribal art from Gujarat',
    category: 'Art History',
    difficulty: 'Beginner',
    duration: '18 minutes',
    image: 'https://via.placeholder.com/300x200/D2691E/FFFFFF?text=Pithora+Art',
    sections: [
      { title: 'Introduction', content: 'Pithora art is a ritualistic painting tradition of the Rathwa tribe in Gujarat.' },
      { title: 'History', content: 'This art form is believed to be over 1000 years old and is deeply spiritual.' },
      { title: 'Museums', content: 'The Tribal Museum in Ahmedabad showcases beautiful Pithora art collections.' },
      { title: 'Origin', content: 'Originated in the tribal regions of eastern Gujarat, particularly in the Panchmahal district.' },
      { title: 'Usage', content: 'Created during important ceremonies and rituals to invoke blessings.' }
    ]
  }
];

const mockArtFacts = [
  {
    id: '1',
    artForm: 'Warli Art',
    fact: 'Warli art uses only three basic shapes: circle, triangle, and square, representing the sun, mountains, and earth respectively.',
    difficulty: 'Easy'
  },
  {
    id: '2',
    artForm: 'Warli Art',
    fact: 'Traditional Warli paintings are made using rice paste and natural pigments on mud walls.',
    difficulty: 'Easy'
  },
  {
    id: '3',
    artForm: 'Warli Art',
    fact: 'Warli art often depicts scenes from daily life, festivals, and nature, showing the tribe\'s close connection to the environment.',
    difficulty: 'Medium'
  },
  {
    id: '4',
    artForm: 'Madhubani Art',
    fact: 'Madhubani art is traditionally created by women and is passed down from mother to daughter.',
    difficulty: 'Easy'
  },
  {
    id: '5',
    artForm: 'Madhubani Art',
    fact: 'The art form uses natural colors derived from flowers, leaves, and minerals.',
    difficulty: 'Medium'
  },
  {
    id: '6',
    artForm: 'Pithora Art',
    fact: 'Pithora paintings are considered sacred and are believed to bring good fortune and protection.',
    difficulty: 'Easy'
  }
];

const getGames = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        games: mockGames
      }
    });
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getLearningModules = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        modules: mockLearningModules
      }
    });
  } catch (error) {
    console.error('Get learning modules error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getArtFacts = async (req, res) => {
  try {
    const { artForm, difficulty } = req.query;
    
    let filteredFacts = mockArtFacts;
    
    if (artForm) {
      filteredFacts = filteredFacts.filter(fact => fact.artForm === artForm);
    }
    
    if (difficulty) {
      filteredFacts = filteredFacts.filter(fact => fact.difficulty === difficulty);
    }
    
    res.json({
      success: true,
      data: {
        facts: filteredFacts
      }
    });
  } catch (error) {
    console.error('Get art facts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getGames,
  getLearningModules,
  getArtFacts
};
