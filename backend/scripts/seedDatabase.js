const mongoose = require('mongoose');
require('dotenv').config();

const Content = require('../models/Content');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/folk-flame-digital');
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing content
    await Content.deleteMany({});
    console.log('Cleared existing content');

    // Seed games
    const games = [
      {
        type: 'game',
        title: 'Warli Art Pattern Match',
        description: 'Match traditional Warli art patterns and learn about tribal art forms',
        artForm: 'Warli',
        difficulty: 'beginner',
        category: 'memory',
        content: {
          instructions: 'Arrange the colored beads to match the target pattern shown above',
          maxScore: 100,
          estimatedTime: 5
        },
        thumbnail: '🎨'
      },
      {
        type: 'game',
        title: 'Madhubani Color Quest',
        description: 'Learn about Madhubani painting colors and create beautiful patterns',
        artForm: 'Madhubani',
        difficulty: 'beginner',
        category: 'creative',
        content: {
          instructions: 'Choose the right colors and create traditional Madhubani patterns',
          maxScore: 100,
          estimatedTime: 8
        },
        thumbnail: '🎭'
      },
      {
        type: 'game',
        title: 'Pithora Art Puzzle',
        description: 'Solve puzzles featuring Pithora art and learn about tribal culture',
        artForm: 'Pithora',
        difficulty: 'intermediate',
        category: 'puzzle',
        content: {
          instructions: 'Complete the Pithora art puzzle by arranging the pieces correctly',
          maxScore: 150,
          estimatedTime: 10
        },
        thumbnail: '🧩'
      },
      {
        type: 'game',
        title: 'Folk Art Quiz Master',
        description: 'Test your knowledge about Indian folk art forms and artists',
        artForm: 'Mixed',
        difficulty: 'intermediate',
        category: 'quiz',
        content: {
          instructions: 'Answer questions about various Indian folk art forms',
          maxScore: 200,
          estimatedTime: 7
        },
        thumbnail: '❓'
      },
      {
        type: 'game',
        title: 'Art Form Memory Game',
        description: 'Match different art forms and learn about their unique characteristics',
        artForm: 'Mixed',
        difficulty: 'beginner',
        category: 'memory',
        content: {
          instructions: 'Match pairs of art forms and their characteristics',
          maxScore: 80,
          estimatedTime: 4
        },
        thumbnail: '🧠'
      },
      {
        type: 'game',
        title: 'Creative Art Studio',
        description: 'Create your own folk art masterpiece using digital tools',
        artForm: 'Mixed',
        difficulty: 'advanced',
        category: 'creative',
        content: {
          instructions: 'Use digital tools to create your own folk art inspired artwork',
          maxScore: 300,
          estimatedTime: 15
        },
        thumbnail: '🎨'
      }
    ];

    await Content.insertMany(games);
    console.log('Seeded games');

    // Seed learning modules
    const learningModules = [
      {
        type: 'learning_module',
        title: 'Introduction to Warli Art',
        description: 'Learn about the ancient tribal art form from Maharashtra',
        artForm: 'Warli',
        content: {
          introduction: 'Warli art is one of the oldest tribal art forms in India, originating from the Warli tribe in Maharashtra. This ancient art form uses simple geometric shapes to tell stories of daily life, nature, and tribal culture.',
          history: 'Warli art dates back over 2,500 years and was traditionally practiced by women in the Warli community. It was discovered by the outside world only in the 1970s and has since gained international recognition.',
          museums: ['National Museum, New Delhi', 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mumbai', 'Tribal Museum, Bhopal'],
          usage: 'Warli art is used in festivals, ceremonies, and storytelling. Modern applications include home decor, clothing, and contemporary art installations.',
          keyFeatures: ['Simple geometric shapes', 'White paint on red ochre background', 'Depicts daily life activities', 'Traditional rice paste medium']
        },
        thumbnail: '🏺'
      },
      {
        type: 'learning_module',
        title: 'Madhubani Painting Basics',
        description: 'Discover the colorful world of Madhubani art from Bihar',
        artForm: 'Madhubani',
        content: {
          introduction: 'Madhubani art, also known as Mithila painting, is a traditional art form from the Mithila region of Bihar. It features vibrant colors and intricate patterns, often depicting Hindu deities and mythological stories.',
          history: 'Madhubani art has been practiced for centuries, traditionally by women who painted walls and floors during festivals and ceremonies. It gained national recognition in the 1960s and is now a protected GI.',
          museums: ['Bihar Museum, Patna', 'National Museum, New Delhi', 'Mithila Museum, Darbhanga'],
          usage: 'Madhubani art is used in religious ceremonies, festivals, and home decoration. It\'s also applied to textiles, paper, and canvas for commercial purposes.',
          keyFeatures: ['Bright, vibrant colors', 'Intricate patterns and designs', 'Mythological themes', 'Natural dyes and materials']
        },
        thumbnail: '🎨'
      },
      {
        type: 'learning_module',
        title: 'Pithora Art History',
        description: 'Explore the rich cultural heritage of Pithora art',
        artForm: 'Pithora',
        content: {
          introduction: 'Pithora art is a sacred tribal art form practiced by the Rathwa, Bhil, and Nayak tribes of Gujarat and Madhya Pradesh. These paintings are created during important ceremonies and rituals.',
          history: 'Pithora art has been passed down through generations and is deeply connected to tribal spirituality and mythology. It\'s considered a form of prayer and spiritual expression.',
          museums: ['Tribal Museum, Ahmedabad', 'National Museum, New Delhi', 'Gujarat State Museum, Vadodara'],
          usage: 'Pithora art is primarily used in religious ceremonies and rituals. It\'s considered sacred and is often created as offerings to deities.',
          keyFeatures: ['Sacred and spiritual themes', 'Natural colors and materials', 'Ritualistic creation process', 'Tribal mythology stories']
        },
        thumbnail: '🏛️'
      },
      {
        type: 'learning_module',
        title: 'Gond Art Traditions',
        description: 'Discover the vibrant Gond tribal art from Madhya Pradesh',
        artForm: 'Gond',
        content: {
          introduction: 'Gond art comes from the Gond tribe of Madhya Pradesh and features vibrant colors with nature-inspired motifs. Artists use dots and lines to create intricate patterns depicting animals, birds, and tribal life.',
          history: 'Gond art has evolved over centuries, originally created as a form of storytelling and spiritual expression. Modern Gond artists have adapted the art form to contemporary themes while preserving traditional techniques.',
          museums: ['Tribal Museum, Bhopal', 'National Museum, New Delhi', 'Indira Gandhi Rashtriya Manav Sangrahalaya, Bhopal'],
          usage: 'Gond art is used in storytelling, spiritual expression, and cultural preservation. Modern applications include contemporary art, home decor, and fashion.',
          keyFeatures: ['Dots and lines technique', 'Nature-inspired motifs', 'Vibrant color palette', 'Animal and bird depictions']
        },
        thumbnail: '🌳'
      },
      {
        type: 'learning_module',
        title: 'Kalamkari Textile Art',
        description: 'Learn about the ancient hand-painted textile art from Andhra Pradesh',
        artForm: 'Kalamkari',
        content: {
          introduction: 'Kalamkari is an ancient hand-painted textile art from Andhra Pradesh. The name means \'pen work\' in Persian, and it uses natural dyes and traditional block printing techniques.',
          history: 'Kalamkari has been practiced for over 3,000 years, with evidence found in ancient temples and texts. The art form flourished during the Mughal era and continues to be practiced today.',
          museums: ['Salar Jung Museum, Hyderabad', 'National Museum, New Delhi', 'Victoria Memorial Hall, Kolkata'],
          usage: 'Kalamkari is primarily used in textile decoration, creating beautiful fabrics for clothing, home furnishings, and religious textiles.',
          keyFeatures: ['Hand-painted textiles', 'Natural dye techniques', 'Mythological narratives', 'Traditional block printing']
        },
        thumbnail: '🧵'
      },
      {
        type: 'learning_module',
        title: 'Folk Art Around India',
        description: 'Journey through different folk art forms across India',
        artForm: 'Mixed',
        content: {
          introduction: 'India is home to diverse folk art traditions, each reflecting the unique culture and heritage of different regions. From tribal paintings to textile arts, these traditions have been preserved for centuries.',
          history: 'Indian folk art has evolved over thousands of years, with each region developing its own distinctive style and techniques. These art forms have been passed down through generations and continue to thrive today.',
          museums: ['National Museum, New Delhi', 'Crafts Museum, New Delhi', 'Various state museums across India'],
          usage: 'Folk art is used in cultural celebrations, religious ceremonies, and modern applications like home decor, fashion, and contemporary art.',
          keyFeatures: ['Regional diversity', 'Cultural significance', 'Traditional techniques', 'Contemporary adaptations']
        },
        thumbnail: '🗺️'
      }
    ];

    await Content.insertMany(learningModules);
    console.log('Seeded learning modules');

    // Seed art facts
    const artFacts = [
      {
        type: 'art_fact',
        title: 'Warli Art Facts',
        description: 'Interesting facts about Warli art',
        artForm: 'Warli',
        content: {
          facts: [
            'Warli art originated from the Warli tribe in Maharashtra, India, over 2,500 years ago!',
            'Traditional Warli paintings are made using only white paint on a red ochre background.',
            'Warli art depicts daily life activities like farming, fishing, dancing, and hunting.',
            'The art form uses basic geometric shapes: circles, triangles, and squares.',
            'Warli paintings are often created during festivals and special occasions.'
          ]
        },
        thumbnail: '🏺'
      },
      {
        type: 'art_fact',
        title: 'Madhubani Art Facts',
        description: 'Interesting facts about Madhubani art',
        artForm: 'Madhubani',
        content: {
          facts: [
            'Madhubani art originated in the Mithila region of Bihar, India!',
            'This art form was traditionally practiced by women on walls and floors.',
            'Madhubani paintings feature bright colors and intricate patterns.',
            'The art form often depicts Hindu deities and mythological stories.',
            'Madhubani art is now recognized as a protected geographical indication (GI).'
          ]
        },
        thumbnail: '🎨'
      },
      {
        type: 'art_fact',
        title: 'Pithora Art Facts',
        description: 'Interesting facts about Pithora art',
        artForm: 'Pithora',
        content: {
          facts: [
            'Pithora art is a sacred tribal art form from Gujarat and Madhya Pradesh!',
            'These paintings are created during important ceremonies and rituals.',
            'Pithora art tells stories of gods, ancestors, and tribal mythology.',
            'The paintings are made using natural colors and traditional techniques.',
            'Pithora art is considered a form of prayer and spiritual expression.'
          ]
        },
        thumbnail: '🏛️'
      },
      {
        type: 'art_fact',
        title: 'Gond Art Facts',
        description: 'Interesting facts about Gond art',
        artForm: 'Gond',
        content: {
          facts: [
            'Gond art comes from the Gond tribe of Madhya Pradesh, India!',
            'This art form features vibrant colors and nature-inspired motifs.',
            'Gond artists use dots and lines to create intricate patterns.',
            'The art form often depicts animals, birds, and tribal life.',
            'Gond art is now popular worldwide and has been adapted to modern themes.'
          ]
        },
        thumbnail: '🌳'
      },
      {
        type: 'art_fact',
        title: 'Kalamkari Art Facts',
        description: 'Interesting facts about Kalamkari art',
        artForm: 'Kalamkari',
        content: {
          facts: [
            'Kalamkari is an ancient hand-painted textile art from Andhra Pradesh!',
            'The name \'Kalamkari\' means \'pen work\' in Persian language.',
            'This art form uses natural dyes and traditional block printing techniques.',
            'Kalamkari textiles often feature mythological stories and nature motifs.',
            'The art form has been practiced for over 3,000 years!'
          ]
        },
        thumbnail: '🧵'
      }
    ];

    await Content.insertMany(artFacts);
    console.log('Seeded art facts');

    // Create sample admin user
    const adminExists = await User.findOne({ email: 'admin@folkflame.com' });
    if (!adminExists) {
      const adminUser = new User({
        username: 'admin',
        email: 'admin@folkflame.com',
        password: 'admin123',
        profile: {
          displayName: 'Folk Flame Admin',
          avatar: '👑'
        }
      });
      await adminUser.save();
      console.log('Created admin user');
    }

    console.log('✅ Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
connectDB().then(() => {
  seedData();
});
