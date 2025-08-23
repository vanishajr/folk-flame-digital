import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { RecaptchaVerifier } from 'firebase/auth'
import { auth } from './firebase'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to setup reCAPTCHA verifier for Firebase phone authentication
// This uses the free built-in reCAPTCHA - no Enterprise setup required
export function setupRecaptchaVerifier(containerId: string = 'recaptcha-container'): RecaptchaVerifier {
  // Ensure the reCAPTCHA container exists
  let recaptchaContainer = document.getElementById(containerId);
  if (!recaptchaContainer) {
    recaptchaContainer = document.createElement('div');
    recaptchaContainer.id = containerId;
    recaptchaContainer.style.position = 'fixed';
    recaptchaContainer.style.top = '0';
    recaptchaContainer.style.left = '0';
    recaptchaContainer.style.zIndex = '-1';
    document.body.appendChild(recaptchaContainer);
  }

  // Clear any existing reCAPTCHA verifier
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
  }

  // Create new reCAPTCHA verifier using Firebase's free built-in reCAPTCHA
  const verifier = new RecaptchaVerifier(auth, containerId, {
    'size': 'invisible',
    'callback': () => {
      console.log('reCAPTCHA solved successfully');
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired, user needs to retry');
    }
  });

  // Store the verifier globally for cleanup
  window.recaptchaVerifier = verifier;
  
  return verifier;
}
