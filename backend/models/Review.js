const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  artworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Review title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    trim: true,
    maxlength: [1000, 'Review comment cannot exceed 1000 characters']
  },
  images: [{
    type: String
  }],
  helpful: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  reported: {
    type: Boolean,
    default: false
  },
  reportReason: {
    type: String,
    enum: ['Spam', 'Inappropriate', 'Fake', 'Other'],
    default: null
  },
  reportDetails: {
    type: String,
    trim: true,
    maxlength: [500, 'Report details cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Indexes for better query performance
reviewSchema.index({ artistId: 1, isActive: 1 });
reviewSchema.index({ artworkId: 1, isActive: 1 });
reviewSchema.index({ customerId: 1, isActive: 1 });
reviewSchema.index({ rating: 1, isActive: 1 });
reviewSchema.index({ orderId: 1 }, { unique: true }); // One review per order

// Virtual for helpful count
reviewSchema.virtual('helpfulCount').get(function() {
  return this.helpful.length;
});

// Ensure virtuals are serialized
reviewSchema.set('toJSON', { virtuals: true });
reviewSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Review', reviewSchema);
