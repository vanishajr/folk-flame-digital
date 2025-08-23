const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Artwork title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Artwork description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Painting', 'Sculpture', 'Photography', 'Handicraft', 'Digital Art', 'Others']
  },
  otherCategory: {
    type: String,
    trim: true,
    maxlength: [100, 'Other category cannot exceed 100 characters']
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  price: {
    amount: {
      type: Number,
      required: [true, 'Price amount is required'],
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      enum: ['INR', 'USD'],
      default: 'INR'
    }
  },
  dimensions: {
    width: {
      type: Number,
      min: 0
    },
    height: {
      type: Number,
      min: 0
    },
    depth: {
      type: Number,
      min: 0
    },
    unit: {
      type: String,
      enum: ['cm', 'inches', 'mm'],
      default: 'cm'
    }
  },
  materials: [{
    type: String,
    trim: true
  }],
  yearCreated: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear()
  },
  isOriginal: {
    type: Boolean,
    default: true
  },
  edition: {
    type: String,
    trim: true
  },
  condition: {
    type: String,
    enum: ['New', 'Excellent', 'Very Good', 'Good', 'Fair'],
    default: 'New'
  },
  shippingInfo: {
    weight: {
      type: Number,
      min: 0
    },
    weightUnit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg'
    },
    shippingCost: {
      type: Number,
      min: 0,
      default: 0
    },
    shippingCurrency: {
      type: String,
      enum: ['INR', 'USD'],
      default: 'INR'
    },
    estimatedDelivery: {
      type: Number, // days
      min: 1,
      default: 7
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Reserved', 'Hidden'],
    default: 'Available'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  featuredUntil: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for better query performance
artworkSchema.index({ artistId: 1, status: 1, isActive: 1 });
artworkSchema.index({ category: 1, status: 1, isActive: 1 });
artworkSchema.index({ price: 1, status: 1, isActive: 1 });
artworkSchema.index({ featured: 1, status: 1, isActive: 1 });
artworkSchema.index({ tags: 1, status: 1, isActive: 1 });

// Virtual for total likes count
artworkSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Virtual for total wishlist count
artworkSchema.virtual('wishlistCount').get(function() {
  return this.wishlist.length;
});

// Ensure virtuals are serialized
artworkSchema.set('toJSON', { virtuals: true });
artworkSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Artwork', artworkSchema);
