import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
const firebaseConfig = {
    apiKey: "AIzaSyCSTP5xW8ycgD25ir73qytmCtJu-80ntWA",
    authDomain: "genai-7fbb2.firebaseapp.com",
    projectId: "genai-7fbb2",
    storageBucket: "genai-7fbb2.firebasestorage.app",
    messagingSenderId: "263032046477",
    appId: "1:263032046477:web:64c88e4c4209e5d8c833c4",
    measurementId: "G-XXZ1D59WXN"
  };
const app=initializeApp(firebaseConfig);

export const auth=getAuth(app);