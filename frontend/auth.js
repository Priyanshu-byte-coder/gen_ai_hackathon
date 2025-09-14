// auth.js
import { auth } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Sign up with email and password
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with display name
    await updateProfile(user, {
      displayName: displayName
    });
    
    // Mark as first-time user
    localStorage.setItem('mindwell_first_time_user', 'true');
    localStorage.setItem('mindwell_signup_timestamp', new Date().toISOString());
    
    console.log('User created successfully:', user);
    return { success: true, user, isFirstTime: true };
  } catch (error) {
    console.error('Sign up error:', error.message);
    return { success: false, error: error.message };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed in successfully:', user);
    return { success: true, user };
  } catch (error) {
    console.error('Sign in error:', error.message);
    return { success: false, error: error.message };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if this is a new user (first time signing in with Google)
    const isFirstTime = result.additionalUserInfo?.isNewUser || false;
    
    if (isFirstTime) {
      localStorage.setItem('mindwell_first_time_user', 'true');
      localStorage.setItem('mindwell_signup_timestamp', new Date().toISOString());
    }
    
    console.log('Google sign in successful:', user);
    return { success: true, user, isFirstTime };
  } catch (error) {
    console.error('Google sign in error:', error.message);
    return { success: false, error: error.message };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error.message);
    return { success: false, error: error.message };
  }
};

// Auth state observer
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Check if user needs to complete survey
export const shouldShowSurvey = () => {
  const isFirstTime = localStorage.getItem('mindwell_first_time_user') === 'true';
  const surveyCompleted = localStorage.getItem('mindwell_survey_completed') === 'true';
  return isFirstTime && !surveyCompleted;
};

// Mark survey as completed
export const completeSurvey = () => {
  localStorage.setItem('mindwell_survey_completed', 'true');
  localStorage.removeItem('mindwell_first_time_user');
};