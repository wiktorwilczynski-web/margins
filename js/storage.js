// storage.js — localStorage helpers for Margins

const STORAGE_KEY = 'margins_data';

const Storage = {
  getDefaultData() {
    return {
      books: [],
      streak: { current: 0, longest: 0, lastCheckIn: null },
      connections: [],
      weeklyReflections: [],
      favorites: [],
      settings: {
        geminiApiKey: '',
        groqApiKey: '',
        reminderTime: '20:00',
        theme: 'dark'
      }
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Sync to cloud if authenticated
    if (window.Auth && window.Auth.currentUserId) {
      window.Auth.syncToCloud();
    }
  },

  getData() {
    return this.load() || this.getDefaultData();
  },

  updateData(fn) {
    const data = this.getData();
    fn(data);
    this.save(data);
    return data;
  },

  isFirstRun() {
    return !localStorage.getItem(STORAGE_KEY);
  },

  uuid() {
    return crypto.randomUUID ? crypto.randomUUID() :
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
  },

  exportJSON() {
    const data = this.getData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `margins-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.books && data.streak && data.settings) {
            this.save(data);
            resolve(data);
          } else {
            reject(new Error('Invalid backup format'));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsText(file);
    });
  },

  reset() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
