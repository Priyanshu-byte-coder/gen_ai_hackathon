// dashboard.js - Protected page logic
import { auth } from './firebase-config.js';
import { signOutUser, observeAuthState, shouldShowSurvey } from './auth.js';

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const dashboardContent = document.getElementById('dashboardContent');
const userProfile = document.getElementById('userProfile');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const signOutBtn = document.getElementById('signOutBtn');

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  initializeDashboard();
});

function initializeDashboard() {
  // Show loading screen initially
  showLoadingScreen();
  
  // Observe authentication state
  observeAuthState((user) => {
    if (user) {
      // Check if user needs to complete survey first
      if (shouldShowSurvey()) {
        window.location.href = 'welcome-survey.html';
        return;
      }
      // User is authenticated - show dashboard
      showDashboard(user);
    } else {
      // User is not authenticated - redirect to home
      redirectToHome();
    }
  });
  
  // Set up event listeners
  setupEventListeners();
}

function setupEventListeners() {
  // Sign out functionality
  signOutBtn.addEventListener('click', handleSignOut);
  
  // Dashboard card interactions
  const cardButtons = document.querySelectorAll('.card-btn');
  cardButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cardTitle = e.target.parentElement.querySelector('h3').textContent;
      showMessage(`${cardTitle} feature coming soon!`, 'info');
    });
  });
}

function showLoadingScreen() {
  loadingScreen.classList.remove('hidden');
  dashboardContent.classList.add('hidden');
  userProfile.classList.add('hidden');
}

function showDashboard(user) {
  // Hide loading screen
  loadingScreen.classList.add('hidden');
  
  // Show dashboard content
  dashboardContent.classList.remove('hidden');
  
  // Update user profile
  userName.textContent = user.displayName || user.email;
  userAvatar.src = user.photoURL || 'https://via.placeholder.com/40x40?text=U';
  userProfile.classList.remove('hidden');
  
  // Add welcome message
  showMessage(`Welcome back, ${user.displayName || 'User'}!`, 'success');
}

function redirectToHome() {
  // Show message and redirect
  showMessage('Please sign in to access the dashboard', 'error');
  
  // Redirect after 2 seconds
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
}

async function handleSignOut() {
  const result = await signOutUser();
  if (result.success) {
    showMessage('Successfully signed out!', 'success');
    // Redirect will happen automatically via auth state observer
  } else {
    showMessage(result.error, 'error');
  }
}

// Message display function
function showMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}
