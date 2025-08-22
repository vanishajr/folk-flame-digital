# Voice Search Implementation

This document describes the voice search functionality implemented in the Heritage Arts application.

## Features Implemented

### 1. Navigation Bar Voice Search (Top Left)
- **Location**: Microphone button in the top navigation bar
- **Functionality**: General voice search for any content in the app
- **Access**: Available on both desktop and mobile views
- **Trigger**: Click/tap the "Voice" button with microphone icon

### 2. Cultural Voice Discovery (Feature Highlights Section)
- **Location**: "Voice-Activated Discovery" feature under "Innovative Cultural Experience"
- **Functionality**: Specialized cultural search optimized for art, temple, and cultural content
- **Access**: Located in the main feature highlights section
- **Trigger**: Click/tap the "Try Voice Search" button

## Technical Implementation

### Voice Search Hook (`use-voice-search.tsx`)
- Uses Web Speech API for speech recognition
- Supports multiple Indian languages (English, Hindi, Kannada, Tamil, Telugu, Malayalam, Gujarati, Punjabi, Bengali, Odia, Assamese, Marathi)
- Auto-detects spoken language
- Handles errors gracefully with user-friendly messages
- Provides real-time transcript feedback

### Voice Search Modal (`VoiceSearchModal.tsx`)
- User-friendly interface with large microphone button
- Visual feedback during recording (pulsing animation, recording indicator)
- Displays detected language
- Shows transcript of spoken words
- Allows manual text input as fallback
- Cultural search suggestions for better user experience

### Search Context (`SearchContext.tsx`)
- Manages search state across the application
- Provides both general and cultural search functions
- Mock data generation for demonstration purposes
- Toast notifications for search results

### Search Results Display (`SearchResults.tsx`)
- Attractive grid layout for search results
- Categorized results (art, temple, cultural)
- Loading states and error handling
- Related search suggestions

## Language Support

The voice search system supports the following languages with automatic detection:

- **English (en-IN)**: Primary interface language
- **Hindi (hi-IN)**: National language support
- **Kannada (kn-IN)**: Karnataka regional language
- **Tamil (ta-IN)**: Tamil Nadu regional language
- **Telugu (te-IN)**: Andhra Pradesh/Telangana regional language
- **Malayalam (ml-IN)**: Kerala regional language
- **Gujarati (gu-IN)**: Gujarat regional language
- **Punjabi (pa-IN)**: Punjab regional language
- **Bengali (bn-IN)**: West Bengal regional language
- **Odia (or-IN)**: Odisha regional language
- **Assamese (as-IN)**: Assam regional language
- **Marathi (mr-IN)**: Maharashtra regional language

## User Experience Features

### Visual Feedback
- Large, accessible microphone button
- Recording state indication (red color, pulsing animation)
- Real-time transcript display
- Language detection badge
- Loading states and progress indicators

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- Clear visual hierarchy
- Error messages in plain language

### Cultural Optimization
- Pre-built search suggestions for cultural content
- Specialized cultural search algorithm
- Regional language prioritization
- Cultural content categorization

## Browser Compatibility

- **Chrome/Edge**: Full support with Web Speech API
- **Firefox**: Limited support (may require user permission)
- **Safari**: Limited support on macOS
- **Mobile Browsers**: Full support on Android, limited on iOS

## Usage Instructions

### For General Search:
1. Click the "Voice" button in the top navigation
2. Speak your search query clearly
3. Wait for transcription
4. Review and edit if needed
5. Click "Search" to see results

### For Cultural Search:
1. Scroll to "Voice-Activated Discovery" section
2. Click "Try Voice Search"
3. Speak cultural queries like "Show me Warli paintings from Maharashtra"
4. Use suggested phrases for better results
5. Explore cultural content results

## Future Enhancements

- Integration with real cultural content APIs
- Advanced language processing for regional dialects
- Voice command shortcuts for navigation
- Multi-language simultaneous search
- Voice-based content filtering
- Accessibility improvements for hearing-impaired users

## Technical Notes

- Uses React Context for state management
- Implements proper cleanup and error handling
- Responsive design for all screen sizes
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons
