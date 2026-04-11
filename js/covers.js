// covers.js — Open Library cover fetching

const Covers = {
  cache: {},

  // Hardcoded English editions for books that Open Library misidentifies
  COVER_OVERRIDES: {
    'the shock doctrine__naomi klein': 'https://covers.openlibrary.org/b/isbn/9780805079838-L.jpg',
  },

  async fetchCover(title, author) {
    const key = `${title}__${author}`;
    const overrideKey = key.toLowerCase();
    if (this.COVER_OVERRIDES[overrideKey]) {
      this.cache[key] = this.COVER_OVERRIDES[overrideKey];
      return this.COVER_OVERRIDES[overrideKey];
    }
    if (this.cache[key] !== undefined) return this.cache[key];

    try {
      const query = encodeURIComponent(`${title} ${author}`);
      // lang=eng biases results toward English editions
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}&lang=eng&limit=5`);
      const json = await res.json();

      if (json.docs && json.docs.length > 0) {
        for (const doc of json.docs) {
          if (doc.cover_i) {
            const url = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
            this.cache[key] = url;
            return url;
          }
        }
      }
    } catch {
      // Network error, return null
    }

    this.cache[key] = null;
    return null;
  },

  // Fetch covers for any books that don't have them yet
  async fetchMissingCovers() {
    const data = Storage.getData();
    let updated = false;

    for (const book of data.books) {
      if (!book.coverUrl && book.title !== 'Loose Quotes') {
        const url = await this.fetchCover(book.title, book.author);
        if (url) {
          book.coverUrl = url;
          updated = true;
        }
      }
    }

    if (updated) {
      Storage.save(data);
      if (window.App && window.App.currentTab === 'library') {
        window.App.renderLibrary();
      }
    }
  },

  // Force re-fetch all covers (used to upgrade to English editions)
  async refreshAllCovers() {
    const data = Storage.getData();
    this.cache = {}; // clear in-memory cache
    let updated = false;

    for (const book of data.books) {
      if (book.title === 'Loose Quotes') continue;
      book.coverUrl = null; // clear stored cover
      const url = await this.fetchCover(book.title, book.author);
      if (url) {
        book.coverUrl = url;
        updated = true;
      }
    }

    if (updated) {
      Storage.save(data);
      if (window.App) {
        const tab = window.App.currentTab;
        if (tab === 'library') window.App.renderLibrary();
        else if (tab === 'today') window.App.renderToday();
      }
    }
  },

  renderCover(book, size = 'card') {
    if (book.coverUrl) {
      const cls = size === 'hub' ? 'hub-cover' : 'book-cover';
      const escapedTitle = (book.title || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const escapedAuthor = (book.author || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
      return `<img class="${cls}" src="${book.coverUrl}" alt="${escapedTitle}" onerror="this.outerHTML=Covers.placeholderHTML('${escapedTitle}','${escapedAuthor}','${size}')">`;
    }
    return this.placeholderHTML(book.title, book.author, size);
  },

  placeholderHTML(title, author, size) {
    const cls = size === 'hub' ? 'hub-cover-placeholder' : 'book-cover-placeholder';
    return `<div class="${cls}"><span class="cover-title">${title}</span><span class="cover-author">${author || ''}</span></div>`;
  }
};
