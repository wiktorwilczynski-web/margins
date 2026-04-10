// covers.js — Open Library cover fetching

const Covers = {
  cache: {},

  async fetchCover(title, author) {
    const key = `${title}__${author}`;
    if (this.cache[key] !== undefined) return this.cache[key];

    try {
      // Try search API for better matching
      const query = encodeURIComponent(`${title} ${author}`);
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=3`);
      const json = await res.json();

      if (json.docs && json.docs.length > 0) {
        // Find the best match with a cover
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
      // Re-render library if visible
      if (window.App && window.App.currentTab === 'library') {
        window.App.renderLibrary();
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
