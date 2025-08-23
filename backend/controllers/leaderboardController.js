// Mock leaderboard data for demo purposes
let mockLeaderboard = [
  {
    id: '1',
    username: 'ArtMaster2024',
    displayName: 'Priya Sharma',
    totalScore: 2850,
    gamesPlayed: 25,
    averageScore: 114,
    rank: 1,
    lastActive: new Date().toISOString()
  },
  {
    id: '2',
    username: 'CreativeKid',
    displayName: 'Arjun Patel',
    totalScore: 2340,
    gamesPlayed: 20,
    averageScore: 117,
    rank: 2,
    lastActive: new Date().toISOString()
  },
  {
    id: '3',
    username: 'WarliWarrior',
    displayName: 'Maya Desai',
    totalScore: 1980,
    gamesPlayed: 18,
    averageScore: 110,
    rank: 3,
    lastActive: new Date().toISOString()
  },
  {
    id: '4',
    username: 'ArtExplorer',
    displayName: 'Rohan Kumar',
    totalScore: 1650,
    gamesPlayed: 15,
    averageScore: 110,
    rank: 4,
    lastActive: new Date().toISOString()
  },
  {
    id: '5',
    username: 'MadhubaniMagic',
    displayName: 'Zara Khan',
    totalScore: 1420,
    gamesPlayed: 12,
    averageScore: 118,
    rank: 5,
    lastActive: new Date().toISOString()
  }
];

const submitScore = async (req, res) => {
  try {
    const { gameId, score, timeSpent } = req.body;
    const userId = req.headers['user-id'] || '1'; // Mock user ID
    
    // Find existing user in leaderboard
    let userEntry = mockLeaderboard.find(entry => entry.id === userId);
    
    if (userEntry) {
      // Update existing user
      userEntry.totalScore += score;
      userEntry.gamesPlayed += 1;
      userEntry.averageScore = Math.round(userEntry.totalScore / userEntry.gamesPlayed);
      userEntry.lastActive = new Date().toISOString();
    } else {
      // Create new user entry
      userEntry = {
        id: userId,
        username: `User${userId}`,
        displayName: `User ${userId}`,
        totalScore: score,
        gamesPlayed: 1,
        averageScore: score,
        rank: 0,
        lastActive: new Date().toISOString()
      };
      mockLeaderboard.push(userEntry);
    }
    
    // Recalculate ranks
    mockLeaderboard.sort((a, b) => b.totalScore - a.totalScore);
    mockLeaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });
    
    res.json({
      success: true,
      message: 'Score submitted successfully',
      data: {
        userRank: userEntry.rank,
        totalScore: userEntry.totalScore,
        gamesPlayed: userEntry.gamesPlayed,
        averageScore: userEntry.averageScore
      }
    });
  } catch (error) {
    console.error('Submit score error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    
    const limitedLeaderboard = mockLeaderboard
      .slice(parseInt(offset), parseInt(offset) + parseInt(limit))
      .map(entry => ({
        ...entry,
        rank: entry.rank
      }));
    
    res.json({
      success: true,
      data: {
        leaderboard: limitedLeaderboard,
        total: mockLeaderboard.length,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getUserRank = async (req, res) => {
  try {
    const userId = req.headers['user-id'] || '1'; // Mock user ID
    
    const userEntry = mockLeaderboard.find(entry => entry.id === userId);
    
    if (!userEntry) {
      return res.status(404).json({
        success: false,
        message: 'User not found in leaderboard'
      });
    }
    
    res.json({
      success: true,
      data: {
        rank: userEntry.rank,
        totalScore: userEntry.totalScore,
        gamesPlayed: userEntry.gamesPlayed,
        averageScore: userEntry.averageScore,
        lastActive: userEntry.lastActive
      }
    });
  } catch (error) {
    console.error('Get user rank error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  submitScore,
  getLeaderboard,
  getUserRank
};
