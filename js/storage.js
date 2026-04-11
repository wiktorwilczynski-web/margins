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
            // Auto-backup before import
            this.createBackup('pre-import');
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

  // ===== AUTO-BACKUP SYSTEM =====
  createBackup(label) {
    try {
      const data = this.load();
      if (!data) return;
      const key = `margins_backup_${label}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}`;
      localStorage.setItem(key, JSON.stringify(data));
      // Keep only last 3 backups per label
      this.pruneBackups(label, 3);
    } catch (e) {
      console.warn('Backup failed:', e.message);
    }
  },

  pruneBackups(label, keep) {
    const prefix = `margins_backup_${label}_`;
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) keys.push(k);
    }
    keys.sort();
    while (keys.length > keep) {
      localStorage.removeItem(keys.shift());
    }
  },

  dailyBackup() {
    const lastBackup = localStorage.getItem('margins_last_daily_backup');
    const today = new Date().toISOString().slice(0, 10);
    if (lastBackup === today) return;
    this.createBackup('daily');
    localStorage.setItem('margins_last_daily_backup', today);
  },

  listBackups() {
    const backups = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('margins_backup_')) {
        backups.push(k);
      }
    }
    return backups.sort().reverse();
  },

  restoreBackup(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (data.books && data.settings) {
        this.createBackup('pre-restore');
        this.save(data);
        return true;
      }
    } catch (e) {
      console.error('Restore failed:', e);
    }
    return false;
  },

  reset() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
