// Add this at the very top of app.js for testing
console.log("App.js loaded successfully!");
window.addEventListener('load', () => {
  console.log("Page loaded, DOM ready");
});
// app.js
import { 
    signUpWithEmail, 
    signInWithEmail, 
    signInWithGoogle, 
    signOutUser, 
    observeAuthState 
  } from './auth.js';
  
  // DOM Elements
  const authModal = document.getElementById('authModal');
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  const userProfile = document.getElementById('userProfile');
  const signInBtn = document.getElementById('signInBtn');
  const getStartedBtn = document.getElementById('getStartedBtn');
  
  // Modal controls
  const closeModal = document.querySelector('.close-modal');
  const showSignUp = document.getElementById('showSignUp');
  const showSignIn = document.getElementById('showSignIn');
  
  // Form elements
  const signInFormElement = document.getElementById('signInFormElement');
  const signUpFormElement = document.getElementById('signUpFormElement');
  const googleSignInBtn = document.getElementById('googleSignInBtn');
  const googleSignUpBtn = document.getElementById('googleSignUpBtn');
  const signOutBtn = document.getElementById('signOutBtn');
  
  // User profile elements
  const userAvatar = document.getElementById('userAvatar');
  const userName = document.getElementById('userName');
  
  // Initialize the app
  document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
  });
  
  function initializeApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Observe authentication state changes
    observeAuthState((user) => {
      if (user) {
        // User is signed in
        showUserProfile(user);
        hideAuthModal();
      } else {
        // User is signed out
        hideUserProfile();
      }
    });
  }
  
  function setupEventListeners() {
    // Modal controls
    signInBtn.addEventListener('click', () => showAuthModal('signin'));
    getStartedBtn.addEventListener('click', () => showAuthModal('signup'));
    closeModal.addEventListener('click', hideAuthModal);
    showSignUp.addEventListener('click', () => switchToSignUp());
    showSignIn.addEventListener('click', () => switchToSignIn());
    
    // Form submissions
    signInFormElement.addEventListener('submit', handleSignIn);
    signUpFormElement.addEventListener('submit', handleSignUp);
    
    // Google authentication
    googleSignInBtn.addEventListener('click', handleGoogleSignIn);
    googleSignUpBtn.addEventListener('click', handleGoogleSignIn);
    
    // Sign out
    signOutBtn.addEventListener('click', handleSignOut);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === authModal) {
        hideAuthModal();
      }
    });
  }
  
  // Modal functions
  function showAuthModal(type = 'signin') {
    authModal.classList.remove('hidden');
    if (type === 'signup') {
      switchToSignUp();
    } else {
      switchToSignIn();
    }
  }
  
  function hideAuthModal() {
    authModal.classList.add('hidden');
  }
  
  function switchToSignUp() {
    signInForm.classList.add('hidden');
    signUpForm.classList.remove('hidden');
  }
  
  function switchToSignIn() {
    signUpForm.classList.add('hidden');
    signInForm.classList.remove('hidden');
  }
  
  // Authentication handlers
  async function handleSignIn(e) {
    e.preventDefault();
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    
    const result = await signInWithEmail(email, password);
    if (result.success) {
      showMessage('Successfully signed in!', 'success');
    } else {
      showMessage(result.error, 'error');
    }
  }
  
  async function handleSignUp(e) {
    e.preventDefault();
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    
    const result = await signUpWithEmail(email, password, name);
    if (result.success) {
      showMessage('Account created successfully!', 'success');
    } else {
      showMessage(result.error, 'error');
    }
  }
  
  async function handleGoogleSignIn() {
    const result = await signInWithGoogle();
    if (result.success) {
      showMessage('Successfully signed in with Google!', 'success');
    } else {
      showMessage(result.error, 'error');
    }
  }
  
  async function handleSignOut() {
    const result = await signOutUser();
    if (result.success) {
      showMessage('Successfully signed out!', 'success');
    } else {
      showMessage(result.error, 'error');
    }
  }
  
  // UI update functions
  function showUserProfile(user) {
    // Update user profile display
    userName.textContent = user.displayName || user.email;
    userAvatar.src = user.photoURL || 'https://via.placeholder.com/40x40?text=U';
    
    // Show profile, hide sign in button
    userProfile.classList.remove('hidden');
    signInBtn.style.display = 'none';
    getStartedBtn.textContent = 'Dashboard';
    
    // Add dashboard navigation
    getStartedBtn.onclick = () => {
      window.location.href = 'dashboard.html';
    };
  }
  
  function hideUserProfile() {
    userProfile.classList.add('hidden');
    signInBtn.style.display = 'inline-block';
    getStartedBtn.textContent = 'Get Started';
  }
  
  // Message display function
  function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }