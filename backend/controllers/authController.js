// Mock user data for demo purposes
const mockUsers = [
  {
    id: '1',
    uid: 'demo-user-1',
    username: 'demo_user',
    email: 'demo@example.com',
    password: 'password123',
    profile: {
      displayName: 'Demo User',
      avatar: 'https://via.placeholder.com/150',
      parentEmail: 'parent@example.com'
    },
    gameStats: {
      totalScore: 1250,
      gamesPlayed: 15,
      averageScore: 83,
      modulesCompleted: 8,
      achievements: ['First Game', 'Learning Champion', 'Art Explorer'],
      lastActive: new Date().toISOString()
    }
  }
];

// Mock JWT token for demo
const generateMockToken = (user) => {
  return `mock_jwt_token_${user.id}_${Date.now()}`;
};

// Google login endpoint
const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    
    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'Firebase ID token is required'
      });
    }

    // In a real implementation, this would be handled by the firebaseAuth middleware
    // For now, we'll simulate the token verification
    console.log('🔐 Processing Google login with Firebase ID token');
    
    // Mock user data for demo (in real app, this comes from Firebase)
    const mockFirebaseUser = {
      uid: 'google-user-' + Date.now(),
      email: 'user@gmail.com',
      emailVerified: true,
      displayName: 'Google User',
      photoURL: 'https://via.placeholder.com/150',
      providerId: 'google.com'
    };

    // Check if user exists in our system
    let user = mockUsers.find(u => u.uid === mockFirebaseUser.uid);
    
    if (!user) {
      // Create new user
      user = {
        id: (mockUsers.length + 1).toString(),
        uid: mockFirebaseUser.uid,
        username: mockFirebaseUser.displayName?.toLowerCase().replace(/\s+/g, '_') || 'user',
        email: mockFirebaseUser.email,
        profile: {
          displayName: mockFirebaseUser.displayName || 'New User',
          avatar: mockFirebaseUser.photoURL || 'https://via.placeholder.com/150',
          parentEmail: null
        },
        gameStats: {
          totalScore: 0,
          gamesPlayed: 0,
          averageScore: 0,
          modulesCompleted: 0,
          achievements: [],
          lastActive: new Date().toISOString()
        }
      };
      
      mockUsers.push(user);
      console.log('✅ New user created:', user.profile.displayName);
    } else {
      // Update last login
      user.gameStats.lastActive = new Date().toISOString();
      console.log('✅ Existing user logged in:', user.profile.displayName);
    }

    // Generate session token
    const token = generateMockToken(user);
    
    res.json({
      success: true,
      message: 'Google login successful',
      data: {
        user: { ...user, password: undefined },
        token,
        isNewUser: !user.gameStats.gamesPlayed // Check if this is a new user
      }
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Verify Firebase token endpoint
const verifyToken = async (req, res) => {
  try {
    const { idToken } = req.body;
    
    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'Firebase ID token is required'
      });
    }

    // In a real implementation, this would verify the token with Firebase Admin
    console.log('🔐 Verifying Firebase ID token');
    
    // Mock verification for demo
    const mockVerifiedUser = {
      uid: 'verified-user-' + Date.now(),
      email: 'verified@gmail.com',
      emailVerified: true,
      displayName: 'Verified User',
      photoURL: 'https://via.placeholder.com/150'
    };

    res.json({
      success: true,
      message: 'Token verified successfully',
      data: {
        user: mockVerifiedUser
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, parentEmail } = req.body;
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      uid: 'local-user-' + Date.now(),
      username,
      email,
      password,
      profile: {
        displayName: username,
        avatar: 'https://via.placeholder.com/150',
        parentEmail
      },
      gameStats: {
        totalScore: 0,
        gamesPlayed: 0,
        averageScore: 0,
        modulesCompleted: 0,
        achievements: [],
        lastActive: new Date().toISOString()
      }
    };

    mockUsers.push(newUser);
    
    const token = generateMockToken(newUser);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: { ...newUser, password: undefined },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateMockToken(user);
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: { ...user, password: undefined },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getProfile = async (req, res) => {
  try {
    // In a real app, req.user would come from JWT middleware
    const userId = req.headers['user-id'] || '1'; // Mock user ID
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: { ...user, password: undefined }
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { displayName, avatar, parentEmail } = req.body;
    const userId = req.headers['user-id'] || '1'; // Mock user ID
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user profile
    if (displayName) user.profile.displayName = displayName;
    if (avatar) user.profile.avatar = avatar;
    if (parentEmail) user.profile.parentEmail = parentEmail;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: { ...user, password: undefined }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  register,
  login,
  googleLogin,
  verifyToken,
  getProfile,
  updateProfile
};
