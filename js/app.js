// app.js — Main logic, routing, state for Margins

const App = {
  currentTab: 'today',
  chatMessages: [],
  chatContext: null, // { type: 'book'|'lesson', id: string }
  flashcardFlipped: false,
  currentFlashcard: null,
  connectionPair: null,

  initialized: false,

  async init() {
    if (this.initialized) {
      // Just re-render on re-auth
      this.applyTheme();
      this.renderTab('today');
      return;
    }
    this.initialized = true;
    this.applyTheme();
    this.bindNavigation();
    this.bindSettings();
    this.bindAddBook();
    this.bindPullToRefresh();
    this.registerSW();
    this.renderTab('today');
    this.addToast();
  },

  // ===== NAVIGATION =====
  bindNavigation() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderTab(btn.dataset.tab);
      });
    });
  },

  renderTab(tab) {
    this.currentTab = tab;
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    main.scrollTop = 0;

    // Remove FAB if exists
    document.querySelector('.add-book-fab')?.remove();

    switch (tab) {
      case 'today': this.renderToday(main); break;
      case 'library': this.renderLibrary(main); break;
      case 'practice': this.renderPractice(main); break;
      case 'ask': this.renderAsk(main); break;
    }
  },

  // ===== TODAY TAB =====
  renderToday(container) {
    const main = container || document.getElementById('main-content');
    main.innerHTML = '';

    const data = Storage.getData();
    const streak = data.streak;
    const allLessons = this.getAllUnlockedLessons(data);
    const allQuotes = this.getAllQuotes(data);
    const todayStr = new Date().toISOString().slice(0, 10);
    const checkedInToday = streak.lastCheckIn === todayStr;
    const isSunday = new Date().getDay() === 0;

    // Time-based greeting
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    let html = '<div class="fade-in">';

    // --- Top: Streak bar (minimal, no emojis) ---
    html += `
      <div class="dash-header">
        <div class="dash-greeting">${timeGreeting}</div>
        <div class="dash-streak-row">
          <div class="dash-streak-num">${streak.current}</div>
          <div class="dash-streak-meta">
            <div class="dash-streak-label">day streak</div>
            <div class="dash-streak-best">best: ${streak.longest}</div>
          </div>
          ${!checkedInToday ? '<div class="dash-streak-dot pulse"></div>' : '<div class="dash-streak-done">done</div>'}
        </div>
      </div>
    `;

    // --- Today's reading card ---
    if (allLessons.length > 0) {
      const dayIndex = this.dateToDayIndex(todayStr);
      const lesson = allLessons[dayIndex % allLessons.length];
      const book = data.books.find(b => b.lessons.some(l => l.id === lesson.id));

      html += `
        <div class="dash-section-label">Today's lesson</div>
        <div class="dash-lesson-card">
          <div class="dash-lesson-title">${lesson.title}</div>
          <div class="dash-lesson-body">${lesson.body}</div>
          <div class="dash-lesson-source">${book ? book.title : ''}</div>
        </div>
      `;

      if (!checkedInToday) {
        html += `<button class="btn btn-primary checkin-btn" id="checkin-btn">I've read this</button>`;
      } else {
        html += `
          <div class="dash-recall-row">
            <span class="dash-recall-label">Did you remember?</span>
            <button class="dash-recall-btn" data-recall="remembered" data-lesson-id="${lesson.id}">Yes</button>
            <button class="dash-recall-btn" data-recall="forgot" data-lesson-id="${lesson.id}">No</button>
          </div>
          <div class="followup-prompt">
            <a id="ask-followup" data-lesson-id="${lesson.id}">Ask a follow-up</a>
          </div>
        `;
      }
    } else if (allQuotes.length > 0) {
      const dayIndex = this.dateToDayIndex(todayStr);
      const quote = allQuotes[dayIndex % allQuotes.length];
      const book = data.books.find(b => b.quotes.some(q => q.id === quote.id));

      html += `
        <div class="dash-section-label">Today's quote</div>
        <div class="dash-quote-card">
          <div class="dash-quote-text">${quote.text}</div>
          <div class="dash-quote-source">${book ? book.author + ', ' + book.title : ''}</div>
        </div>
      `;

      if (!checkedInToday) {
        html += `<button class="btn btn-primary checkin-btn" id="checkin-btn">I've read this</button>`;
      }
    } else {
      html += `
        <div class="empty-state">
          <h3>Your reading journey starts here</h3>
          <p>Add your first book in the Library tab to begin building your reading memory.</p>
        </div>
      `;
    }

    // --- Quick stats row ---
    const totalQuotes = allQuotes.length;
    const booksWithLessons = data.books.filter(b => b.lessons.length > 0).length;
    html += `
      <div class="dash-stats">
        <div class="dash-stat">
          <div class="dash-stat-val">${data.books.length}</div>
          <div class="dash-stat-lbl">books</div>
        </div>
        <div class="dash-stat-divider"></div>
        <div class="dash-stat">
          <div class="dash-stat-val">${allLessons.length}</div>
          <div class="dash-stat-lbl">lessons</div>
        </div>
        <div class="dash-stat-divider"></div>
        <div class="dash-stat">
          <div class="dash-stat-val">${totalQuotes}</div>
          <div class="dash-stat-lbl">quotes</div>
        </div>
        <div class="dash-stat-divider"></div>
        <div class="dash-stat">
          <div class="dash-stat-val">${data.connections.length}</div>
          <div class="dash-stat-lbl">connections</div>
        </div>
      </div>
    `;

    // --- Recent books (horizontal scroll) ---
    if (data.books.length > 0) {
      const recentBooks = [...data.books].sort((a, b) => (b.addedAt || '').localeCompare(a.addedAt || '')).slice(0, 6);
      html += `
        <div class="dash-section-label">Your books</div>
        <div class="dash-books-scroll">
          ${recentBooks.map(b => `
            <div class="dash-book-thumb" data-book-id="${b.id}">
              ${b.coverUrl
                ? `<img src="${b.coverUrl}" alt="${b.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
                : ''}
              <div class="dash-book-thumb-ph" ${b.coverUrl ? 'style="display:none"' : ''}>${b.title.split(':')[0]}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // --- Weekly reflection (Sundays) ---
    if (isSunday) {
      const weekLessons = allLessons.slice(0, 3);
      if (weekLessons.length > 0) {
        const existingReflection = data.weeklyReflections.find(r => r.weekOf === todayStr);
        html += `
          <div class="dash-section-label">Weekly reflection</div>
          <div class="reflection-card">
            <div class="reflection-lessons">
              ${weekLessons.map(l => `<div>${l.title}</div>`).join('')}
            </div>
            <input type="text" id="reflection-input" placeholder="What stuck with you?" value="${existingReflection?.note || ''}">
            <button class="btn btn-sm" id="save-reflection">Save</button>
          </div>
        `;
      }
    }

    html += '</div>';
    main.innerHTML = html;

    // --- Bind events ---
    const checkinBtn = document.getElementById('checkin-btn');
    if (checkinBtn) {
      checkinBtn.addEventListener('click', () => this.handleCheckIn());
    }

    main.querySelectorAll('[data-recall]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lessonId = btn.dataset.lessonId;
        const recalled = btn.dataset.recall === 'remembered';
        this.handleRecall(lessonId, recalled);
        btn.closest('.dash-recall-row').innerHTML = recalled
          ? '<span class="dash-recall-result">Solid recall.</span>'
          : '<span class="dash-recall-result">Noted \u2014 this will come back sooner.</span>';
      });
    });

    const followup = document.getElementById('ask-followup');
    if (followup) {
      followup.addEventListener('click', () => {
        this.chatContext = { type: 'lesson', id: followup.dataset.lessonId };
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('[data-tab="ask"]').classList.add('active');
        this.renderTab('ask');
      });
    }

    const saveReflection = document.getElementById('save-reflection');
    if (saveReflection) {
      saveReflection.addEventListener('click', () => {
        const note = document.getElementById('reflection-input').value;
        if (!note.trim()) return;
        Storage.updateData(d => {
          const existing = d.weeklyReflections.find(r => r.weekOf === todayStr);
          if (existing) {
            existing.note = note;
          } else {
            d.weeklyReflections.push({
              id: Storage.uuid(),
              weekOf: todayStr,
              lessonIds: allLessons.slice(0, 3).map(l => l.id),
              note
            });
          }
        });
        this.showToast('Reflection saved');
      });
    }

    // Book thumbs navigation
    main.querySelectorAll('.dash-book-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => this.openBookHub(thumb.dataset.bookId));
    });
  },

  handleCheckIn() {
    const todayStr = new Date().toISOString().slice(0, 10);
    Storage.updateData(data => {
      if (data.streak.lastCheckIn === todayStr) return;

      const lastDate = data.streak.lastCheckIn;
      if (lastDate) {
        const last = new Date(lastDate);
        const today = new Date(todayStr);
        const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          data.streak.current += 1;
        } else {
          data.streak.current = 1;
        }
      } else {
        data.streak.current = 1;
      }

      data.streak.lastCheckIn = todayStr;
      if (data.streak.current > data.streak.longest) {
        data.streak.longest = data.streak.current;
      }
    });
    this.renderToday();
  },

  handleRecall(lessonId, remembered) {
    Storage.updateData(data => {
      for (const book of data.books) {
        const lesson = book.lessons.find(l => l.id === lessonId);
        if (lesson) {
          lesson.lastSeen = new Date().toISOString();
          lesson.recallScore = remembered
            ? Math.min(10, (lesson.recallScore || 0) + 1)
            : Math.max(0, (lesson.recallScore || 0) - 2);
          break;
        }
      }
    });
  },

  // ===== LIBRARY TAB =====
  renderLibrary(container) {
    const main = container || document.getElementById('main-content');
    main.innerHTML = '';

    const data = Storage.getData();

    if (data.books.length === 0) {
      main.innerHTML = `
        <div class="empty-state fade-in">
          <h3>Your library is empty</h3>
          <p>Start building your reading memory by adding your first book. Tap the + button below to get started.</p>
        </div>
      `;
    } else {
      let html = '<div class="book-grid fade-in">';
      for (const book of data.books) {
        html += `
          <div class="book-card" data-book-id="${book.id}">
            ${Covers.renderCover(book, 'card')}
            <div class="book-card-info">
              <div class="book-title">${book.title}</div>
              <div class="book-author">${book.author}</div>
            </div>
          </div>
        `;
      }
      html += '</div>';
      main.innerHTML = html;

      // Bind book card clicks
      main.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', () => this.openBookHub(card.dataset.bookId));
      });
    }

    // FAB
    const fab = document.createElement('button');
    fab.className = 'add-book-fab';
    fab.innerHTML = '+';
    fab.addEventListener('click', () => this.openAddBookModal());
    document.getElementById('app').appendChild(fab);
  },

  openBookHub(bookId) {
    const data = Storage.getData();
    const book = data.books.find(b => b.id === bookId);
    if (!book) return;

    const modal = document.getElementById('book-hub-modal');
    document.getElementById('hub-book-title').textContent = book.title;

    const content = document.getElementById('book-hub-content');
    let activeSection = 'lessons';

    const render = () => {
      const freshData = Storage.getData();
      const freshBook = freshData.books.find(b => b.id === bookId);

      let html = `
        <div class="hub-header">
          ${Covers.renderCover(freshBook, 'hub')}
          <h2>${freshBook.title}</h2>
          <div class="hub-author">${freshBook.author}</div>
        </div>

        <div class="hub-page-input">
          <label>Currently on page</label>
          <input type="number" id="hub-current-page" value="${freshBook.currentPage || ''}" placeholder="0">
        </div>

        <div class="hub-complete-toggle">
          <label>Mark book as completed</label>
          <label class="toggle-switch">
            <input type="checkbox" id="hub-completed" ${freshBook.completed ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>
      `;

      // Section toggle (only show if there are lessons)
      if (freshBook.lessons.length > 0 || freshBook.quotes.length > 0) {
        html += `
          <div class="hub-section-toggle">
            <button class="hub-section-btn ${activeSection === 'lessons' ? 'active' : ''}" data-section="lessons">Lessons (${freshBook.lessons.length})</button>
            <button class="hub-section-btn ${activeSection === 'quotes' ? 'active' : ''}" data-section="quotes">Quotes (${freshBook.quotes.length})</button>
          </div>
        `;
      }

      if (activeSection === 'lessons') {
        if (freshBook.lessons.length === 0) {
          html += `
            <div class="empty-state">
              <h3>No lessons yet</h3>
              <p>Use the "Add Book" flow to generate lessons with Claude, then paste them here.</p>
            </div>
          `;
        } else {
          for (const lesson of freshBook.lessons) {
            const isLocked = !freshBook.completed && lesson.page && freshBook.currentPage && lesson.page > freshBook.currentPage;
            html += `
              <div class="hub-lesson-item ${isLocked ? 'locked' : ''}">
                ${isLocked ? `<div class="lesson-lock">\u{1F512} page ${lesson.page}</div>` : ''}
                <h4>${lesson.title}</h4>
                <p>${lesson.body}</p>
              </div>
            `;
          }
        }
      } else {
        if (freshBook.quotes.length === 0) {
          html += `
            <div class="empty-state">
              <h3>No quotes yet</h3>
              <p>Add quotes using the Quick Add option.</p>
            </div>
          `;
        } else {
          for (const quote of freshBook.quotes) {
            html += `<div class="hub-quote-item">"${quote.text}"</div>`;
          }
        }
      }

      content.innerHTML = html;

      // Bind events
      content.querySelectorAll('.hub-section-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeSection = btn.dataset.section;
          render();
        });
      });

      const pageInput = document.getElementById('hub-current-page');
      if (pageInput) {
        pageInput.addEventListener('change', () => {
          Storage.updateData(d => {
            const b = d.books.find(b2 => b2.id === bookId);
            if (b) b.currentPage = parseInt(pageInput.value) || 0;
          });
          render();
        });
      }

      const completedToggle = document.getElementById('hub-completed');
      if (completedToggle) {
        completedToggle.addEventListener('change', () => {
          Storage.updateData(d => {
            const b = d.books.find(b2 => b2.id === bookId);
            if (b) b.completed = completedToggle.checked;
          });
          render();
        });
      }
    };

    render();
    modal.classList.remove('hidden');

    // Close handlers
    modal.querySelector('.modal-close').onclick = () => modal.classList.add('hidden');
    modal.querySelector('.modal-back').onclick = () => modal.classList.add('hidden');
    modal.querySelector('.modal-overlay').onclick = () => modal.classList.add('hidden');
  },

  // ===== PRACTICE TAB =====
  renderPractice(container) {
    const main = container || document.getElementById('main-content');
    main.innerHTML = '';

    const data = Storage.getData();
    const allLessons = this.getAllUnlockedLessons(data);
    let mode = 'flashcard';

    const render = () => {
      let html = `
        <div class="practice-mode-toggle">
          <button class="practice-mode-btn ${mode === 'flashcard' ? 'active' : ''}" data-mode="flashcard">Flashcard</button>
          <button class="practice-mode-btn ${mode === 'connection' ? 'active' : ''}" data-mode="connection">Connection</button>
        </div>
      `;

      if (mode === 'flashcard') {
        html += this.renderFlashcard(data, allLessons);
      } else {
        html += this.renderConnection(data, allLessons);
      }

      main.innerHTML = html;

      // Bind mode toggle
      main.querySelectorAll('.practice-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          mode = btn.dataset.mode;
          render();
        });
      });

      // Bind flashcard events
      if (mode === 'flashcard') {
        this.bindFlashcardEvents(main, data, allLessons, render);
      } else {
        this.bindConnectionEvents(main, data, allLessons, render);
      }
    };

    render();
  },

  renderFlashcard(data, allLessons) {
    if (allLessons.length === 0) {
      return `
        <div class="empty-state">
          <h3>No lessons to practice</h3>
          <p>Add lessons to your books to start practicing with flashcards.</p>
        </div>
      `;
    }

    if (!this.currentFlashcard) {
      this.currentFlashcard = this.pickWeightedLesson(allLessons);
      this.flashcardFlipped = false;
    }

    const lesson = this.currentFlashcard;
    const book = data.books.find(b => b.lessons.some(l => l.id === lesson.id));

    let html = `
      <div class="flashcard" id="flashcard">
        <div class="flashcard-inner ${this.flashcardFlipped ? 'flipped' : ''}">
          <div class="flashcard-title">${lesson.title}</div>
    `;

    if (this.flashcardFlipped) {
      html += `
        <div class="flashcard-body">${lesson.body}</div>
        <div class="flashcard-source">${book ? book.title : ''}</div>
      `;
    } else {
      html += `<div class="flashcard-hint">Tap to reveal</div>`;
    }

    html += `</div></div>`;

    if (this.flashcardFlipped) {
      html += `
        <div class="flashcard-actions">
          <button class="btn btn-sm" id="flash-remembered" style="background:var(--success);color:#fff;border:none">Remembered \u2713</button>
          <button class="btn btn-sm" id="flash-forgot" style="background:var(--danger);color:#fff;border:none">Forgot \u2717</button>
        </div>
      `;
    }

    return html;
  },

  bindFlashcardEvents(main, data, allLessons, render) {
    const card = document.getElementById('flashcard');
    if (card) {
      card.addEventListener('click', () => {
        if (!this.flashcardFlipped) {
          this.flashcardFlipped = true;
          render();
        }
      });
    }

    const remBtn = document.getElementById('flash-remembered');
    const forBtn = document.getElementById('flash-forgot');

    if (remBtn) {
      remBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleRecall(this.currentFlashcard.id, true);
        this.currentFlashcard = null;
        this.flashcardFlipped = false;
        render();
      });
    }

    if (forBtn) {
      forBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleRecall(this.currentFlashcard.id, false);
        this.currentFlashcard = null;
        this.flashcardFlipped = false;
        render();
      });
    }
  },

  renderConnection(data, allLessons) {
    if (allLessons.length < 2) {
      return `
        <div class="empty-state">
          <h3>Need more lessons</h3>
          <p>Add lessons to at least two different books to find connections between ideas.</p>
        </div>
      `;
    }

    // Get lessons from different books
    if (!this.connectionPair) {
      this.connectionPair = this.pickConnectionPair(data, allLessons);
    }

    const [lessonA, lessonB] = this.connectionPair;
    const bookA = data.books.find(b => b.lessons.some(l => l.id === lessonA.id));
    const bookB = data.books.find(b => b.lessons.some(l => l.id === lessonB.id));

    let html = `
      <div class="connection-pair">
        <div class="connection-lesson">
          <h4>${lessonA.title}</h4>
          <div class="conn-book">${bookA ? bookA.title : ''}</div>
          <p>${lessonA.body}</p>
        </div>
        <div class="connection-vs">How do these relate?</div>
        <div class="connection-lesson">
          <h4>${lessonB.title}</h4>
          <div class="conn-book">${bookB ? bookB.title : ''}</div>
          <p>${lessonB.body}</p>
        </div>
      </div>
      <div class="connection-input">
        <input type="text" id="connection-note" placeholder="Type your connection...">
      </div>
      <div class="connection-actions">
        <button class="btn btn-primary" id="save-connection">Save connection</button>
        <button class="btn btn-secondary" id="new-pair">New pair</button>
      </div>
      <div class="view-connections-link">
        <a id="view-connections">View saved connections (${data.connections.length})</a>
      </div>
    `;

    return html;
  },

  bindConnectionEvents(main, data, allLessons, render) {
    const saveBtn = document.getElementById('save-connection');
    const newBtn = document.getElementById('new-pair');
    const viewBtn = document.getElementById('view-connections');

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const note = document.getElementById('connection-note').value;
        if (!note.trim()) {
          this.showToast('Write a connection first');
          return;
        }
        const [lessonA, lessonB] = this.connectionPair;
        Storage.updateData(d => {
          d.connections.push({
            id: Storage.uuid(),
            lessonAId: lessonA.id,
            lessonBId: lessonB.id,
            note,
            createdAt: new Date().toISOString()
          });
        });
        this.showToast('Connection saved');
        this.connectionPair = null;
        render();
      });
    }

    if (newBtn) {
      newBtn.addEventListener('click', () => {
        this.connectionPair = null;
        render();
      });
    }

    if (viewBtn) {
      viewBtn.addEventListener('click', () => this.showConnectionsArchive());
    }
  },

  showConnectionsArchive() {
    const data = Storage.getData();
    const modal = document.getElementById('connections-modal');
    const list = document.getElementById('connections-list');

    if (data.connections.length === 0) {
      list.innerHTML = '<div class="empty-state"><h3>No connections yet</h3><p>Find connections between lessons from different books in Practice mode.</p></div>';
    } else {
      const allLessons = this.getAllUnlockedLessons(data);
      list.innerHTML = data.connections.map(conn => {
        const la = allLessons.find(l => l.id === conn.lessonAId);
        const lb = allLessons.find(l => l.id === conn.lessonBId);
        return `
          <div class="connection-archive-item">
            <div class="conn-lessons">${la?.title || '?'} \u2194 ${lb?.title || '?'}</div>
            <div class="conn-note">${conn.note}</div>
          </div>
        `;
      }).join('');
    }

    modal.classList.remove('hidden');
    modal.querySelector('.modal-close').onclick = () => modal.classList.add('hidden');
    modal.querySelector('.modal-overlay').onclick = () => modal.classList.add('hidden');
  },

  // ===== ASK TAB =====
  renderAsk(container) {
    const main = container || document.getElementById('main-content');
    main.innerHTML = '';

    const data = Storage.getData();
    const apiKey = data.settings.geminiApiKey;

    if (!apiKey) {
      main.innerHTML = `
        <div class="api-key-notice fade-in">
          <p>Add your Gemini API key in Settings to use chat.</p>
          <button class="btn btn-primary" id="go-to-settings" style="width:auto">Open Settings</button>
        </div>
      `;
      document.getElementById('go-to-settings').addEventListener('click', () => {
        document.getElementById('settings-modal').classList.remove('hidden');
      });
      return;
    }

    // Build context selector
    let contextOptions = '<option value="">None</option>';
    for (const book of data.books) {
      contextOptions += `<option value="book:${book.id}" ${this.chatContext?.type === 'book' && this.chatContext?.id === book.id ? 'selected' : ''}>${book.title}</option>`;
      for (const lesson of book.lessons) {
        contextOptions += `<option value="lesson:${lesson.id}" ${this.chatContext?.type === 'lesson' && this.chatContext?.id === lesson.id ? 'selected' : ''}>&nbsp;&nbsp;\u2022 ${lesson.title}</option>`;
      }
    }

    let html = `
      <div class="ask-context">
        <label for="chat-context">Context</label>
        <select id="chat-context">${contextOptions}</select>
      </div>
      <div class="chat-messages" id="chat-messages">
    `;

    if (this.chatMessages.length === 0) {
      html += `<div class="empty-state"><p>Ask anything about your books and lessons.</p></div>`;
    } else {
      for (const msg of this.chatMessages) {
        html += `<div class="chat-msg ${msg.role}">${msg.content}</div>`;
      }
    }

    html += `
      </div>
      <div class="chat-input-row">
        <input type="text" id="chat-input" placeholder="Ask about your reading...">
        <button class="btn btn-primary" id="chat-send" style="width:auto">Send</button>
      </div>
      <div class="clear-chat-btn">
        <a id="clear-chat">Clear chat</a>
      </div>
    `;

    main.innerHTML = html;

    // Context change
    document.getElementById('chat-context').addEventListener('change', (e) => {
      const val = e.target.value;
      if (!val) {
        this.chatContext = null;
      } else {
        const [type, id] = val.split(':');
        this.chatContext = { type, id };
      }
    });

    // Send message
    const sendMessage = async () => {
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;

      input.value = '';
      this.chatMessages.push({ role: 'user', content: text });
      this.renderChatMessages();

      // Show typing indicator
      const messagesDiv = document.getElementById('chat-messages');
      const typingEl = document.createElement('div');
      typingEl.className = 'chat-msg assistant typing';
      typingEl.textContent = 'Thinking...';
      messagesDiv.appendChild(typingEl);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      try {
        // Build system prompt from context
        let systemPrompt = '';
        const freshData = Storage.getData();

        if (this.chatContext) {
          if (this.chatContext.type === 'book') {
            const book = freshData.books.find(b => b.id === this.chatContext.id);
            if (book) systemPrompt = Gemini.buildSystemPrompt(book, book.lessons, book.quotes);
          } else if (this.chatContext.type === 'lesson') {
            for (const book of freshData.books) {
              const lesson = book.lessons.find(l => l.id === this.chatContext.id);
              if (lesson) {
                systemPrompt = Gemini.buildSystemPrompt(book, [lesson], book.quotes);
                break;
              }
            }
          }
        }

        const response = await Gemini.chat(this.chatMessages, freshData.settings.geminiApiKey, systemPrompt);
        typingEl.remove();
        this.chatMessages.push({ role: 'assistant', content: response });
        this.renderChatMessages();
      } catch (err) {
        typingEl.remove();
        if (err.message === 'RATE_LIMIT') {
          this.chatMessages.push({ role: 'assistant', content: 'Free tier limit reached for today \u2014 try tomorrow.' });
        } else {
          this.chatMessages.push({ role: 'assistant', content: `Error: ${err.message}` });
        }
        this.renderChatMessages();
      }
    };

    document.getElementById('chat-send').addEventListener('click', sendMessage);
    document.getElementById('chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    document.getElementById('clear-chat').addEventListener('click', () => {
      this.chatMessages = [];
      this.renderAsk();
    });
  },

  renderChatMessages() {
    const div = document.getElementById('chat-messages');
    if (!div) return;

    if (this.chatMessages.length === 0) {
      div.innerHTML = '<div class="empty-state"><p>Ask anything about your books and lessons.</p></div>';
    } else {
      div.innerHTML = this.chatMessages.map(msg =>
        `<div class="chat-msg ${msg.role}">${msg.content}</div>`
      ).join('');
    }
    div.scrollTop = div.scrollHeight;
  },

  // ===== SETTINGS =====
  bindSettings() {
    const modal = document.getElementById('settings-modal');
    const openBtn = document.getElementById('settings-btn');

    openBtn.addEventListener('click', () => {
      const data = Storage.getData();
      document.getElementById('gemini-key').value = data.settings.geminiApiKey || '';
      document.getElementById('reminder-time').value = data.settings.reminderTime || '20:00';

      // Theme buttons
      document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === data.settings.theme);
      });

      modal.classList.remove('hidden');
    });

    modal.querySelector('.modal-close').addEventListener('click', () => modal.classList.add('hidden'));
    modal.querySelector('.modal-overlay').addEventListener('click', () => modal.classList.add('hidden'));

    // Gemini key
    document.getElementById('gemini-key').addEventListener('change', (e) => {
      Storage.updateData(d => { d.settings.geminiApiKey = e.target.value; });
    });

    // Toggle key visibility
    document.getElementById('toggle-key-vis').addEventListener('click', () => {
      const input = document.getElementById('gemini-key');
      input.type = input.type === 'password' ? 'text' : 'password';
    });

    // Reminder time
    document.getElementById('reminder-time').addEventListener('change', (e) => {
      Storage.updateData(d => { d.settings.reminderTime = e.target.value; });
    });

    // Enable notifications
    document.getElementById('enable-notifications').addEventListener('click', async () => {
      if ('Notification' in window) {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          this.showToast('Notifications enabled');
          this.scheduleNotification();
        } else {
          this.showToast('Notifications blocked');
        }
      } else {
        this.showToast('Notifications not supported');
      }
    });

    // Theme
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        Storage.updateData(d => { d.settings.theme = btn.dataset.theme; });
        this.applyTheme();
      });
    });

    // Export
    document.getElementById('export-data').addEventListener('click', () => {
      Storage.exportJSON();
      this.showToast('Backup downloaded');
    });

    // Import
    document.getElementById('import-data').addEventListener('click', () => {
      document.getElementById('import-file').click();
    });

    document.getElementById('import-file').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        await Storage.importJSON(file);
        this.showToast('Data imported successfully');
        this.renderTab(this.currentTab);
        modal.classList.add('hidden');
      } catch (err) {
        this.showToast('Import failed: ' + err.message);
      }
    });

    // Sign out
    document.getElementById('sign-out').addEventListener('click', () => {
      if (window.Auth) {
        window.Auth.signOut();
        modal.classList.add('hidden');
      }
    });

    // Reset
    document.getElementById('reset-app').addEventListener('click', () => {
      if (confirm('Are you sure? This will delete all your data.')) {
        Storage.reset();
        location.reload();
      }
    });
  },

  applyTheme() {
    const data = Storage.getData();
    const theme = data.settings.theme || 'cream';
    if (theme === 'sepia-dark') {
      document.documentElement.setAttribute('data-theme', 'sepia-dark');
      document.querySelector('meta[name="theme-color"]').content = '#1E1A14';
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.querySelector('meta[name="theme-color"]').content = '#FAF6EE';
    }
  },

  scheduleNotification() {
    // For PWA on iOS, we use the service worker for push notifications
    // For now, schedule a simple check
    if ('serviceWorker' in navigator && 'Notification' in window) {
      const data = Storage.getData();
      const time = data.settings.reminderTime || '20:00';
      // Store in localStorage for service worker to pick up
      localStorage.setItem('margins_reminder_time', time);
    }
  },

  // ===== ADD BOOK =====
  bindAddBook() {
    const modal = document.getElementById('add-book-modal');

    // Tab switching
    modal.querySelectorAll('.add-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        modal.querySelectorAll('.add-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('add-lessons-form').classList.toggle('hidden', tab.dataset.addTab !== 'lessons');
        document.getElementById('add-quote-form').classList.toggle('hidden', tab.dataset.addTab !== 'quote');
      });
    });

    modal.querySelector('.modal-close').addEventListener('click', () => modal.classList.add('hidden'));
    modal.querySelector('.modal-overlay').addEventListener('click', () => modal.classList.add('hidden'));

    // Copy Claude prompt
    document.getElementById('copy-claude-prompt').addEventListener('click', () => {
      const title = document.getElementById('new-book-title').value || '[TITLE]';
      const author = document.getElementById('new-book-author').value || '[AUTHOR]';
      const prompt = `I want to add the book "${title}" by ${author} to my reading memory app. Generate a comprehensive set of key lessons from this book. Return ONLY valid JSON in this exact format, with no other text:

[
  {
    "title": "Short lesson title (max 8 words)",
    "body": "2-4 sentence explanation of the lesson, in plain language",
    "page": 45,
    "tags": ["optional", "tags"]
  }
]

Rules:
- Generate 15-30 lessons covering the book's main concepts, frameworks, key cases/examples, and memorable arguments
- Include the approximate page number where each lesson appears (best estimate is fine)
- Order lessons by page number, ascending
- Cover not just the headline ideas but also vivid examples, cases, and counter-intuitive points worth remembering
- Output ONLY the JSON array, no preamble, no markdown code fences`;

      navigator.clipboard.writeText(prompt).then(() => {
        this.showToast('Prompt copied to clipboard');
      }).catch(() => {
        this.showToast('Copy failed — try manually');
      });
    });

    // Save book with lessons
    document.getElementById('save-book-lessons').addEventListener('click', () => {
      const title = document.getElementById('new-book-title').value.trim();
      const author = document.getElementById('new-book-author').value.trim();
      const pages = parseInt(document.getElementById('new-book-pages').value) || null;
      const jsonStr = document.getElementById('lessons-json').value.trim();
      const errorEl = document.getElementById('json-error');

      errorEl.classList.add('hidden');

      if (!title) {
        errorEl.textContent = 'Please enter a title.';
        errorEl.classList.remove('hidden');
        return;
      }

      let lessons = [];
      if (jsonStr) {
        try {
          // Try to clean markdown code fences
          let cleaned = jsonStr;
          if (cleaned.startsWith('```')) {
            cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
          }
          lessons = JSON.parse(cleaned);
          if (!Array.isArray(lessons)) throw new Error('Expected an array');
        } catch (err) {
          errorEl.textContent = `Invalid JSON: ${err.message}`;
          errorEl.classList.remove('hidden');
          return;
        }
      }

      const bookId = Storage.uuid();
      Storage.updateData(data => {
        data.books.push({
          id: bookId,
          title,
          author: author || 'Unknown',
          coverUrl: null,
          currentPage: 0,
          totalPages: pages,
          completed: false,
          lessons: lessons.map(l => ({
            id: Storage.uuid(),
            title: l.title || '',
            body: l.body || '',
            page: l.page || null,
            tags: l.tags || [],
            recallScore: 0,
            lastSeen: null
          })),
          quotes: [],
          addedAt: new Date().toISOString()
        });
      });

      // Fetch cover in background
      Covers.fetchCover(title, author).then(url => {
        if (url) {
          Storage.updateData(d => {
            const b = d.books.find(b2 => b2.id === bookId);
            if (b) b.coverUrl = url;
          });
        }
      });

      // Reset form
      document.getElementById('new-book-title').value = '';
      document.getElementById('new-book-author').value = '';
      document.getElementById('new-book-pages').value = '';
      document.getElementById('lessons-json').value = '';
      modal.classList.add('hidden');
      this.showToast('Book added');
      if (this.currentTab === 'library') this.renderLibrary();
    });

    // Save quick quote
    document.getElementById('save-quick-quote').addEventListener('click', () => {
      const quote = document.getElementById('quick-quote').value.trim();
      const author = document.getElementById('quick-author').value.trim();
      const bookTitle = document.getElementById('quick-book').value.trim();

      if (!quote) {
        this.showToast('Please enter a quote');
        return;
      }

      Storage.updateData(data => {
        let book = data.books.find(b => b.title.toLowerCase() === bookTitle.toLowerCase());
        if (!book) {
          book = {
            id: Storage.uuid(),
            title: bookTitle || 'Loose Quotes',
            author: author || 'Unknown',
            coverUrl: null,
            currentPage: 0,
            totalPages: null,
            completed: false,
            lessons: [],
            quotes: [],
            addedAt: new Date().toISOString()
          };
          data.books.push(book);
        }
        book.quotes.push({
          id: Storage.uuid(),
          text: quote,
          page: null
        });
      });

      document.getElementById('quick-quote').value = '';
      document.getElementById('quick-author').value = '';
      document.getElementById('quick-book').value = '';
      modal.classList.add('hidden');
      this.showToast('Quote saved');
      if (this.currentTab === 'library') this.renderLibrary();
    });
  },

  openAddBookModal() {
    document.getElementById('add-book-modal').classList.remove('hidden');
  },

  // ===== HELPERS =====
  getAllUnlockedLessons(data) {
    const lessons = [];
    for (const book of data.books) {
      for (const lesson of book.lessons) {
        if (book.completed || !lesson.page || !book.currentPage || lesson.page <= book.currentPage) {
          lessons.push(lesson);
        }
      }
    }
    return lessons;
  },

  getAllQuotes(data) {
    const quotes = [];
    for (const book of data.books) {
      for (const quote of book.quotes) {
        quotes.push(quote);
      }
    }
    return quotes;
  },

  dateToDayIndex(dateStr) {
    // Simple hash from date string to get a deterministic index
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  },

  pickWeightedLesson(lessons) {
    // Lessons with lower recallScore should appear more often
    const weighted = lessons.map(l => ({
      lesson: l,
      weight: Math.max(1, 11 - (l.recallScore || 0))
    }));
    const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
    let random = Math.random() * totalWeight;
    for (const w of weighted) {
      random -= w.weight;
      if (random <= 0) return w.lesson;
    }
    return lessons[0];
  },

  pickConnectionPair(data, allLessons) {
    // Try to pick from different books
    const bookLessons = {};
    for (const book of data.books) {
      const unlocked = book.lessons.filter(l =>
        book.completed || !l.page || !book.currentPage || l.page <= book.currentPage
      );
      if (unlocked.length > 0) {
        bookLessons[book.id] = unlocked;
      }
    }

    const bookIds = Object.keys(bookLessons);
    if (bookIds.length >= 2) {
      // Pick two different books
      const shuffled = bookIds.sort(() => Math.random() - 0.5);
      const a = bookLessons[shuffled[0]][Math.floor(Math.random() * bookLessons[shuffled[0]].length)];
      const b = bookLessons[shuffled[1]][Math.floor(Math.random() * bookLessons[shuffled[1]].length)];
      return [a, b];
    }

    // Fallback: pick any two different lessons
    const shuffled = [...allLessons].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1] || shuffled[0]];
  },

  // ===== TOAST =====
  addToast() {
    if (!document.getElementById('toast')) {
      const toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
  },

  showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  },

  // ===== PULL TO REFRESH =====
  bindPullToRefresh() {
    const main = document.getElementById('main-content');
    let startY = 0;
    let pulling = false;

    main.addEventListener('touchstart', (e) => {
      if (main.scrollTop === 0) {
        startY = e.touches[0].clientY;
        pulling = true;
      }
    }, { passive: true });

    main.addEventListener('touchmove', (e) => {
      if (!pulling) return;
      const diff = e.touches[0].clientY - startY;
      if (diff > 80 && main.scrollTop === 0) {
        pulling = false;
        this.handleRefresh();
      }
    }, { passive: true });

    main.addEventListener('touchend', () => { pulling = false; }, { passive: true });
  },

  handleRefresh() {
    // Check for service worker updates
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg) reg.update();
      });
    }
    // Re-render current tab
    this.showToast('Refreshed');
    this.renderTab(this.currentTab);
  },

  // ===== SERVICE WORKER =====
  registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(reg => {
        // Listen for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated') {
              this.showToast('App updated — pull down to refresh');
            }
          });
        });
      });
    }
  }
};

// App.init() is called by auth.js after successful login
// Make App available globally
window.App = App;
