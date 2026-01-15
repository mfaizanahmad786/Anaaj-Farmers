import { initializeApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

// Check if Firebase credentials are configured
const hasFirebaseConfig = 
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== 'your-api-key-here'

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef',
}

// Initialize Firebase (even with dummy config for type compatibility)
let app: any
let auth: Auth

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
} catch (error) {
  console.warn('Firebase initialization failed. Using mock auth mode.')
  // Create a minimal mock for type compatibility
  app = {} as any
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
  } as Auth
}

// Export whether we're using real Firebase or mock mode
export const isUsingMockAuth = !hasFirebaseConfig
export { auth }
export type { Auth }
export default app
