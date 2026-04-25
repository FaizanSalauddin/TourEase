// js/utils.js
// Shared utility functions used across all pages

const API_BASE = 'https://tourease-backend-5xx6.onrender.com/api';

// ==================== AUTH HELPERS ====================

// Save user info and token to localStorage after login/register
function saveAuth(data) {
  localStorage.setItem('tourease_token', data.token);
  localStorage.setItem('tourease_user', JSON.stringify(data.user));
}

// Get JWT token
function getToken() {
  return localStorage.getItem('tourease_token');
}

// Get current logged-in user
function getCurrentUser() {
  const user = localStorage.getItem('tourease_user');
  return user ? JSON.parse(user) : null;
}

// Check if user is logged in
function isLoggedIn() {
  return !!getToken();
}

// Check if user is admin
function isAdmin() {
  const user = getCurrentUser();
  return user && user.isAdmin;
}

// Logout user
function logout() {
  localStorage.removeItem('tourease_token');
  localStorage.removeItem('tourease_user');
  window.location.href = 'login.html';
}

// ==================== API HELPERS ====================

// Make authenticated API request
async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json'
  };

  // Add auth token if available
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// ==================== UI HELPERS ====================

// Show error alert
function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
    el.className = 'alert alert-error';
  }
}

// Show success alert
function showSuccess(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
    el.className = 'alert alert-success';
  }
}

// Hide alert
function hideAlert(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.style.display = 'none';
}

// Format price in Indian Rupees
function formatPrice(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// Format date nicely
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Get query param from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ==================== NAVBAR SETUP ====================

// Setup navbar based on login state
function setupNavbar() {
  const user = getCurrentUser();
  const navActionsEl = document.getElementById('navActions');
  if (!navActionsEl) return;

  if (user) {
    navActionsEl.innerHTML = `
      <span style="font-size:0.9rem; color:var(--text-mid)">Hi, ${user.name.split(' ')[0]}</span>
      <a href="my-bookings.html" class="btn-outline">My Bookings</a>
      ${user.isAdmin ? '<a href="admin.html" class="btn-outline">Admin</a>' : ''}
      <button onclick="logout()" class="btn-primary">Logout</button>
    `;
  } else {
    navActionsEl.innerHTML = `
      <a href="login.html" class="btn-outline">Login</a>
      <a href="register.html" class="btn-primary">Register</a>
    `;
  }
}

// Highlight active nav link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });
}

// Initialize on every page
document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setActiveNavLink();
});