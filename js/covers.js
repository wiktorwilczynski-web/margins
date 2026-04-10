// covers.js — Open Library cover fetching

const Covers = {
  cache: {},

  async fetchCover(title, author) {
    const key = `${title}__${author}`;
    if (this.cache[key] !== undefined) return this.cache[key];

    try {
      // Try search API for better matching
      const query = encodeURIComponent(`${title} ${author}`);
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=1`);
      const json = await res.json();

      if (json.docs && json.docs.length > 0) {
        const doc = json.docs[0];
        if (doc.cover_i) {
          const url = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
          this.cache[key] = url;
          return url;
        }
      }

      // Fallback: try by title directly
      const titleEncoded = encodeURIComponent(title);
      const directUrl = `https://covers.openlibrary.org/b/title/${titleEncoded}-L.jpg`;

      // Check if the image actually exists
      const imgCheck = await fetch(directUrl, { method: 'HEAD' });
      if (imgCheck.ok && imgCheck.headers.get('content-length') > '1000') {
        this.cache[key] = directUrl;
        return directUrl;
      }
    } catch {
      // Network error, return null
    }

    this.cache[key] = null;
    return null;
  },

  renderCover(book, size = 'card') {
    if (book.coverUrl) {
      if (size === 'hub') {
        return `<img class="hub-cover" src="${book.coverUrl}" alt="${book.title}" onerror="this.outerHTML=Covers.placeholderHTML('${book.title.replace(/'/g, "\\'")}','${(book.author || '').replace(/'/g, "\\'")}','hub')">`;
      }
      return `<img class="book-cover" src="${book.coverUrl}" alt="${book.title}" onerror="this.outerHTML=Covers.placeholderHTML('${book.title.replace(/'/g, "\\'")}','${(book.author || '').replace(/'/g, "\\'")}','card')">`;
    }
    return this.placeholderHTML(book.title, book.author, size);
  },

  placeholderHTML(title, author, size) {
    const cls = size === 'hub' ? 'hub-cover-placeholder' : 'book-cover-placeholder';
    return `<div class="${cls}"><span class="cover-title">${title}</span><span class="cover-author">${author || ''}</span></div>`;
  }
};
