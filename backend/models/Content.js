const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['game', 'learning_module', 'quiz', 'art_fact'],
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  artForm: {
    type: String,
    enum: ['Warli', 'Madhubani', 'Pithora', 'Gond', 'Kalamkari', 'Mixed'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  category: {
    type: String,
    enum: ['puzzle', 'memory', 'creative', 'quiz'],
    required: function() { return this.type === 'game'; }
  },
  content: {
    // For learning modules
    introduction: String,
    history: String,
    museums: [String],
    usage: String,
    keyFeatures: [String],
    
    // For games
    instructions: String,
    maxScore: Number,
    estimatedTime: Number,
    
    // For quiz
    questions: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String
    }],
    
    // For art facts
    facts: [String]
  },
  thumbnail: {
    type: String,
    default: '🎨'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);
