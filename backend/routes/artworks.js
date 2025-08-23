// routes/artworks.js
const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin');

const router = express.Router();
const db = admin.firestore();
const storage = admin.storage();

// Multer configuration for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Upload artwork
router.post('/upload', verifyToken, upload.single('artwork'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { title, description, tags } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Generate unique filename
    const artworkId = uuidv4();
    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `artworks/${req.user.uid}/${artworkId}.${fileExtension}`;

    // Upload to Firebase Storage
    const bucket = storage.bucket();
    const file = bucket.file(fileName);
    
    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    // Make file publicly accessible
    await file.makePublic();

    // Get public URL
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Parse tags
    const tagArray = tags ? 
      tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : 
      [];

    // Save artwork data to Firestore
    const artworkData = {
      id: artworkId,
      title: title.trim(),
      description: description?.trim() || '',
      imageUrl,
      userId: req.user.uid,
      userEmail: req.user.email,
      tags: tagArray,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('artworks').doc(artworkId).set(artworkData);

    // Return the artwork data with formatted timestamp
    const responseData = {
      ...artworkData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    res.status(201).json(responseData);

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading artwork' });
  }
});

// Get user's artworks
router.get('/user', verifyToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const artworksRef = db.collection('artworks');
    const query = artworksRef
      .where('userId', '==', req.user.uid)
      .orderBy('createdAt', 'desc');

    const snapshot = await query.get();
    
    const artworks = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
      };
    });

    res.json(artworks);

  } catch (error) {
    console.error('Error fetching user artworks:', error);
    res.status(500).json({ message: 'Error fetching artworks' });
  }
});

// Get all public artworks (for gallery)
router.get('/public', async (req, res) => {
  try {
    const artworksRef = db.collection('artworks');
    const query = artworksRef.orderBy('createdAt', 'desc').limit(50);

    const snapshot = await query.get();
    
    const artworks = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        userEmail: data.userEmail,
        tags: data.tags,
        createdAt: data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
      };
    });

    res.json(artworks);

  } catch (error) {
    console.error('Error fetching public artworks:', error);
    res.status(500).json({ message: 'Error fetching artworks' });
  }
});

// Delete artwork
router.delete('/:artworkId', verifyToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { artworkId } = req.params;
    
    // Get artwork document
    const artworkDoc = await db.collection('artworks').doc(artworkId).get();
    
    if (!artworkDoc.exists) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    const artworkData = artworkDoc.data();
    
    // Check if user owns this artwork
    if (artworkData?.userId !== req.user.uid) {
      return res.status(403).json({ message: 'You can only delete your own artworks' });
    }

    // Delete from Storage
    if (artworkData?.imageUrl) {
      try {
        const bucket = storage.bucket();
        const fileName = `artworks/${req.user.uid}/${artworkId}.${artworkData.imageUrl.split('.').pop()}`;
        await bucket.file(fileName).delete();
      } catch (storageError) {
        console.error('Error deleting from storage:', storageError);
        // Continue with Firestore deletion even if storage deletion fails
      }
    }

    // Delete from Firestore
    await db.collection('artworks').doc(artworkId).delete();

    res.json({ message: 'Artwork deleted successfully' });

  } catch (error) {
    console.error('Error deleting artwork:', error);
    res.status(500).json({ message: 'Error deleting artwork' });
  }
});

// Get artwork by ID
router.get('/:artworkId', async (req, res) => {
  try {
    const { artworkId } = req.params;
    
    const artworkDoc = await db.collection('artworks').doc(artworkId).get();
    
    if (!artworkDoc.exists) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    const data = artworkDoc.data();
    const artwork = {
      id: artworkDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
    };

    res.json(artwork);

  } catch (error) {
    console.error('Error fetching artwork:', error);
    res.status(500).json({ message: 'Error fetching artwork' });
  }
});

// Search artworks
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const searchTerm = query.toLowerCase();

    const artworksRef = db.collection('artworks');
    const snapshot = await artworksRef.get();
    
    const artworks = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      const artwork = {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
      };
      
      // Simple search in title, description, and tags
      const titleMatch = data.title?.toLowerCase().includes(searchTerm);
      const descriptionMatch = data.description?.toLowerCase().includes(searchTerm);
      const tagsMatch = data.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
      
      if (titleMatch || descriptionMatch || tagsMatch) {
        artworks.push(artwork);
      }
    });

    // Sort by relevance (title matches first, then description, then tags)
    artworks.sort((a, b) => {
      const aTitle = a.title?.toLowerCase().includes(searchTerm) ? 3 : 0;
      const aDesc = a.description?.toLowerCase().includes(searchTerm) ? 2 : 0;
      const aTags = a.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ? 1 : 0;
      
      const bTitle = b.title?.toLowerCase().includes(searchTerm) ? 3 : 0;
      const bDesc = b.description?.toLowerCase().includes(searchTerm) ? 2 : 0;
      const bTags = b.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ? 1 : 0;
      
      return (bTitle + bDesc + bTags) - (aTitle + aDesc + aTags);
    });

    res.json(artworks.slice(0, 20)); // Limit to 20 results

  } catch (error) {
    console.error('Error searching artworks:', error);
    res.status(500).json({ message: 'Error searching artworks' });
  }
});

module.exports = router;