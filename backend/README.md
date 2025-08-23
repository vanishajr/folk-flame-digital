# Folk Flame Digital - Backend API

A Node.js/Express backend for the children's learning and gaming platform featuring Indian folk art education.

## Features

- **User Authentication**: Signup, login, profile management with JWT tokens
- **Leaderboard Management**: Real-time score tracking and ranking system
- **Content Management**: Games, learning modules, art facts, and quizzes
- **Real-time Updates**: Auto-refreshing leaderboards and user statistics
- **Security**: Rate limiting, input validation, secure password hashing

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Content
- `GET /api/content/games` - Get all games
- `GET /api/content/learning-modules` - Get learning modules
- `GET /api/content/art-facts/:artForm` - Get random art fact
- `GET /api/content/quiz` - Get quiz questions
- `GET /api/content/:id` - Get specific content by ID

### Leaderboard
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/leaderboard/artform/:artForm` - Get art form specific leaderboard
- `POST /api/leaderboard/submit-score` - Submit game score (protected)
- `GET /api/leaderboard/my-rank` - Get user's rank and stats (protected)

## Quick Start

### Prerequisites
- Node.js 16+
- MongoDB 4.4+

### Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/folk-flame-digital
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080
```

3. Start MongoDB service

4. Seed the database:
```bash
node scripts/seedDatabase.js
```

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:3001`

## Database Models

### User
- Authentication and profile information
- Game statistics and achievements
- Progress tracking

### Content
- Games, learning modules, quizzes, art facts
- Categorized by art form and difficulty
- Rich content structure for educational materials

### GameSession
- Individual game completion records
- Score tracking and time spent
- Achievement system

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- Input validation with Joi
- CORS protection
- Helmet security headers

## Development

### Adding New Content
1. Use the Content model to add new games/modules
2. Update the seed script for initial data
3. Test with the frontend integration

### API Testing
Use the health check endpoint:
```bash
curl http://localhost:3001/api/health
```

## Production Deployment

1. Update environment variables for production
2. Use a production MongoDB instance
3. Set strong JWT_SECRET
4. Configure proper CORS_ORIGIN
5. Use process manager like PM2
6. Set up SSL/TLS
7. Configure proper logging

## Contributing

1. Follow the existing code structure
2. Add proper validation for new endpoints
3. Update this README for new features
4. Test all endpoints before submitting
