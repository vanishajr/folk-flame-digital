# Heritage Arts Marketplace

A comprehensive marketplace platform for cultural artworks, allowing artists to showcase and sell their creations while enabling art enthusiasts to discover and purchase unique pieces.

## 🎨 Features

### For Customers (Art Collectors)
- **Browse Artworks**: Explore thousands of unique cultural artworks
- **Advanced Filtering**: Filter by category, price range, artist, and more
- **Search Functionality**: Search by title, description, artist name, or tags
- **Wishlist**: Save favorite artworks for later
- **Shopping Cart**: Add items to cart and proceed to checkout
- **Secure Payments**: Multiple payment gateway integration (Razorpay, Stripe, PayPal)
- **Reviews & Ratings**: Rate and review purchased artworks
- **Artist Following**: Follow favorite artists for updates
- **Order Tracking**: Track order status and delivery

### For Artists (Sellers)
- **Artist Registration**: Complete registration with portfolio upload
- **Artwork Management**: Add, edit, and delete artworks
- **Dashboard Analytics**: View sales, earnings, and performance metrics
- **Order Management**: Process and ship orders
- **Portfolio Showcase**: Display profile and portfolio images
- **Pricing Control**: Set prices in INR or USD
- **Inventory Management**: Track artwork availability and status

### Security & Trust Features
- **Artist Verification**: Email verification and optional KYC
- **Secure Payments**: Encrypted payment processing
- **Buyer Protection**: Secure transaction handling
- **Report System**: Report inappropriate content or artists
- **Review System**: Verified purchase reviews only

## 🏗️ Architecture

### Backend Models

#### Artist Model
```javascript
{
  userId: ObjectId,
  name: String,
  email: String,
  password: String,
  artType: String, // Painting, Sculpture, Photography, etc.
  description: String,
  profilePicture: String,
  portfolioImages: [String],
  isVerified: Boolean,
  rating: Number,
  totalSales: Number,
  followers: [ObjectId],
  kycVerified: Boolean
}
```

#### Artwork Model
```javascript
{
  artistId: ObjectId,
  title: String,
  description: String,
  category: String,
  images: [String],
  price: {
    amount: Number,
    currency: String // INR or USD
  },
  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
    unit: String
  },
  materials: [String],
  status: String, // Available, Sold, Reserved, Hidden
  views: Number,
  likes: [ObjectId],
  wishlist: [ObjectId]
}
```

#### Order Model
```javascript
{
  orderId: String,
  customerId: ObjectId,
  artistId: ObjectId,
  artworkId: ObjectId,
  price: {
    amount: Number,
    currency: String
  },
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    phone: String
  },
  payment: {
    method: String,
    transactionId: String,
    status: String
  },
  status: String // Pending, Confirmed, Shipped, Delivered
}
```

#### Review Model
```javascript
{
  orderId: ObjectId,
  customerId: ObjectId,
  artistId: ObjectId,
  artworkId: ObjectId,
  rating: Number, // 1-5 stars
  title: String,
  comment: String,
  images: [String],
  isVerified: Boolean
}
```

### Frontend Components

#### Core Components
- `Marketplace.tsx` - Main marketplace page with role selection
- `RoleSelection.tsx` - Choose between customer and seller roles
- `CustomerMarketplace.tsx` - Customer browsing and shopping interface
- `SellerMarketplace.tsx` - Artist dashboard and management interface

#### Artist Components
- `ArtistRegistration.tsx` - Artist account registration form
- `ArtistDashboard.tsx` - Artist analytics and overview
- `ArtworkForm.tsx` - Add/edit artwork form

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/heritage-arts
   JWT_SECRET=your_jwt_secret_here
   CORS_ORIGIN=http://localhost:8080
   ```

3. **Start Backend Server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access Marketplace**
   Navigate to `http://localhost:8080/marketplace`

## 📡 API Endpoints

### Artist Management
- `POST /api/marketplace/artist/register` - Register new artist
- `GET /api/marketplace/artist/verify/:token` - Verify email
- `POST /api/marketplace/artist/login` - Artist login
- `GET /api/marketplace/artist/dashboard` - Artist dashboard

### Artwork Management
- `POST /api/marketplace/artworks` - Create artwork
- `GET /api/marketplace/artworks` - Get artworks (with filters)
- `GET /api/marketplace/artworks/:id` - Get specific artwork
- `PUT /api/marketplace/artworks/:id` - Update artwork
- `DELETE /api/marketplace/artworks/:id` - Delete artwork

### Customer Interactions
- `POST /api/marketplace/artworks/:id/like` - Like/unlike artwork
- `POST /api/marketplace/artworks/:id/wishlist` - Add/remove from wishlist
- `POST /api/marketplace/artists/:artistId/follow` - Follow/unfollow artist

### Order Management
- `POST /api/marketplace/orders` - Create order
- `GET /api/marketplace/orders` - Get orders (customer/artist)

### Reviews
- `POST /api/marketplace/reviews` - Create review
- `GET /api/marketplace/reviews` - Get reviews

## 🎯 User Flow

### Customer Journey
1. **Role Selection**: Choose "Art Collector" role
2. **Browse Artworks**: Explore available artworks with filters
3. **View Details**: Click on artwork for detailed view
4. **Add to Cart**: Add desired items to shopping cart
5. **Checkout**: Complete purchase with secure payment
6. **Track Order**: Monitor order status and delivery
7. **Review**: Leave review after receiving artwork

### Artist Journey
1. **Role Selection**: Choose "Artist Seller" role
2. **Registration**: Complete artist registration form
3. **Email Verification**: Verify email address
4. **Dashboard Access**: Access artist dashboard
5. **Add Artworks**: Upload artwork details and images
6. **Manage Orders**: Process incoming orders
7. **Analytics**: Monitor performance and earnings

## 🔧 Configuration

### Payment Gateways
The marketplace supports multiple payment gateways:

#### Razorpay (India)
```javascript
// Configure in backend
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});
```

#### Stripe (International)
```javascript
// Configure in backend
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```

### Image Upload
Configure image upload settings:
```javascript
// File size limits
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES_PER_ARTWORK = 5;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
```

## 🛡️ Security Features

### Authentication
- JWT-based authentication for artists
- Session management
- Password hashing with bcrypt

### Data Validation
- Input sanitization
- File type validation
- Size limits enforcement

### Payment Security
- Encrypted payment processing
- Transaction verification
- Fraud detection measures

## 📊 Analytics & Reporting

### Artist Analytics
- Sales performance
- Revenue tracking
- Customer engagement
- Popular artworks

### Platform Analytics
- User behavior tracking
- Sales trends
- Category performance
- Geographic distribution

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to cloud platform (Heroku, AWS, etc.)
4. Set up SSL certificate

### Frontend Deployment
1. Build production bundle
2. Deploy to CDN or hosting service
3. Configure domain and SSL

## 🔮 Future Enhancements

### Planned Features
- **AR Artwork Preview**: View artworks in AR
- **Live Auctions**: Real-time bidding system
- **Artwork Insurance**: Insurance coverage for valuable pieces
- **International Shipping**: Global logistics integration
- **Mobile App**: Native mobile applications
- **AI Recommendations**: Personalized artwork suggestions
- **Virtual Galleries**: 3D gallery experiences

### Technical Improvements
- **Real-time Notifications**: WebSocket integration
- **Advanced Search**: Elasticsearch implementation
- **Image Optimization**: Automatic image compression
- **Caching**: Redis for performance optimization
- **Microservices**: Service-oriented architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: support@heritagearts.com
- Documentation: [docs.heritagearts.com](https://docs.heritagearts.com)
- Community: [community.heritagearts.com](https://community.heritagearts.com)

---

**Heritage Arts Marketplace** - Connecting artists and art lovers worldwide through cultural expression and creativity.
