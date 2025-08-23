import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'kn' | 'ml';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  currentLanguage: {
    code: string;
    name: string;
    native: string;
  };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data for all supported languages
const translations = {
  en: {
    // Navigation
    'nav.explore': 'Explore',
    'nav.collections': 'Collections',
    'nav.artists': 'Artists',
    'nav.museum_tours': 'Museum Tours',
    'nav.children': 'Children',
    'nav.store': 'Store',
    'nav.ar_experience': 'AR Experience',
    'nav.search_placeholder': 'Search artforms, artists...',
    'nav.voice': 'Voice',
    'nav.sign_in': 'Sign In',
    'nav.user': 'User',

    // Hero Section
    'hero.title': 'Discover the Rich Heritage of Indian Folk Art',
    'hero.subtitle': 'Explore centuries-old traditions through contemporary digital experiences',
    'hero.cta_primary': 'Explore Collections',
    'hero.cta_secondary': 'Learn More',

    // Featured Collections
    'collections.title': 'Featured Collections',
    'collections.subtitle': 'Discover the diverse world of Indian folk art through our carefully curated collections',
    'collections.view_all': 'View All Collections',
    'collections.view_details': 'View Details',
    'collections.items': 'items',

    // Featured Artists
    'artists.title': 'Master Artists',
    'artists.subtitle': 'Meet the guardians of our cultural heritage - talented artists who have dedicated their lives to preserving and promoting traditional folk artforms',
    'artists.discover_more': 'Discover More Artists',
    'artists.view_profile': 'View Profile',
    'artists.followers': 'followers',
    'artists.artworks': 'artworks',

    // Feature Highlights
    'highlights.title': 'Why Choose Heritage Arts?',
    'highlights.cultural_preservation.title': 'Cultural Preservation',
    'highlights.cultural_preservation.description': 'We are committed to preserving and promoting traditional Indian folk art forms for future generations',
    'highlights.authentic_experience.title': 'Authentic Experience',
    'highlights.authentic_experience.description': 'Every piece in our collection is carefully curated to ensure authenticity and cultural significance',
    'highlights.global_access.title': 'Global Access',
    'highlights.global_access.description': 'Bring the beauty of Indian folk art to your home, no matter where you are in the world',

    // AR Experience
    'ar.title': 'Augmented Reality Experience',
    'ar.subtitle': 'Bring Indian folk art to life in your space with our cutting-edge AR technology',
    'ar.try_ar': 'Try AR Experience',
    'ar.learn_more': 'Learn More',

    // Personalized Recommendations
    'recommendations.title': 'Personalized Recommendations',
    'recommendations.subtitle': 'Let AI discover the perfect Indian folk artworks for your space. Tell us about your preferences and we\'ll recommend pieces that match your style',
    'recommendations.learn_more': 'Learn More',
    'recommendations.step1.title': 'What art forms do you love?',
    'recommendations.step1.subtitle': 'Select your favorite Indian folk art forms',
    'recommendations.step2.title': 'Tell us more about your preferences',
    'recommendations.step2.subtitle': 'Help us understand your style better',
    'recommendations.step3.title': 'Your Personalized Recommendations',
    'recommendations.step3.subtitle': 'Based on your preferences, here are artworks we think you\'ll love',
    'recommendations.continue': 'Continue',
    'recommendations.back': 'Back',
    'recommendations.generate': 'Generate AI Recommendations',
    'recommendations.adjust_preferences': 'Adjust Preferences',
    'recommendations.explore_collection': 'explore our full collection',
    'recommendations.step': 'Step',

    // Footer
    'footer.about': 'About',
    'footer.about_text': 'Heritage Arts is dedicated to preserving and promoting the rich cultural heritage of Indian folk art',
    'footer.quick_links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.contact_text': 'Get in touch with us for any questions or support',
    'footer.follow_us': 'Follow Us',
    'footer.copyright': '© 2024 Heritage Arts. All rights reserved.',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.more': 'More',
    'common.less': 'Less',
    'common.search': 'Search',
    'common.of': 'of',
  },
  hi: {
    // Navigation
    'nav.explore': 'खोजें',
    'nav.collections': 'संग्रह',
    'nav.artists': 'कलाकार',
    'nav.museum_tours': 'संग्रहालय भ्रमण',
    'nav.children': 'बच्चे',
    'nav.store': 'दुकान',
    'nav.ar_experience': 'एआर अनुभव',
    'nav.search_placeholder': 'कला रूपों, कलाकारों को खोजें...',
    'nav.voice': 'आवाज',
    'nav.sign_in': 'साइन इन करें',
    'nav.user': 'उपयोगकर्ता',

    // Hero Section
    'hero.title': 'भारतीय लोक कला की समृद्ध विरासत की खोज करें',
    'hero.subtitle': 'समकालीन डिजिटल अनुभवों के माध्यम से सदियों पुरानी परंपराओं का अन्वेषण करें',
    'hero.cta_primary': 'संग्रह देखें',
    'hero.cta_secondary': 'और जानें',

    // Featured Collections
    'collections.title': 'विशेष संग्रह',
    'collections.subtitle': 'हमारे सावधानीपूर्वक चयनित संग्रहों के माध्यम से भारतीय लोक कला की विविध दुनिया की खोज करें',
    'collections.view_all': 'सभी संग्रह देखें',
    'collections.view_details': 'विवरण देखें',
    'collections.items': 'आइटम',

    // Featured Artists
    'artists.title': 'मास्टर कलाकार',
    'artists.subtitle': 'हमारी सांस्कृतिक विरासत के संरक्षकों से मिलें - प्रतिभाशाली कलाकार जिन्होंने पारंपरिक लोक कला रूपों को संरक्षित और बढ़ावा देने के लिए अपना जीवन समर्पित किया है',
    'artists.discover_more': 'और कलाकार खोजें',
    'artists.view_profile': 'प्रोफ़ाइल देखें',
    'artists.followers': 'अनुयायी',
    'artists.artworks': 'कलाकृतियां',

    // Feature Highlights
    'highlights.title': 'हरिटेज आर्ट्स को क्यों चुनें?',
    'highlights.cultural_preservation.title': 'सांस्कृतिक संरक्षण',
    'highlights.cultural_preservation.description': 'हम भविष्य की पीढ़ियों के लिए पारंपरिक भारतीय लोक कला रूपों को संरक्षित और बढ़ावा देने के लिए प्रतिबद्ध हैं',
    'highlights.authentic_experience.title': 'प्रामाणिक अनुभव',
    'highlights.authentic_experience.description': 'हमारे संग्रह में हर टुकड़ा प्रामाणिकता और सांस्कृतिक महत्व सुनिश्चित करने के लिए सावधानीपूर्वक चयनित है',
    'highlights.global_access.title': 'वैश्विक पहुंच',
    'highlights.global_access.description': 'दुनिया में कहीं भी हो, अपने घर में भारतीय लोक कला की सुंदरता लाएं',

    // AR Experience
    'ar.title': 'आगमेंटेड रियालिटी अनुभव',
    'ar.subtitle': 'हमारी अत्याधुनिक एआर तकनीक के साथ अपने स्थान में भारतीय लोक कला को जीवंत करें',
    'ar.try_ar': 'एआर अनुभव आज़माएं',
    'ar.learn_more': 'और जानें',

    // Personalized Recommendations
    'recommendations.title': 'व्यक्तिगत सिफारिशें',
    'recommendations.subtitle': 'एआई को आपके स्थान के लिए सही भारतीय लोक कलाकृतियों की खोज करने दें। हमें अपनी प्राथमिकताओं के बारे में बताएं और हम आपकी शैली से मेल खाने वाले टुकड़ों की सिफारिश करेंगे',
    'recommendations.learn_more': 'और जानें',
    'recommendations.step1.title': 'आपको कौन से कला रूप पसंद हैं?',
    'recommendations.step1.subtitle': 'अपने पसंदीदा भारतीय लोक कला रूपों का चयन करें',
    'recommendations.step2.title': 'हमें अपनी प्राथमिकताओं के बारे में और बताएं',
    'recommendations.step2.subtitle': 'हमें आपकी शैली को बेहतर ढंग से समझने में मदद करें',
    'recommendations.step3.title': 'आपकी व्यक्तिगत सिफारिशें',
    'recommendations.step3.subtitle': 'आपकी प्राथमिकताओं के आधार पर, यहां कलाकृतियां हैं जो हमें लगता है कि आपको पसंद आएंगी',
    'recommendations.continue': 'जारी रखें',
    'recommendations.back': 'वापस',
    'recommendations.generate': 'एआई सिफारिशें उत्पन्न करें',
    'recommendations.adjust_preferences': 'प्राथमिकताएं समायोजित करें',
    'recommendations.explore_collection': 'हमारा पूरा संग्रह देखें',
    'recommendations.step': 'चरण',

    // Footer
    'footer.about': 'हमारे बारे में',
    'footer.about_text': 'हरिटेज आर्ट्स भारतीय लोक कला की समृद्ध सांस्कृतिक विरासत को संरक्षित और बढ़ावा देने के लिए समर्पित है',
    'footer.quick_links': 'त्वरित लिंक',
    'footer.contact': 'संपर्क करें',
    'footer.contact_text': 'किसी भी प्रश्न या सहायता के लिए हमसे संपर्क करें',
    'footer.follow_us': 'हमें फॉलो करें',
    'footer.copyright': '© 2024 हरिटेज आर्ट्स। सर्वाधिकार सुरक्षित।',

    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.close': 'बंद करें',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'common.more': 'अधिक',
    'common.less': 'कम',
    'common.search': 'खोजें',
    'common.of': 'का',
  },
  kn: {
    // Navigation
    'nav.explore': 'ಅನ್ವೇಷಿಸಿ',
    'nav.collections': 'ಸಂಗ್ರಹಗಳು',
    'nav.artists': 'ಕಲಾವಿದರು',
    'nav.museum_tours': 'ಸಂಗ್ರಹಾಲಯ ಸುತ್ತಾಟ',
    'nav.children': 'ಮಕ್ಕಳು',
    'nav.store': 'ಅಂಗಡಿ',
    'nav.ar_experience': 'ಎಆರ್ ಅನುಭವ',
    'nav.search_placeholder': 'ಕಲಾ ರೂಪಗಳು, ಕಲಾವಿದರನ್ನು ಹುಡುಕಿ...',
    'nav.voice': 'ಧ್ವನಿ',
    'nav.sign_in': 'ಸೈನ್ ಇನ್',
    'nav.user': 'ಬಳಕೆದಾರ',

    // Hero Section
    'hero.title': 'ಭಾರತೀಯ ಜಾನಪದ ಕಲೆಯ ಸಮೃದ್ಧ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
    'hero.subtitle': 'ಸಮಕಾಲೀನ ಡಿಜಿಟಲ್ ಅನುಭವಗಳ ಮೂಲಕ ಶತಮಾನಗಳಷ್ಟು ಹಳೆಯ ಸಂಪ್ರದಾಯಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    'hero.cta_primary': 'ಸಂಗ್ರಹಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    'hero.cta_secondary': 'ಹೆಚ್ಚು ತಿಳಿಯಿರಿ',

    // Featured Collections
    'collections.title': 'ವಿಶೇಷ ಸಂಗ್ರಹಗಳು',
    'collections.subtitle': 'ನಮ್ಮ ಎಚ್ಚರಿಕೆಯಿಂದ ಆಯ್ಕೆಮಾಡಿದ ಸಂಗ್ರಹಗಳ ಮೂಲಕ ಭಾರತೀಯ ಜಾನಪದ ಕಲೆಯ ವೈವಿಧ್ಯಮಯ ಜಗತ್ತನ್ನು ಅನ್ವೇಷಿಸಿ',
    'collections.view_all': 'ಎಲ್ಲಾ ಸಂಗ್ರಹಗಳನ್ನು ನೋಡಿ',
    'collections.view_details': 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    'collections.items': 'ವಿಷಯಗಳು',

    // Featured Artists
    'artists.title': 'ಮಾಸ್ಟರ್ ಕಲಾವಿದರು',
    'artists.subtitle': 'ನಮ್ಮ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯ ರಕ್ಷಕರನ್ನು ಭೇಟಿ ಮಾಡಿ - ಸಾಂಪ്ರದಾಯಿಕ ಜಾನಪದ ಕಲಾ ರೂಪಗಳನ್ನು ಸಂರಕ್ಷಿಸಲು ಮತ್ತು ಉತ್ತೇಜಿಸಲು ತಮ್ಮ ಜೀವಿತವನ್ನು ಸಮರ್ಪಿಸಿರುವ ಪ್ರತಿಭಾವಂತ ಕಲಾವಿದರು',
    'artists.discover_more': 'ಹೆಚ್ಚು ಕಲಾವಿದರನ್ನು ಅನ್ವೇಷಿಸಿ',
    'artists.view_profile': 'ಪ್ರೊಫೈಲ್ ನೋಡಿ',
    'artists.followers': 'ಅನುಯಾಯಿಗಳು',
    'artists.artworks': 'ಕಲಾಕೃತಿಗಳು',

    // Feature Highlights
    'highlights.title': 'ಹೆರಿಟೇಜ್ ಆರ್ಟ್ಸ್ ಏಕೆ ಆಯ್ಕೆಮಾಡಬೇಕು?',
    'highlights.cultural_preservation.title': 'ಸಾಂಸ್ಕೃತಿಕ ಸಂರಕ್ಷಣೆ',
    'highlights.cultural_preservation.description': 'ಭವಿಷ್ಯದ ಪೀಳಿಗೆಗಳಿಗಾಗಿ ಸಾಂಪ്ರದಾಯಿಕ ಭಾರತೀಯ ಜಾನಪದ ಕಲಾ ರೂಪಗಳನ್ನು ಸಂರಕ್ಷಿಸಲು ಮತ್ತು ಉತ್ತೇಜಿಸಲು ನಾವು ಬದ್ಧರಾಗಿದ್ದೇವೆ',
    'highlights.authentic_experience.title': 'ಪ್ರಾಮಾಣಿಕ ಅನುಭವ',
    'highlights.authentic_experience.description': 'ನಮ್ಮ ಸಂಗ್ರಹದಲ್ಲಿರುವ ಪ್ರತಿ ತುಣುಕು ಪ್ರಾಮಾಣಿಕತೆ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಪ್ರಾಮುಖ್ಯತೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ಎಚ್ಚರಿಕೆಯಿಂದ ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ',
    'highlights.global_access.title': 'ಜಾಗತಿಕ ಪಹುಂಚು',
    'highlights.global_access.description': 'ಜಗತ್ತಿನಲ್ಲಿ ಎಲ್ಲಿದ್ದರೂ, ನಿಮ್ಮ ಮನೆಗೆ ಭಾರತೀಯ ಜಾನಪದ ಕಲೆಯ ಸೌಂದರ്ಯವನ്ನു ತನ್ನಿ',

    // AR Experience
    'ar.title': 'ಆಗ್ಮೆಂಟೆಡ್ ರಿಯಾಲಿಱ്ಱಿ ಅನುಭವ',
    'ar.subtitle': 'ನಮ್ಮ ಅತ್ಯಾಧುನಿಕ ಎಆರ್ ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ನಿಮ್ಮ ಸ್ಥಳದಲ್ಲಿ ಭಾರತೀಯ ಜಾನಪದ ಕಲೆಯನ್ನು ಜೀವಂತಗೊಳಿಸಿ',
    'ar.try_ar': 'ಎಆರ್ ಅನುಭವವನ್ನು ಪ್ರಯತ್ನಿಸಿ',
    'ar.learn_more': 'ಹೆಚ್ಚು ತಿಳಿಯಿರಿ',

    // Personalized Recommendations
    'recommendations.title': 'ವೈಯಕ್ತಿಕ ಶಿಫಾರಸುಗಳು',
    'recommendations.subtitle': 'ಎಐ ನಿಮ್ಮ ಸ್ಥಳಕ್ಕಾಗಿ ಪರಿಪೂರ್ಣ ಭಾರತೀಯ ಜಾನಪದ ಕಲಾಕೃತಿಗಳು ಕಂಡುಹಿಡಿಯಲು ಅನುಮತಿಸಿ. ನಿಮ್ಮ ಆದ್ಯತೆಗಳ ಬಗ್ಗೆ ನಮಗೆ ಹೇಳಿ ಮತ್ತು ನಾವು ನಿಮ್ಮ ಶೈಲಿಗെ ಹೊಂದಾಣಿಕെಯಾಗುವ ತುಣುಕುಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇವೆ',
    'recommendations.learn_more': 'ಹೆಚ್ಚು ತಿಳಿಯಿರಿ',
    'recommendations.step1.title': 'ನಿಮಗೆ ಯಾವ ಕಲಾ ರೂಪಗಳು ಇಷ್ಟ?',
    'recommendations.step1.subtitle': 'ನಿಮ್ಮ ನೆಚ್ಚಿನ ಭಾರತೀಯ ಜಾನಪದ ಕಲಾ ರೂಪಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    'recommendations.step2.title': 'ನಿಮ್ಮ ಆದ್ಯತೆಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚು ಹೇಳಿ',
    'recommendations.step2.subtitle': 'ನಿಮ್ಮ ಶೈಲಿಯನ್ನು ಚೆನ್ನಾಗಿ ಅರ್ಥಮಾಡಿಕൊಳ್ಳಲು ನಮಗೆ ಸಹಾಯ ಮಾಡಿ',
    'recommendations.step3.title': 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಶಿಫಾರಸುಗಳು',
    'recommendations.step3.subtitle': 'ನಿಮ್ಮ ಆದ್ಯತೆಗಳ ಆಧಾರದಲ್ಲಿ, ನಾವು ಭಾವಿಸುವ ಕಲಾಕೃತಿಗಳು ಇಲ್ಲಿವೆ',
    'recommendations.continue': 'ಮುಂದುವರಿಸಿ',
    'recommendations.back': 'ಹಿಂದೆ',
    'recommendations.generate': 'ಎಐ ಶಿಫಾರಸುಗಳನ್ನು ರಚಿಸಿ',
    'recommendations.adjust_preferences': 'ಆದ್ಯತೆಗಳನ್ನು ಸರಿಹೊಂದಿಸಿ',
    'recommendations.explore_collection': 'ನಮ್ಮ ಸಂಪೂರ್ಣ ಸಂಗ್ರಹವನ್ನು ಅನ್ವೇಷಿಸಿ',
    'recommendations.step': 'ಚರಣ',

    // Footer
    'footer.about': 'ನಮ್ಮ ಬಗ್ಗೆ',
    'footer.about_text': 'ಹೆರಿಟೇಜ್ ಆರ್ಟ್ಸ್ ಭಾರತೀಯ ಜಾನಪದ ಕಲೆಯ ಸಮೃದ್ಧ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಸಂರಕ್ಷಿಸಲು ಮತ್ತು ಉತ್ತೇಜಿಸಲು ಸಮರ್ಪಿತವಾಗಿದೆ',
    'footer.quick_links': 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    'footer.contact': 'ಸಂಪರ್ಕಿಸಿ',
    'footer.contact_text': 'ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಬೆಂಬಲಕ്ಕಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    'footer.follow_us': 'ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ',
    'footer.copyright': '© 2024 ಹೆರಿಟೇಜ್ ಆರ್ಟ್ಸ್. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದುಕೊಳ್ಳಲಾಗಿದೆ.',

    // Common
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದ್ದು...',
    'common.error': 'ದೋಷ',
    'common.success': 'ಯಶಸ್ವಿ',
    'common.close': 'ಮುಚ್ಚಿ',
    'common.save': 'ಉಳಿಸಿ',
    'common.cancel': 'ರದ್ದುಮಾಡಿ',
    'common.edit': 'ಸಂಪಾದಿಸಿ',
    'common.delete': 'ಅಳಿಸಿ',
    'common.view': 'ನೋಡಿ',
    'common.more': 'ಹೆಚ್ಚು',
    'common.less': 'ಕಡಿಮೆ',
    'common.search': 'ಹುಡುಕಿ',
    'common.of': 'ನೋಡಿ',
  },
  ml: {
    // Navigation
    'nav.explore': 'അന്വേഷിക്കുക',
    'nav.collections': 'ശേഖരങ്ങൾ',
    'nav.artists': 'കലാകാരന്മാർ',
    'nav.museum_tours': 'മ്യൂസിയം ടൂറുകൾ',
    'nav.children': 'കുട്ടികൾ',
    'nav.store': 'സ്റ്റോർ',
    'nav.ar_experience': 'എആർ അനുഭവം',
    'nav.search_placeholder': 'കലാ രൂപങ്ങൾ, കലാകാരന്മാരെ തിരയുക...',
    'nav.voice': 'ശബ്ദം',
    'nav.sign_in': 'സൈൻ ഇൻ',
    'nav.user': 'ഉപയോക്താവ്',

    // Hero Section
    'hero.title': 'ഭാരതീയ ജനപദ കലയുടെ സമ്പന്നമായ പൈതൃകം കണ്ടെത്തുക',
    'hero.subtitle': 'സമകാലിക ഡിജിറ്റൽ അനുഭവങ്ങളിലൂടെ നൂറ്റാണ്ടുകളുടെ പഴയ പാരമ്പര്യങ്ങൾ അന്വേഷിക്കുക',
    'hero.cta_primary': 'ശേഖരങ്ങൾ അന്വേഷിക്കുക',
    'hero.cta_secondary': 'കൂടുതൽ അറിയുക',

    // Featured Collections
    'collections.title': 'വിശേഷ ശേഖരങ്ങൾ',
    'collections.subtitle': 'ഞങ്ങളുടെ ശ്രദ്ധാപൂർവ്വം തിരഞ്ഞെടുത്ത ശേഖരങ്ങളിലൂടെ ഭാരതീയ ജനപദ കലയുടെ വൈവിധ്യമാർന്ന ലോകം കണ്ടെത്തുക',
    'collections.view_all': 'എല്ലാ ശേഖരങ്ങളും കാണുക',
    'collections.view_details': 'വിവരങ്ങൾ കാണുക',
    'collections.items': 'വസ്തുകൾ',

    // Featured Artists
    'artists.title': 'മാസ്റ്റർ കലാകാരന്മാർ',
    'artists.subtitle': 'ഞങ്ങളുടെ സാംസ്കാരിക പൈതൃകത്തിന്റെ സംരക്ഷകരെ കണ്ടുമുട്ടുക - സാംപ്രദായിക ജനപദ കലാ രൂപങ്ങളെ സംരക്ഷിക്കാനും പ്രോത്സാഹിപ്പിക്കാനും അവരുടെ ജീവിതം സമർപ്പിച്ച പ്രതിഭാശാലികളായ കലാകാരന്മാർ',
    'artists.discover_more': 'കൂടുതൽ കലാകാരന്മാരെ കണ്ടെത്തുക',
    'artists.view_profile': 'പ്രൊഫൈൽ കാണുക',
    'artists.followers': 'അനുയായികൾ',
    'artists.artworks': 'കലാസൃഷ്ടികൾ',

    // Feature Highlights
    'highlights.title': 'ഹെറിറ്റേജ് ആർട്സ് എന്തുകൊണ്ട് തിരഞ്ഞെടുക്കണം?',
    'highlights.cultural_preservation.title': 'സാംസ്കാരിക സംരക്ഷണം',
    'highlights.cultural_preservation.description': 'ഭാവി തലമുറകൾക്കായി സാംപ്രദായിക ഭാരതീയ ജനപദ കലാ രൂപങ്ങളെ സംരക്ഷിക്കാനും പ്രോത്സാഹിപ്പിക്കാനും ഞങ്ങൾ പ്രതിജ്ഞാബദ്ധരാണ്',
    'highlights.authentic_experience.title': 'അധികാരിക അനുഭവം',
    'highlights.authentic_experience.description': 'ഞങ്ങളുടെ ശേഖരത്തിലെ ഓരോ കഷണവും സത്യസന്ധതയും സാംസ്കാരിക പ്രാധാന്യവും ഉറപ്പാക്കാൻ ശ്രദ്ധാപൂർവ്വം തിരഞ്ഞെടുത്തതാണ്',
    'highlights.global_access.title': 'ആഗോള ആക്സസ്',
    'highlights.global_access.description': 'ലോകത്തിൽ എവിടെയായാലും, നിങ്ങളുടെ വീട്ടിലേക്ക് ഭാരതീയ ജനപദ കലയുടെ സൗന്ദര്യം കൊണ്ടുവരുക',

    // AR Experience
    'ar.title': 'ഓഗ്മെന്റഡ് റിയാലിറ്റി അനുഭവം',
    'ar.subtitle': 'ഞങ്ങളുടെ ആധുനിക എആർ സാങ്കേതികവിദ്യയോടെ നിങ്ങളുടെ സ്ഥലത്ത് ഭാരതീയ ജനപദ കലയെ ജീവനോടെ കൊണ്ടുവരുക',
    'ar.try_ar': 'എആർ അനുഭവം പരീക്ഷിക്കുക',
    'ar.learn_more': 'കൂടുതൽ അറിയുക',

    // Personalized Recommendations
    'recommendations.title': 'വ്യക്തിഗത ശുപാർശകൾ',
    'recommendations.subtitle': 'എഐ നിങ്ങളുടെ സ്ഥലത്തിനായി തികഞ്ഞ ഭാരതീയ ജനപദ കലാസൃഷ്ടികളെ കണ്ടെത്താൻ അനുവദിക്കുക. നിങ്ങളുടെ ഇഷ്ടങ്ങളെക്കുറിച്ച് ഞങ്ങളോട് പറയുക, ഞങ്ങൾ നിങ്ങളുടെ ശൈലിക്ക് യോജിക്കുന്ന കഷണങ്ങൾ ശുപാർശ ചെയ്യും',
    'recommendations.learn_more': 'കൂടുതൽ അറിയുക',
    'recommendations.step1.title': 'നിങ്ങൾക്ക് ഏത് കലാ രൂപങ്ങൾ ഇഷ്ടമാണ്?',
    'recommendations.step1.subtitle': 'നിങ്ങളുടെ പ്രിയപ്പെട്ട ഭാരതീയ ജനപദ കലാ രൂപങ്ങൾ തിരഞ്ഞെടുക്കുക',
    'recommendations.step2.title': 'നിങ്ങളുടെ ഇഷ്ടങ്ങളെക്കുറിച്ച് കൂടുതൽ പറയുക',
    'recommendations.step2.subtitle': 'നിങ്ങളുടെ ശൈലിയെ നന്നായി മനസ്സിലാക്കാൻ ഞങ്ങളെ സഹായിക്കുക',
    'recommendations.step3.title': 'നിങ്ങളുടെ വ്യക്തിഗത ശുപാർശകൾ',
    'recommendations.step3.subtitle': 'നിങ്ങളുടെ ഇഷ്ടങ്ങളെ അടിസ്ഥാനമാക്കി, ഞങ്ങൾ കരുതുന്ന കലാസൃഷ്ടികൾ ഇതാ',
    'recommendations.continue': 'തുടരുക',
    'recommendations.back': 'തിരികെ',
    'recommendations.generate': 'എഐ ശുപാർശകൾ സൃഷ്ടിക്കുക',
    'recommendations.adjust_preferences': 'ഇഷ്ടങ്ങൾ ക്രമീകരിക്കുക',
    'recommendations.explore_collection': 'ഞങ്ങളുടെ സമ്പൂർണ്ണ ശേഖരം അന്വേഷിക്കുക',
    'recommendations.step': 'ചരണം',

    // Footer
    'footer.about': 'ഞങ്ങളെക്കുറിച്ച്',
    'footer.about_text': 'ഹെറിറ്റേജ് ആർട്സ് ഭാരതീയ ജനപദ കലയുടെ സമ്പന്നമായ സാംസ്കാരിക പൈതൃകത്തെ സംരക്ഷിക്കാനും പ്രോത്സാഹിപ്പിക്കാനും സമർപ്പിതമാണ്',
    'footer.quick_links': 'വേഗ ലിങ്കുകൾ',
    'footer.contact': 'ബന്ധപ്പെടുക',
    'footer.contact_text': 'ഏതെങ്കിലും ചോദ്യങ്ങൾക്കോ പിന്തുണയ്ക്കോ ഞങ്ങളെ ബന്ധപ്പെടുക',
    'footer.follow_us': 'ഞങ്ങളെ പിന്തുടരുക',
    'footer.copyright': '© 2024 ഹെറിറ്റേജ് ആർട്സ്. എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു.',

    // Common
    'common.loading': 'ലോഡ് ചെയ്യുന്നു...',
    'common.error': 'പിശക്',
    'common.success': 'വിജയം',
    'common.close': 'അടയ്ക്കുക',
    'common.save': 'സൂക്ഷിക്കുക',
    'common.cancel': 'റദ്ദാക്കുക',
    'common.edit': 'എഡിറ്റ് ചെയ്യുക',
    'common.delete': 'ഇല്ലാതാക്കുക',
    'common.view': 'കാണുക',
    'common.more': 'കൂടുതൽ',
    'common.less': 'കുറവ്',
    'common.search': 'ഹുഡുകുക',
    'common.of': 'നോഡി',
  }
};

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' }
];

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    currentLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
