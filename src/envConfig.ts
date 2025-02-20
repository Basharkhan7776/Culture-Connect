
import dotenv from 'dotenv';

dotenv.config();



export const uploadPreset = process.env.UPLOAD_PRESET;
export const cloudName = process.env.CLOUD_NAME;

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};


export const adminEmail = process.env.ADMIN_EMAIL;

export const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
export const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
export const USER_ID = process.env.EMAILJS_USER_ID;