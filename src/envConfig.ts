export const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
export const cloudName = import.meta.env.VITE_CLOUD_NAME;



export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


export const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

export const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
export const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID