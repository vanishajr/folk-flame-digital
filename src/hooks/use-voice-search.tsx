import { useState, useCallback, useEffect } from 'react';

interface VoiceSearchResult {
  transcript: string;
  language: string;
  confidence: number;
}

interface UseVoiceSearchReturn {
  isListening: boolean;
  transcript: string;
  language: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  reset: () => void;
}

export const useVoiceSearch = (): UseVoiceSearchReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    // Configure recognition settings
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 3;
    
    // Set language options - prioritize Indian languages
    recognitionInstance.lang = 'en-IN,hi-IN,kn-IN,ta-IN,te-IN,ml-IN,gu-IN,pa-IN,bn-IN,or-IN,as-IN,mr-IN';
    
    // Event handlers
    recognitionInstance.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript('');
    };

    recognitionInstance.onresult = (event) => {
      let finalTranscript = '';
      let detectedLanguage = '';
      let maxConfidence = 0;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
          
          // Get the best alternative with highest confidence
          for (let j = 0; j < result.length; j++) {
            if (result[j].confidence > maxConfidence) {
              maxConfidence = result[j].confidence;
              detectedLanguage = result[j].lang || 'en-IN';
            }
          }
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        setLanguage(detectedLanguage);
      }
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      switch (event.error) {
        case 'no-speech':
          setError('No speech detected. Please try again.');
          break;
        case 'audio-capture':
          setError('Microphone access denied. Please allow microphone access.');
          break;
        case 'not-allowed':
          setError('Microphone access denied. Please allow microphone access.');
          break;
        case 'network':
          setError('Network error. Please check your connection.');
          break;
        default:
          setError('Speech recognition error. Please try again.');
      }
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);

    // Cleanup
    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (err) {
        setError('Failed to start voice recognition. Please try again.');
      }
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
    }
  }, [recognition, isListening]);

  const reset = useCallback(() => {
    setTranscript('');
    setLanguage('');
    setError(null);
    if (isListening) {
      stopListening();
    }
  }, [isListening, stopListening]);

  return {
    isListening,
    transcript,
    language,
    error,
    startListening,
    stopListening,
    reset,
  };
};

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
