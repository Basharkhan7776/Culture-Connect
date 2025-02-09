import dotenv from 'dotenv';

dotenv.config();



export const uploadPreset=process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
export const cloudName=process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const adminEmail=process.env.REACT_APP_ADMIN_EMAIL;

export const SERVICE_ID=process.env.REACT_APP_EMAILJS_SERVICE_ID;
export const TEMPLATE_ID=process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
export const USER_ID=process.env.REACT_APP_EMAILJS_USER_ID;