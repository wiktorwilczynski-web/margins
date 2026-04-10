// auth.js — Firebase Auth + Firestore for Margins (ES module)

import { initializeApp } from '../firebase/firebase-app.js';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut
} from '../firebase/firebase-auth.js';
import {
  initializeFirestore, persistentLocalCache, persistentSingleTabManager,
  doc, getDoc, setDoc, onSnapshot
} from '../firebase/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyA9qmeouE5wDEz5ttm_6XRXVE4XTzbeKjM",
  authDomain: "margins-reading-app.firebaseapp.com",
  projectId: "margins-reading-app",
  storageBucket: "margins-reading-app.firebasestorage.app",
  messagingSenderId: "837835039794",
  appId: "1:837835039794:web:a57bba613cec584cefc82b"
};

const fireApp = initializeApp(firebaseConfig);
const auth = getAuth(fireApp);
const db = initializeFirestore(fireApp, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager()
  })
});

let currentUserId = null;
let syncInProgress = false;
let unsubscribeSnapshot = null;

function usernameToEmail(username) {
  return username.toLowerCase().trim() + '@margins.app';
}

// ===== Cloud Sync =====

async function syncToCloud() {
  if (!currentUserId || syncInProgress) return;
  syncInProgress = true;
  try {
    const data = Storage.getData();
    await setDoc(doc(db, 'users', currentUserId), {
      ...data,
      lastSync: new Date().toISOString()
    });
  } catch (e) {
    console.error('Sync to cloud failed:', e);
  }
  syncInProgress = false;
}

async function loadFromCloud() {
  if (!currentUserId) return null;
  try {
    const snap = await getDoc(doc(db, 'users', currentUserId));
    if (snap.exists()) {
      return snap.data();
    }
  } catch (e) {
    console.error('Load from cloud failed:', e);
  }
  return null;
}

function startRealtimeSync() {
  if (!currentUserId) return;
  if (unsubscribeSnapshot) unsubscribeSnapshot();

  unsubscribeSnapshot = onSnapshot(doc(db, 'users', currentUserId), (snap) => {
    if (!snap.exists() || syncInProgress) return;
    const cloudData = snap.data();
    const localData = Storage.getData();

    // If cloud is newer, merge it — but DON'T trigger syncToCloud
    if (cloudData.lastSync && (!localData.lastSync || cloudData.lastSync > localData.lastSync)) {
      cloudData.settings = cloudData.settings || localData.settings;
      // Save locally without triggering cloud sync (avoid infinite loop)
      localStorage.setItem('margins_data', JSON.stringify(cloudData));
      // Re-render current tab
      if (window.App && window.App.currentTab) {
        window.App.renderTab(window.App.currentTab);
      }
    }
  });
}

// ===== Auth Screen =====

function showAuthScreen() {
  const screen = document.getElementById('auth-screen');
  const container = document.getElementById('auth-form');
  screen.style.display = 'flex';
  document.getElementById('app').style.display = 'none';

  let isRegister = false;

  function renderForm() {
    if (isRegister) {
      container.innerHTML = `
        <h1 class="auth-title">books</h1>
        <p class="auth-subtitle">your reading memory</p>
        <div class="auth-fields">
          <input type="text" id="auth-username" class="auth-input" placeholder="choose a username" maxlength="30" autocomplete="username" autocapitalize="none" spellcheck="false">
          <input type="password" id="auth-password" class="auth-input" placeholder="choose a password" autocomplete="new-password">
        </div>
        <button id="auth-submit" class="auth-btn auth-btn-primary">create account</button>
        <button id="auth-toggle" class="auth-btn auth-btn-link">already have an account? sign in</button>
      `;
    } else {
      container.innerHTML = `
        <h1 class="auth-title">books</h1>
        <p class="auth-subtitle">your reading memory</p>
        <div class="auth-fields">
          <input type="text" id="auth-username" class="auth-input" placeholder="username" maxlength="30" autocomplete="username" autocapitalize="none" spellcheck="false">
          <input type="password" id="auth-password" class="auth-input" placeholder="password" autocomplete="current-password">
        </div>
        <button id="auth-submit" class="auth-btn auth-btn-primary">sign in</button>
        <button id="auth-toggle" class="auth-btn auth-btn-link">create an account</button>
      `;
    }

    document.getElementById('auth-username').focus();

    document.getElementById('auth-toggle').onclick = () => {
      isRegister = !isRegister;
      renderForm();
    };

    document.getElementById('auth-submit').onclick = handleSubmit;

    container.querySelectorAll('.auth-input').forEach(input => {
      input.onkeydown = (e) => { if (e.key === 'Enter') handleSubmit(); };
    });
  }

  async function handleSubmit() {
    const username = document.getElementById('auth-username').value.trim();
    const password = document.getElementById('auth-password').value;

    if (!username) { showAuthToast('Enter a username'); return; }
    if (username.length < 3) { showAuthToast('Username must be at least 3 characters'); return; }
    if (!/^[a-zA-Z0-9_.\-]+$/.test(username)) { showAuthToast('Username can only contain letters, numbers, . _ -'); return; }
    if (!password) { showAuthToast('Enter a password'); return; }
    if (isRegister && password.length < 8) { showAuthToast('Password must be at least 8 characters'); return; }

    const email = usernameToEmail(username);
    const btn = document.getElementById('auth-submit');
    btn.disabled = true;
    btn.textContent = isRegister ? 'creating...' : 'signing in...';

    try {
      if (isRegister) {
        // New account starts with default data
        Storage.save(Storage.getDefaultData());
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (e) {
      btn.disabled = false;
      btn.textContent = isRegister ? 'create account' : 'sign in';
      const msg = {
        'auth/email-already-in-use': 'Username already taken',
        'auth/user-not-found': 'No account with that username',
        'auth/wrong-password': 'Wrong password',
        'auth/invalid-credential': 'Wrong username or password',
        'auth/weak-password': 'Password must be at least 6 characters',
        'auth/too-many-requests': 'Too many attempts \u2014 try again later',
        'auth/invalid-email': 'Invalid username',
      }[e.code] || e.message;
      showAuthToast(msg);
    }
  }

  renderForm();
}

function showAuthToast(msg) {
  // Use App toast if available, else create inline
  if (window.App && window.App.showToast) {
    window.App.showToast(msg);
    return;
  }
  let toast = document.getElementById('auth-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'auth-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Auth State Listener =====

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUserId = user.uid;

    // Try loading cloud data
    const cloudData = await loadFromCloud();
    if (cloudData) {
      Storage.save(cloudData);
    } else {
      // First login — load initial data if empty, then sync up
      const local = Storage.getData();
      if (local.books.length === 0) {
        await DataLoader.loadInitialData();
      }
      await syncToCloud();
    }

    // Start real-time sync
    startRealtimeSync();

    // Show app
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    window.App.init();

    // Fetch missing covers in background
    Covers.fetchMissingCovers();
  } else {
    currentUserId = null;
    if (unsubscribeSnapshot) {
      unsubscribeSnapshot();
      unsubscribeSnapshot = null;
    }
    showAuthScreen();
  }
});

// Expose sync and signout to global scope
window.Auth = {
  syncToCloud,
  signOut: () => signOut(auth),
  get currentUserId() { return currentUserId; }
};
