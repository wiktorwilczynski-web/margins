// data.js — loads initial-data.json on first run

const DataLoader = {
  async loadInitialData() {
    if (!Storage.isFirstRun()) return;

    try {
      const res = await fetch('data/initial-data.json');
      const initial = await res.json();

      const data = Storage.getDefaultData();

      const initialBooks = initial.sources || initial.books || [];
      for (const book of initialBooks) {
        // Ensure IDs exist
        book.id = book.id || Storage.uuid();
        book.type = book.type || 'book';
        book.coverUrl = book.coverUrl || null;
        book.currentPage = book.currentPage || 0;
        book.totalPages = book.totalPages || null;
        book.completed = book.completed || false;
        book.lessons = (book.lessons || []).map(l => ({
          ...l,
          id: l.id || Storage.uuid(),
          recallScore: l.recallScore || 0,
          lastSeen: l.lastSeen || null
        }));
        book.quotes = (book.quotes || []).map(q => ({
          ...q,
          id: q.id || Storage.uuid()
        }));
        book.addedAt = book.addedAt || new Date().toISOString();

        data.sources.push(book);
      }

      Storage.save(data);

      // Fetch covers in the background
      DataLoader.fetchAllCovers(data);
    } catch (err) {
      console.error('Failed to load initial data:', err);
      // Still save default data so we don't retry
      Storage.save(Storage.getDefaultData());
    }
  },

  async fetchAllCovers(data) {
    for (const book of data.sources) {
      if (!book.coverUrl && book.title !== 'Loose Quotes' && book.type !== 'podcast') {
        const url = await Covers.fetchCover(book.title, book.author);
        if (url) {
          book.coverUrl = url;
        }
      }
    }
    Storage.save(data);
    // Re-render library if we're on that tab
    if (App && App.currentTab === 'library') {
      App.renderLibrary();
    }
  }
};
