// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA_gnzBdj8GkrLVQi6Qide9LGubqqMi4gc',
  authDomain: 'entaku-stage-simulator.firebaseapp.com',
  projectId: 'entaku-stage-simulator',
  storageBucket: 'entaku-stage-simulator.firebasestorage.app',
  messagingSenderId: '37590860181',
  appId: '1:37590860181:web:1ef2906435eb7d8ca4b69c',
  measurementId: 'G-S60QBB6Y8E',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
