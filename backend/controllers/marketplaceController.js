const Artist = require('../models/Artist');
const Artwork = require('../models/Artwork');
const Order = require('../models/Order');
const Review = require('../models/Review');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Artist Registration and Authentication
const registerArtist = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      artType,
      otherArtType,
      description,
      profilePicture,
      portfolioImages
    } = req.body;

    // Check if artist already exists
    const existingArtist = await Artist.findOne({ email });
    if (existingArtist) {
      return res.status(400).json({ message: 'Artist with this email already exists' });
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create artist
    const artist = new Artist({
      name,
      email,
      password,
      artType,
      otherArtType: artType === 'Others' ? otherArtType : null,
      description,
      profilePicture,
      portfolioImages: portfolioImages || [],
      verificationToken,
      verificationExpires
    });

    await artist.save();

    // TODO: Send verification email
    // sendVerificationEmail(artist.email, verificationToken);

    res.status(201).json({
      message: 'Artist registered successfully. Please check your email for verification.',
      artistId: artist._id
    });
  } catch (error) {
    console.error('Artist registration error:', error);
    res.status(500).json({ message: 'Error registering artist', error: error.message });
  }
};

const verifyArtistEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const artist = await Artist.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() }
    });

    if (!artist) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    artist.isEmailVerified = true;
    artist.verificationToken = null;
    artist.verificationExpires = null;
    await artist.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Error verifying email', error: error.message });
  }
};

const loginArtist = async (req, res) => {
  try {
    const { email, password } = req.body;

    const artist = await Artist.findOne({ email, isActive: true });
    if (!artist) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, artist.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!artist.isEmailVerified) {
      return res.status(401).json({ message: 'Please verify your email first' });
    }

    const token = jwt.sign(
      { artistId: artist._id, email: artist.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      artist: {
        id: artist._id,
        name: artist.name,
        email: artist.email,
        artType: artist.artType,
        isVerified: artist.isVerified,
        rating: artist.rating,
        totalSales: artist.totalSales
      }
    });
  } catch (error) {
    console.error('Artist login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Artwork Management
const createArtwork = async (req, res) => {
  try {
    const artistId = req.artist.id; // From auth middleware
    const {
      title,
      description,
      category,
      otherCategory,
      images,
      price,
      dimensions,
      materials,
      yearCreated,
      isOriginal,
      edition,
      condition,
      shippingInfo,
      tags
    } = req.body;

    const artwork = new Artwork({
      artistId,
      title,
      description,
      category,
      otherCategory: category === 'Others' ? otherCategory : null,
      images,
      price,
      dimensions,
      materials,
      yearCreated,
      isOriginal,
      edition,
      condition,
      shippingInfo,
      tags
    });

    await artwork.save();

    res.status(201).json({
      message: 'Artwork created successfully',
      artwork
    });
  } catch (error) {
    console.error('Create artwork error:', error);
    res.status(500).json({ message: 'Error creating artwork', error: error.message });
  }
};

const getArtworks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      artistId,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = { status: 'Available', isActive: true };

    if (category) filter.category = category;
    if (artistId) filter.artistId = artistId;
    if (minPrice || maxPrice) {
      filter['price.amount'] = {};
      if (minPrice) filter['price.amount'].$gte = parseFloat(minPrice);
      if (maxPrice) filter['price.amount'].$lte = parseFloat(maxPrice);
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const artworks = await Artwork.find(filter)
      .populate('artistId', 'name rating totalSales')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Artwork.countDocuments(filter);

    res.json({
      artworks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get artworks error:', error);
    res.status(500).json({ message: 'Error fetching artworks', error: error.message });
  }
};

const getArtworkById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const artwork = await Artwork.findById(id)
      .populate('artistId', 'name rating totalSales description profilePicture')
      .populate('likes', 'username profile.displayName')
      .populate('wishlist', 'username profile.displayName');

    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    // Increment views
    artwork.views += 1;
    await artwork.save();

    // Check if user has liked or wishlisted
    const userLiked = userId ? artwork.likes.some(like => like._id.toString() === userId) : false;
    const userWishlisted = userId ? artwork.wishlist.some(wish => wish._id.toString() === userId) : false;

    res.json({
      artwork,
      userLiked,
      userWishlisted
    });
  } catch (error) {
    console.error('Get artwork error:', error);
    res.status(500).json({ message: 'Error fetching artwork', error: error.message });
  }
};

const updateArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const artistId = req.artist.id;

    const artwork = await Artwork.findOne({ _id: id, artistId });
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found or unauthorized' });
    }

    const updatedArtwork = await Artwork.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Artwork updated successfully',
      artwork: updatedArtwork
    });
  } catch (error) {
    console.error('Update artwork error:', error);
    res.status(500).json({ message: 'Error updating artwork', error: error.message });
  }
};

const deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const artistId = req.artist.id;

    const artwork = await Artwork.findOne({ _id: id, artistId });
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found or unauthorized' });
    }

    await Artwork.findByIdAndDelete(id);

    res.json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    console.error('Delete artwork error:', error);
    res.status(500).json({ message: 'Error deleting artwork', error: error.message });
  }
};

// Customer Interactions
const likeArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    const isLiked = artwork.likes.includes(userId);
    if (isLiked) {
      artwork.likes = artwork.likes.filter(like => like.toString() !== userId);
    } else {
      artwork.likes.push(userId);
    }

    await artwork.save();

    res.json({
      message: isLiked ? 'Artwork unliked' : 'Artwork liked',
      likesCount: artwork.likes.length
    });
  } catch (error) {
    console.error('Like artwork error:', error);
    res.status(500).json({ message: 'Error updating like', error: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    const isWishlisted = artwork.wishlist.includes(userId);
    if (isWishlisted) {
      artwork.wishlist = artwork.wishlist.filter(wish => wish.toString() !== userId);
    } else {
      artwork.wishlist.push(userId);
    }

    await artwork.save();

    res.json({
      message: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      wishlistCount: artwork.wishlist.length
    });
  } catch (error) {
    console.error('Wishlist error:', error);
    res.status(500).json({ message: 'Error updating wishlist', error: error.message });
  }
};

const followArtist = async (req, res) => {
  try {
    const { artistId } = req.params;
    const userId = req.user.id;

    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    const isFollowing = artist.followers.includes(userId);
    if (isFollowing) {
      artist.followers = artist.followers.filter(follower => follower.toString() !== userId);
    } else {
      artist.followers.push(userId);
    }

    await artist.save();

    res.json({
      message: isFollowing ? 'Unfollowed artist' : 'Followed artist',
      followersCount: artist.followers.length
    });
  } catch (error) {
    console.error('Follow artist error:', error);
    res.status(500).json({ message: 'Error updating follow status', error: error.message });
  }
};

// Order Management
const createOrder = async (req, res) => {
  try {
    const { artworkId, quantity, shippingAddress } = req.body;
    const customerId = req.user.id;

    const artwork = await Artwork.findById(artworkId);
    if (!artwork || artwork.status !== 'Available') {
      return res.status(400).json({ message: 'Artwork not available' });
    }

    const totalAmount = (artwork.price.amount * quantity) + artwork.shippingInfo.shippingCost;

    const order = new Order({
      customerId,
      artistId: artwork.artistId,
      artworkId,
      quantity,
      price: artwork.price,
      shippingCost: {
        amount: artwork.shippingInfo.shippingCost,
        currency: artwork.shippingInfo.shippingCurrency
      },
      totalAmount: {
        amount: totalAmount,
        currency: artwork.price.currency
      },
      shippingAddress
    });

    await order.save();

    // TODO: Integrate with payment gateway (Razorpay/Stripe)
    // const paymentIntent = await createPaymentIntent(totalAmount, artwork.price.currency);

    res.status(201).json({
      message: 'Order created successfully',
      order,
      // paymentIntent
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const { role } = req.query; // 'customer' or 'artist'
    const userId = req.user.id;
    const artistId = req.artist?.id;

    let filter = {};
    if (role === 'customer') {
      filter.customerId = userId;
    } else if (role === 'artist') {
      filter.artistId = artistId;
    }

    const orders = await Order.find(filter)
      .populate('artworkId', 'title images price')
      .populate('customerId', 'username profile.displayName')
      .populate('artistId', 'name')
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Review Management
const createReview = async (req, res) => {
  try {
    const { orderId, rating, title, comment, images } = req.body;
    const customerId = req.user.id;

    // Check if order exists and belongs to customer
    const order = await Order.findOne({ _id: orderId, customerId, status: 'Delivered' });
    if (!order) {
      return res.status(400).json({ message: 'Order not found or not delivered' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ orderId });
    if (existingReview) {
      return res.status(400).json({ message: 'Review already exists for this order' });
    }

    const review = new Review({
      orderId,
      customerId,
      artistId: order.artistId,
      artworkId: order.artworkId,
      rating,
      title,
      comment,
      images: images || []
    });

    await review.save();

    // Update artist rating
    const artist = await Artist.findById(order.artistId);
    const artistReviews = await Review.find({ artistId: order.artistId, isActive: true });
    const avgRating = artistReviews.reduce((sum, rev) => sum + rev.rating, 0) / artistReviews.length;
    
    artist.rating = Math.round(avgRating * 10) / 10;
    artist.totalReviews = artistReviews.length;
    await artist.save();

    res.status(201).json({
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const { artistId, artworkId, page = 1, limit = 10 } = req.query;

    const filter = { isActive: true };
    if (artistId) filter.artistId = artistId;
    if (artworkId) filter.artworkId = artworkId;

    const reviews = await Review.find(filter)
      .populate('customerId', 'username profile.displayName profile.avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Review.countDocuments(filter);

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Artist Dashboard
const getArtistDashboard = async (req, res) => {
  try {
    const artistId = req.artist.id;

    const [artworks, orders, reviews] = await Promise.all([
      Artwork.find({ artistId, isActive: true }).countDocuments(),
      Order.find({ artistId }).countDocuments(),
      Review.find({ artistId, isActive: true }).countDocuments()
    ]);

    const recentOrders = await Order.find({ artistId })
      .populate('artworkId', 'title images')
      .populate('customerId', 'username profile.displayName')
      .sort({ createdAt: -1 })
      .limit(5);

    const totalEarnings = await Order.aggregate([
      { $match: { artistId: artistId, status: 'Delivered' } },
      { $group: { _id: null, total: { $sum: '$totalAmount.amount' } } }
    ]);

    res.json({
      stats: {
        artworks,
        orders,
        reviews,
        totalEarnings: totalEarnings[0]?.total || 0
      },
      recentOrders
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Error fetching dashboard', error: error.message });
  }
};

module.exports = {
  registerArtist,
  verifyArtistEmail,
  loginArtist,
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
  likeArtwork,
  addToWishlist,
  followArtist,
  createOrder,
  getOrders,
  createReview,
  getReviews,
  getArtistDashboard
};
