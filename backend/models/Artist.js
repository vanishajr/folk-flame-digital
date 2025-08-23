const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
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
  artType: {
    type: String,
    required: [true, 'Art type is required'],
    enum: ['Painting', 'Sculpture', 'Photography', 'Handicraft', 'Digital Art', 'Others']
  },
  otherArtType: {
    type: String,
    trim: true,
    maxlength: [100, 'Other art type cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Art description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  profilePicture: {
    type: String,
    default: null
  },
  portfolioImages: [{
    type: String
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    default: null
  },
  verificationExpires: {
    type: Date,
    default: null
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  totalSales: {
    type: Number,
    default: 0
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  kycVerified: {
    type: Boolean,
    default: false
  },
  kycDocuments: [{
    documentType: String,
    documentUrl: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for better query performance
artistSchema.index({ artType: 1, isVerified: 1, isActive: 1 });
artistSchema.index({ rating: -1, totalSales: -1 });

module.exports = mongoose.model('Artist', artistSchema);
