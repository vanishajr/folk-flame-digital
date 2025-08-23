const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  profile: {
    displayName: {
      type: String,
      default: function() { return this.username; }
    },
    avatar: {
      type: String,
      default: '👧'
    },
    parentEmail: {
      type: String,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid parent email']
    }
  },
  gameStats: {
    totalScore: {
      type: Number,
      default: 0
    },
    gamesPlayed: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    modulesCompleted: {
      type: Number,
      default: 0
    },
    achievements: [{
      type: String
    }],
    lastActive: {
      type: Date,
      default: Date.now
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update game stats
userSchema.methods.updateGameStats = function(gameScore) {
  this.gameStats.gamesPlayed += 1;
  this.gameStats.totalScore += gameScore;
  this.gameStats.averageScore = Math.round(this.gameStats.totalScore / this.gameStats.gamesPlayed);
  this.gameStats.lastActive = new Date();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
