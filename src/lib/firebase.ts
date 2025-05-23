
// Firebase is intentionally not initialized in this version.
// Configuration and initialization code has been removed.

// To re-enable Firebase:
// 1. Ensure you have a Firebase project set up.
// 2. Add your Firebase project config to .env.local:
//    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
//    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
//    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
//    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
//    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
//    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
// 3. Uncomment and potentially update the Firebase initialization code below.
// 4. Ensure firebase package is in package.json and installed.

/*
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const requiredEnvVars: Array<keyof typeof firebaseConfig> = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
];

const envVarMap: Record<keyof typeof firebaseConfig, string> = {
    apiKey: 'NEXT_PUBLIC_FIREBASE_API_KEY',
    authDomain: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    projectId: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    storageBucket: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    messagingSenderId: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    appId: 'NEXT_PUBLIC_FIREBASE_APP_ID',
};


const missingEnvVarDetails = requiredEnvVars
  .map(key => ({ key, envVarName: envVarMap[key], value: firebaseConfig[key] }))
  .filter(detail => !detail.value);

if (missingEnvVarDetails.length > 0) {
  const missingVarsString = missingEnvVarDetails.map(detail => detail.envVarName).join(', ');
  const errorMessage = 
    `Firebase configuration error: Missing environment variable(s): ${missingVarsString}. ` +
    `Please check your .env.local file and ensure all Firebase configuration values (listed above) are set correctly. ` +
    `You MUST restart your development server after updating the .env.local file.`;
  console.error(errorMessage);
  // To make it very obvious during development, we can throw an error.
  // In a production build, you might handle this differently or rely on build-time checks.
  if (process.env.NODE_ENV === 'development') {
    // throw new Error(errorMessage);
    // For now, we'll log and allow the app to proceed without Firebase if not configured.
    console.warn("Firebase not initialized due to missing configuration.");
  }
}


let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (missingEnvVarDetails.length === 0) {
    if (!getApps().length) {
    try {
        app = initializeApp(firebaseConfig);
    } catch (error: any) {
        console.error("Firebase initialization error details:", error);
        if (error.code === 'auth/invalid-api-key' || (error.message && error.message.includes('invalid-api-key'))) {
            const initErrorMessage = 
            `Firebase: Error (auth/invalid-api-key). This means the API key (NEXT_PUBLIC_FIREBASE_API_KEY) in your .env.local file is incorrect or not recognized by Firebase for project ID "${firebaseConfig.projectId}". ` +
            `Please meticulously double-check this API key against your Firebase project settings in the Firebase console. ` +
            `Ensure there are no typos or extra spaces. You MUST restart your development server after any changes to .env.local.`;
            console.error(initErrorMessage);
            // if (process.env.NODE_ENV === 'development') throw new Error(initErrorMessage);
        } else {
            const genericInitError = 
            `Firebase failed to initialize. Please check your Firebase configuration in .env.local and the Firebase console. Original error: ${error.message}. ` +
            `Ensure all NEXT_PUBLIC_FIREBASE_... variables are correct and restart your server.`;
            console.error(genericInitError);
            // if (process.env.NODE_ENV === 'development') throw new Error(genericInitError);
        }
    }
    } else {
    app = getApp();
    }

    if (app) {
        try {
            auth = getAuth(app);
        } catch (error: any) {
            console.error("Firebase getAuth() error details:", error);
            if (error.code === 'auth/invalid-api-key' || (error.message && error.message.includes('invalid-api-key'))) {
                const authInstanceErrorMessage = 
                `Firebase: Error (auth/invalid-api-key) encountered when trying to get Auth instance. This usually means the API key (NEXT_PUBLIC_FIREBASE_API_KEY) in your .env.local file is incorrect. ` +
                `Please double-check it against your Firebase console settings for project ID "${firebaseConfig.projectId}" and restart your development server.`;
                console.error(authInstanceErrorMessage);
                // if (process.env.NODE_ENV === 'development') throw new Error(authInstanceErrorMessage);

            } else {
                const genericAuthError = 
                `Firebase: Failed to get Auth instance. This can happen if Firebase initialization failed due to incorrect configuration (e.g., API key, project ID). `+
                `Please check your Firebase setup in .env.local and the Firebase console. Original error: ${error.message}. Restart your server after changes.`;
                console.error(genericAuthError);
                // if (process.env.NODE_ENV === 'development') throw new Error(genericAuthError);
            }
        }
    }
} else {
    console.warn("Firebase app and auth are not initialized because required environment variables are missing.");
}


export { app, auth };
*/

// Placeholder exports for when Firebase is not used
export const app = null;
export const auth = null;
