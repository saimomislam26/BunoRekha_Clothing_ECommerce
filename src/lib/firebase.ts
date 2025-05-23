
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const requiredEnvVars: Record<keyof typeof firebaseConfig, string> = {
  apiKey: 'NEXT_PUBLIC_FIREBASE_API_KEY',
  authDomain: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  projectId: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  storageBucket: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'NEXT_PUBLIC_FIREBASE_APP_ID',
};

const missingEnvVarDetails = Object.entries(requiredEnvVars)
  .map(([key, envVarName]) => ({ key, envVarName, value: process.env[envVarName] }))
  .filter(detail => !detail.value);

if (missingEnvVarDetails.length > 0) {
  const missingVarsString = missingEnvVarDetails.map(detail => detail.envVarName).join(', ');
  throw new Error(
    `Firebase configuration error: Missing environment variable(s): ${missingVarsString}. ` +
    `Please check your .env.local file and ensure all Firebase configuration values (listed above) are set correctly. ` +
    `You MUST restart your development server after updating the .env.local file.`
  );
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

let app: FirebaseApp;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error: any) {
    console.error("Firebase initialization error details:", error);
    if (error.code === 'auth/invalid-api-key' || (error.message && error.message.includes('invalid-api-key'))) {
        throw new Error(
        `Firebase: Error (auth/invalid-api-key). This means the API key (NEXT_PUBLIC_FIREBASE_API_KEY) in your .env.local file is incorrect or not recognized by Firebase for project ID "${firebaseConfig.projectId}". ` +
        `Please meticulously double-check this API key against your Firebase project settings in the Firebase console. ` +
        `Ensure there are no typos or extra spaces. You MUST restart your development server after any changes to .env.local.`
        );
    }
    throw new Error(
        `Firebase failed to initialize. Please check your Firebase configuration in .env.local and the Firebase console. Original error: ${error.message}. ` +
        `Ensure all NEXT_PUBLIC_FIREBASE_... variables are correct and restart your server.`
    );
  }
} else {
  app = getApp();
}

let auth: Auth;
try {
  auth = getAuth(app);
} catch (error: any) {
    console.error("Firebase getAuth() error details:", error);
     if (error.code === 'auth/invalid-api-key' || (error.message && error.message.includes('invalid-api-key'))) {
        throw new Error(
        `Firebase: Error (auth/invalid-api-key) encountered when trying to get Auth instance. This usually means the API key (NEXT_PUBLIC_FIREBASE_API_KEY) in your .env.local file is incorrect. ` +
        `Please double-check it against your Firebase console settings for project ID "${firebaseConfig.projectId}" and restart your development server.`
        );
    }
    throw new Error(
        `Firebase: Failed to get Auth instance. This can happen if Firebase initialization failed due to incorrect configuration (e.g., API key, project ID). `+
        `Please check your Firebase setup in .env.local and the Firebase console. Original error: ${error.message}. Restart your server after changes.`
    );
}

export { app, auth };
