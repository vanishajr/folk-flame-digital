const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  maxScore: {
    type: Number,
    required: true
  },
  timeSpent: {
    type: Number, // in seconds
    required: true,
    min: 0
  },
  isCompleted: {
    type: Boolean,
    default: true
  },
  achievements: [{
    name: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for efficient leaderboard queries
gameSessionSchema.index({ score: -1, createdAt: -1 });
gameSessionSchema.index({ user: 1, content: 1 });

module.exports = mongoose.model('GameSession', gameSessionSchema);
