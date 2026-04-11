// app.js — Main logic, routing, state for Margins

const App = {
  currentTab: 'today',
  chatMessages: [],
  chatContext: null, // { type: 'book'|'lesson', id: string }
  flashcardFlipped: false,
  currentFlashcard: null,

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
    this.bindChatFab();
    this.registerSW();
    this.renderTab('today');
    this.addToast();

    // One-time cover refresh to ensure English editions
    const coverVer = localStorage.getItem('covers_version');
    if (coverVer !== '4') {
      localStorage.setItem('covers_version', '4');
      Covers.refreshAllCovers();
    } else {
      Covers.fetchMissingCovers();
    }

    // Backfill lesson details — runs until all lessons have detail
    const needsDetails = Storage.getData().books.some(b => b.lessons.some(l => !l.detail));
    if (needsDetails) {
      this.generateMissingDetails();
    }
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

    // Back button / swipe-back support
    history.replaceState({ base: true }, '');
    window.addEventListener('popstate', () => {
      this.closeTopLayer();
    });
  },

  pushNav() {
    history.pushState({ layer: true }, '');
  },

  closeTopLayer() {
    // Close the frontmost open layer
    const settingsPage = document.getElementById('settings-page');
    if (settingsPage && settingsPage.classList.contains('open')) {
      settingsPage.classList.remove('open');
      return;
    }
    // Journey modal
    const journeyModal = document.getElementById('journey-modal');
    if (journeyModal && !journeyModal.classList.contains('hidden')) {
      journeyModal.classList.add('hidden');
      document.body.style.overflow = '';
      return;
    }
    const modals = ['chat-modal', 'book-hub-modal', 'add-book-modal'];
    for (const id of modals) {
      const el = document.getElementById(id);
      if (el && !el.classList.contains('hidden')) {
        el.classList.add('hidden');
        if (id === 'chat-modal') {
          document.body.style.overflow = '';
          const sheet = el.querySelector('.modal-content');
          if (sheet) sheet.style.transform = '';
        }
        return;
      }
    }
  },

  renderTab(tab) {
    this.currentTab = tab;
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    main.scrollTop = 0;

    switch (tab) {
      case 'today': this.renderToday(main); break;
      case 'library': this.renderLibrary(main); break;
      case 'practice': this.renderPractice(main); break;
    }
  },

  // ===== HOME TAB =====
  renderToday(container) {
    const main = container || document.getElementById('main-content');
    main.innerHTML = '';

    const data = Storage.getData();
    const streak = data.streak;
    const allLessons = this.getAllUnlockedLessons(data);
    const allQuotes = this.getAllQuotes(data);
    const todayStr = new Date().toISOString().slice(0, 10);

    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    // Empty state
    if (allLessons.length === 0 && allQuotes.length === 0) {
      main.innerHTML = `
        <div class="home-empty">
          <div class="home-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <h2 class="home-empty-title">A blank page,<br>full of possibility</h2>
          <p class="home-empty-body">Head to the Library tab and add your first book. We'll surface one idea each day to help it stick.</p>
        </div>
      `;
      return;
    }

    // Build today's lesson pool
    const dayIndex = this.dateToDayIndex(todayStr + 'H' + Math.floor(hour / 3));
    const sortedBooks = [...data.books]
      .filter(b => b.lessons && b.lessons.length > 0)
      .sort((a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0));
    const n = Math.max(sortedBooks.length, 1);
    const weightedPool = [];
    for (const lesson of allLessons) {
      const rank = sortedBooks.findIndex(b => b.lessons.some(l => l.id === lesson.id));
      const tier = rank === -1 ? 2 : Math.min(2, Math.floor((rank / n) * 3));
      const weight = [3, 2, 1][tier];
      for (let w = 0; w < weight; w++) weightedPool.push(lesson);
    }
    const shuffled = this.seededShuffle(weightedPool, dayIndex);
    const lessonSlice = [];
    const seenIds = new Set();
    let lastBookId = null;
    for (let i = 0; i < Math.min(8, allLessons.length) && shuffled.length > 0; i++) {
      let idx = shuffled.findIndex(l => {
        if (seenIds.has(l.id)) return false;
        const b = data.books.find(bk => bk.lessons?.some(lk => lk.id === l.id));
        return !b || b.id !== lastBookId;
      });
      if (idx === -1) idx = shuffled.findIndex(l => !seenIds.has(l.id));
      if (idx === -1) break;
      const picked = shuffled.splice(idx, 1)[0];
      lessonSlice.push(picked);
      seenIds.add(picked.id);
      const pb = data.books.find(bk => bk.lessons?.some(lk => lk.id === picked.id));
      lastBookId = pb?.id || null;
    }

    const hero = lessonSlice[0];
    const heroBook = hero ? data.books.find(b => b.lessons.some(l => l.id === hero.id)) : null;
    const rest = lessonSlice.slice(1);
    const sentences = hero ? (hero.body.match(/[^.!?]+[.!?]+/g) || [hero.body]) : [];
    const hookSentence = sentences[0]?.trim() || '';

    // Preload covers
    data.books.forEach(b => { if (b.coverUrl) { const img = new Image(); img.src = b.coverUrl; } });

    let html = '';

    // ===== HERO SECTION =====
    if (hero) {
      html += `
        <section class="home-hero">
          <div class="home-hero-label">${timeGreeting}</div>
          <h1 class="home-hero-title">${hero.title}</h1>
          <p class="home-hero-excerpt">${hookSentence}</p>
          <button class="home-hero-cta" id="hero-journey" data-lesson-id="${hero.id}">
            Begin journey
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <div class="home-hero-source">
            ${heroBook?.coverUrl ? `<img class="home-hero-cover" src="${heroBook.coverUrl}" alt="">` : ''}
            <div class="home-hero-source-text">
              <span class="home-hero-book">${heroBook?.title || ''}</span>
              <span class="home-hero-author">${heroBook?.author || ''}</span>
            </div>
          </div>
          <div class="home-hero-actions">
            <button class="home-action-btn ${this.isFavorite(hero.id) ? 'is-fav' : ''}" id="hero-fav" data-lesson-id="${hero.id}">
              ${this.isFavorite(hero.id) ? '♥' : '♡'}
            </button>
            <button class="home-action-btn" id="hero-chat" data-lesson-id="${hero.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>
        </section>
      `;
    }

    // ===== MORE TODAY =====
    if (rest.length > 0) {
      html += `<div class="home-section-label">More today</div>`;
      html += `<div class="home-cards-scroll">`;
      for (const lesson of rest) {
        const book = data.books.find(b => b.lessons.some(l => l.id === lesson.id));
        const firstSentence = (lesson.body.match(/[^.!?]+[.!?]+/) || [lesson.body])[0]?.trim() || '';
        const truncated = firstSentence.length > 100 ? firstSentence.slice(0, 100).trim() + '...' : firstSentence;
        html += `
          <div class="home-mini-card" data-lesson-id="${lesson.id}">
            <div class="home-mini-title">${lesson.title}</div>
            <div class="home-mini-body">${truncated}</div>
            <div class="home-mini-source">${book?.title || ''}</div>
          </div>
        `;
      }
      html += `</div>`;
    }

    // ===== STREAK =====
    if (streak.current > 0 || streak.longest > 0) {
      html += `
        <div class="home-streak-card">
          <div class="home-streak-num">${streak.current}</div>
          <div class="home-streak-detail">
            <span class="home-streak-label">day streak</span>
            <span class="home-streak-best">Best: ${streak.longest}</span>
          </div>
        </div>
      `;
    }

    // ===== SAVED =====
    const favIds = data.favorites || [];
    if (favIds.length > 0) {
      const favLessons = [];
      for (const fid of favIds) {
        for (const book of data.books) {
          const l = book.lessons.find(x => x.id === fid);
          if (l) { favLessons.push({ lesson: l, book }); break; }
        }
      }
      if (favLessons.length > 0) {
        html += `<div class="home-section-label">Saved</div>`;
        html += `<div class="home-saved-list">`;
        for (const { lesson, book } of favLessons.slice(0, 4)) {
          html += `
            <div class="home-saved-item" data-lesson-id="${lesson.id}">
              <div class="home-saved-title">${lesson.title}</div>
              <div class="home-saved-source">${book.title}</div>
            </div>
          `;
        }
        html += `</div>`;
      }
    }

    main.innerHTML = html;

    // ===== EVENT BINDINGS =====
    // Hero journey CTA
    const heroBtn = document.getElementById('hero-journey');
    if (heroBtn) {
      heroBtn.addEventListener('click', () => this.openLessonJourney(heroBtn.dataset.lessonId));
    }

    // Hero favorite
    const heroFav = document.getElementById('hero-fav');
    if (heroFav) {
      heroFav.addEventListener('click', () => {
        this.toggleFavorite(heroFav.dataset.lessonId);
        const isFav = this.isFavorite(heroFav.dataset.lessonId);
        heroFav.innerHTML = isFav ? '♥' : '♡';
        heroFav.classList.toggle('is-fav', isFav);
      });
    }

    // Hero chat
    const heroChat = document.getElementById('hero-chat');
    if (heroChat) {
      heroChat.addEventListener('click', () => this.openChatWithContext('lesson', heroChat.dataset.lessonId));
    }

    // Mini cards → journey
    main.querySelectorAll('.home-mini-card').forEach(card => {
      card.addEventListener('click', () => this.openLessonJourney(card.dataset.lessonId));
    });

    // Saved items → journey
    main.querySelectorAll('.home-saved-item').forEach(item => {
      item.addEventListener('click', () => this.openLessonJourney(item.dataset.lessonId));
    });
  },

  formatLessonBody(body) {
    // Split into sentences
    const sentences = body.match(/[^.!?]+[.!?]+/g) || [body];
    if (sentences.length <= 1) return body;

    // Pair: concept (normal text) → example (indented, muted)
    let html = '';
    for (let i = 0; i < sentences.length; i++) {
      const s = sentences[i].trim();
      if (!s) continue;
      if (i % 2 === 0) {
        html += `<div class="lesson-concept">${s}</div>`;
      } else {
        html += `<div class="lesson-example">${s}</div>`;
      }
    }
    return html;
  },

  handleLearnMore(lessonId, bookId) {
    const section = document.getElementById(`learn-more-${lessonId}`);
    if (!section) return;
    const carousel = document.getElementById('lesson-carousel');

    // Toggle if already visible
    if (!section.classList.contains('hidden')) {
      section.classList.add('hidden');
      section.innerHTML = '';
      requestAnimationFrame(() => { if (this._updateDotsPosition) this._updateDotsPosition(); });
      return;
    }

    section.classList.remove('hidden');

    const data = Storage.getData();
    const book = data.books.find(b => b.id === bookId);
    if (!book) return;
    const lesson = book.lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    if (lesson.detail) {
      section.innerHTML = `<div class="learn-more-content">${this.parseMarkdown(lesson.detail)}</div>`;
    } else {
      section.innerHTML = `<div class="learn-more-content"><p style="color:var(--text-muted)">Details not yet available. Re-import this book with the updated prompt to generate details.</p></div>`;
    }

    // Re-position dots now that the card is taller
    requestAnimationFrame(() => { if (this._updateDotsPosition) this._updateDotsPosition(); });
  },

  // ===== LESSON JOURNEY =====
  openLessonJourney(lessonId) {
    const data = Storage.getData();
    let lesson, book;
    for (const b of data.books) {
      const l = b.lessons.find(x => x.id === lessonId);
      if (l) { lesson = l; book = b; break; }
    }
    if (!lesson) return;

    const modal = document.getElementById('journey-modal');
    const chrome = document.getElementById('journey-chrome');
    const viewport = document.getElementById('journey-viewport');

    // Parse body
    const sentences = lesson.body.match(/[^.!?]+[.!?]+/g) || [lesson.body];
    const hookSentence = sentences[0]?.trim() || lesson.body;

    // Format body for concept scene
    const bodyHtml = sentences.map((s, i) => {
      const txt = s.trim();
      if (!txt) return '';
      return i % 2 === 0
        ? `<div class="journey-concept">${txt}</div>`
        : `<div class="journey-example">${txt}</div>`;
    }).join('');

    // Pull quote: pick the punchiest sentence (longest under 120 chars)
    const pullQuote = sentences
      .map(s => s.trim())
      .filter(s => s.length > 30 && s.length < 120)
      .sort((a, b) => b.length - a.length)[0] || hookSentence;

    // Build scene data
    const scenes = [];

    // Scene 1: Hook
    scenes.push({
      type: 'hook',
      html: `
        <div class="journey-watermark">01</div>
        <div class="journey-label">Lesson</div>
        <div class="journey-accent-line"></div>
        <h1 class="journey-title">${lesson.title}</h1>
        <div class="journey-body">${hookSentence}</div>
      `
    });

    // Scene 2: Concept — full body with pull quote
    scenes.push({
      type: 'concept',
      html: `
        <div class="journey-watermark">02</div>
        <div class="journey-label">The idea</div>
        <div class="journey-accent-line"></div>
        <div class="journey-pullquote">${pullQuote}</div>
        ${bodyHtml}
      `
    });

    // Scene 3: Detail (if available)
    if (lesson.detail) {
      scenes.push({
        type: 'detail',
        html: `
          <div class="journey-watermark">03</div>
          <div class="journey-label">Going deeper</div>
          <div class="journey-accent-line"></div>
          <div class="journey-detail">${this.parseMarkdown(lesson.detail)}</div>
        `
      });
    }

    // Scene 4: Source
    const coverHtml = book.coverUrl
      ? `<img class="journey-s-cover" src="${book.coverUrl}" alt="">`
      : `<div class="journey-s-cover-ph">${book.title}</div>`;
    const sceneNum = scenes.length + 1;

    scenes.push({
      type: 'source',
      html: `
        <div class="journey-watermark">0${sceneNum}</div>
        <div class="journey-source-center">
          ${coverHtml}
          <div class="journey-s-title">${book.title}</div>
          <div class="journey-s-author">${book.author}</div>
          <div class="journey-s-actions">
            <button class="journey-s-btn primary" id="j-explore" data-book-id="${book.id}">Explore this book</button>
            <button class="journey-s-btn secondary" id="j-fav" data-lesson-id="${lesson.id}">${this.isFavorite(lesson.id) ? '♥ Saved' : '♡ Save lesson'}</button>
            <button class="journey-s-btn secondary" id="j-share">Share as image</button>
          </div>
        </div>
      `
    });

    const total = scenes.length;
    let current = 0;

    // Build segmented progress bar
    chrome.innerHTML = `
      <button class="journey-close" id="journey-close">&times;</button>
      <div class="journey-segments">
        ${scenes.map((_, i) => `<div class="journey-seg ${i === 0 ? 'active' : ''}" data-idx="${i}"><div class="journey-seg-fill"></div></div>`).join('')}
      </div>
    `;

    // Render current scene
    const renderScene = (idx) => {
      const scene = scenes[idx];
      viewport.innerHTML = `
        <div class="journey-stage" data-scene="${scene.type}">
          ${scene.html}
          <div class="journey-tap-left"></div>
          <div class="journey-tap-right"></div>
        </div>
      `;

      // Update segments
      chrome.querySelectorAll('.journey-seg').forEach((seg, i) => {
        seg.classList.remove('active', 'done');
        if (i < idx) seg.classList.add('done');
        if (i === idx) seg.classList.add('active');
      });

      // Tap zones
      viewport.querySelector('.journey-tap-left')?.addEventListener('click', () => goTo(idx - 1));
      viewport.querySelector('.journey-tap-right')?.addEventListener('click', () => {
        if (idx < total - 1) goTo(idx + 1);
      });

      // Source scene buttons
      if (scene.type === 'source') {
        document.getElementById('j-explore')?.addEventListener('click', () => {
          closeJourney();
          setTimeout(() => this.openBookHub(document.getElementById('j-explore').dataset.bookId), 150);
        });
        document.getElementById('j-fav')?.addEventListener('click', () => {
          const btn = document.getElementById('j-fav');
          this.toggleFavorite(btn.dataset.lessonId);
          const isFav = this.isFavorite(btn.dataset.lessonId);
          btn.textContent = isFav ? '♥ Saved' : '♡ Save lesson';
        });
        document.getElementById('j-share')?.addEventListener('click', () => {
          this.shareAsImage(lesson, book);
        });
      }
    };

    const goTo = (idx) => {
      if (idx < 0 || idx >= total) return;
      current = idx;
      renderScene(current);
    };

    // Swipe gesture support
    let touchStartX = 0;
    let touchStartY = 0;
    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0 && current < total - 1) goTo(current + 1);
        if (dx > 0 && current > 0) goTo(current - 1);
      }
    }, { passive: true });

    // Keyboard support
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'Escape') closeJourney();
    };
    document.addEventListener('keydown', onKey);

    // Open
    renderScene(0);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    this.pushNav();

    // Close
    const closeJourney = () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      if (history.state && history.state.layer) history.back();
    };

    chrome.querySelector('#journey-close').addEventListener('click', closeJourney);
  },

  async shareAsImage(lesson, book) {
    const w = 720, h = 960, pad = 60;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Background
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? '#0D0D0D' : '#F5F4F0';
    ctx.fillRect(0, 0, w, h);

    // Accent line at top
    ctx.fillStyle = isDark ? '#7C73FF' : '#4F46E5';
    ctx.fillRect(pad, pad, 40, 3);

    // Title
    ctx.fillStyle = isDark ? '#E8E8E8' : '#1A1A1A';
    ctx.font = 'italic 32px Georgia, serif';
    const titleLines = this.wrapText(ctx, lesson.title, w - pad * 2);
    let y = pad + 40;
    for (const line of titleLines) {
      ctx.fillText(line, pad, y);
      y += 42;
    }

    // Body
    y += 16;
    ctx.fillStyle = isDark ? '#9A9AA8' : '#6B6B78';
    ctx.font = '16px Inter, -apple-system, sans-serif';
    const bodyClean = lesson.body.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const bodyText = bodyClean.length > 280 ? bodyClean.slice(0, 280).trim() + '...' : bodyClean;
    const bodyLines = this.wrapText(ctx, bodyText, w - pad * 2);
    for (const line of bodyLines) {
      ctx.fillText(line, pad, y);
      y += 26;
    }

    // Source at bottom
    ctx.fillStyle = isDark ? '#555560' : '#A0A0AB';
    ctx.font = '14px Inter, -apple-system, sans-serif';
    ctx.fillText(`${book.title} · ${book.author}`, pad, h - pad - 28);

    // App branding
    ctx.fillStyle = isDark ? '#555560' : '#A0A0AB';
    ctx.font = 'italic 13px Georgia, serif';
    ctx.fillText('margins', pad, h - pad);

    // Convert to blob and share or download
    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'lesson.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: lesson.title });
        } catch (e) {
          if (e.name !== 'AbortError') this.downloadBlob(blob, 'lesson.png');
        }
      } else {
        this.downloadBlob(blob, 'lesson.png');
      }
    }, 'image/png');
  },

  wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  },

  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Image saved');
  },

  async generateMissingDetails() {
    const data = Storage.getData();
    const hasKey = (data.settings.geminiApiKey || data.settings.groqApiKey);
    if (!hasKey) return;

    // Collect all lessons missing detail
    const missing = [];
    for (const book of data.books) {
      for (const lesson of book.lessons) {
        if (!lesson.detail) {
          missing.push({ book, lesson });
        }
      }
    }

    if (missing.length === 0) return;

    this.showToast(`Generating details for ${missing.length} lessons...`);

    for (const { book, lesson } of missing) {
      try {
        const systemPrompt = `You are an expert book analyst. Give a detailed breakdown of a concept from "${book.title}" by ${book.author}.

The concept: "${lesson.title}" — ${lesson.body}

Respond with a 2-3 paragraph breakdown in markdown:
- Paragraph 1: The core concept explained more precisely
- Paragraph 2: How ${book.author} develops this argument — frameworks, metaphors, or narrative
- Paragraph 3: Key evidence as bullet points — specific examples, case studies, or data

Use **bold** for key terms. Be concise and sharp. No padding or pleasantries.`;

        const response = await LLM.chat(
          [{ role: 'user', content: `Break down: "${lesson.title}"` }],
          data.settings,
          systemPrompt
        );

        // Save detail to storage immediately
        Storage.updateData(d => {
          for (const b of d.books) {
            const l = b.lessons.find(x => x.id === lesson.id);
            if (l) { l.detail = response; break; }
          }
        });
      } catch (err) {
        console.warn(`Failed to generate detail for "${lesson.title}":`, err.message);
        // Continue with next lesson
      }

      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 1500));
    }

    this.showToast('Lesson details generated');
  },

  seededShuffle(arr, seed) {
    const a = [...arr];
    const rng = (i) => {
      let t = ((seed * 1664525 + i * 1013904223) | 0) + 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng(i) * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
    let searchQuery = '';
    let selectedTag = null;

    const render = () => {
      const allLessons = this.getAllUnlockedLessons(data);

      // Build tag map
      const tagMap = {};
      for (const lesson of allLessons) {
        for (const tag of (lesson.tags || [])) {
          if (!tagMap[tag]) tagMap[tag] = [];
          tagMap[tag].push(lesson);
        }
      }
      const tags = Object.keys(tagMap).sort();

      // Separate currently-reading from completed
      const reading = data.books.filter(b => !b.completed && b.title !== 'Loose Quotes');
      const completed = data.books.filter(b => b.completed);
      const q = searchQuery.toLowerCase().trim();

      let html = '';

      // Header
      html += `
        <div class="lib-header">
          <h2 class="lib-title">Library</h2>
          <button class="lib-add-btn" id="add-book-inline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      `;

      // Search
      html += `
        <div class="lib-search">
          <svg class="lib-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="search" id="lib-search-input" placeholder="Search..." value="${searchQuery}">
        </div>
      `;

      // Search results
      if (q) {
        const matchBooks = data.books.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
        const matchLessons = allLessons.filter(l => l.title.toLowerCase().includes(q) || l.body.toLowerCase().includes(q));

        if (matchBooks.length === 0 && matchLessons.length === 0) {
          html += `<div class="lib-empty-search">No results for "${searchQuery}"</div>`;
        } else {
          if (matchBooks.length > 0) {
            html += `<div class="lib-shelf">`;
            for (const book of matchBooks) {
              html += this.renderLibBookCard(book);
            }
            html += `</div>`;
          }
          if (matchLessons.length > 0) {
            html += `<div class="lib-section-label">Lessons</div>`;
            for (const lesson of matchLessons.slice(0, 8)) {
              const book = data.books.find(b => b.lessons.some(l => l.id === lesson.id));
              html += `
                <div class="lib-lesson-row" data-lesson-id="${lesson.id}">
                  <div class="lib-lesson-title">${lesson.title}</div>
                  <div class="lib-lesson-source">${book?.title || ''}</div>
                </div>
              `;
            }
          }
        }
      } else {
        // Currently reading shelf
        if (reading.length > 0) {
          html += `<div class="lib-section-label">Currently reading</div>`;
          html += `<div class="lib-reading-scroll">`;
          for (const book of reading) {
            const progress = book.totalPages && book.currentPage
              ? Math.min(100, Math.round((book.currentPage / book.totalPages) * 100))
              : null;
            html += `
              <div class="lib-reading-card" data-book-id="${book.id}">
                <div class="lib-reading-cover-wrap">
                  ${book.coverUrl
                    ? `<img class="lib-reading-cover" src="${book.coverUrl}" alt="">`
                    : `<div class="lib-reading-cover-ph">${book.title}</div>`
                  }
                  ${progress !== null ? `
                    <div class="lib-reading-progress">
                      <div class="lib-reading-progress-fill" style="width:${progress}%"></div>
                    </div>
                  ` : ''}
                </div>
                <div class="lib-reading-title">${book.title}</div>
                <div class="lib-reading-author">${book.author}</div>
                ${progress !== null ? `<div class="lib-reading-pct">${progress}%</div>` : ''}
              </div>
            `;
          }
          html += `</div>`;
        }

        // Topics pills (horizontal scroll)
        if (tags.length > 0) {
          html += `<div class="lib-section-label">Topics</div>`;
          html += `<div class="lib-topics-scroll">`;
          for (const tag of tags) {
            html += `<button class="lib-topic-pill ${tag === selectedTag ? 'active' : ''}" data-tag="${tag}">${this.capitalizeTag(tag)}</button>`;
          }
          html += `</div>`;

          // Selected tag lessons
          if (selectedTag && tagMap[selectedTag]) {
            for (const lesson of tagMap[selectedTag].slice(0, 6)) {
              const book = data.books.find(b => b.lessons.some(l => l.id === lesson.id));
              html += `
                <div class="lib-lesson-row" data-lesson-id="${lesson.id}">
                  <div class="lib-lesson-title">${lesson.title}</div>
                  <div class="lib-lesson-source">${book?.title || ''}</div>
                </div>
              `;
            }
          }
        }

        // All books grid
        html += `<div class="lib-section-label">All books</div>`;
        if (data.books.length === 0) {
          html += `<div class="lib-empty-search">Your shelf is empty. Tap + to add your first book.</div>`;
        } else {
          html += `<div class="lib-shelf">`;
          for (const book of data.books) {
            if (book.title === 'Loose Quotes' && !book.quotes.length) continue;
            html += this.renderLibBookCard(book);
          }
          html += `</div>`;
        }
      }

      main.innerHTML = html;

      // Bindings
      const searchInput = document.getElementById('lib-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          searchQuery = e.target.value;
          render();
          const el = document.getElementById('lib-search-input');
          if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
        });
      }

      document.getElementById('add-book-inline')?.addEventListener('click', () => this.openAddBookModal());

      main.querySelectorAll('.lib-reading-card, .lib-book-card').forEach(card => {
        card.addEventListener('click', () => this.openBookHub(card.dataset.bookId));
      });

      main.querySelectorAll('.lib-topic-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          selectedTag = pill.dataset.tag === selectedTag ? null : pill.dataset.tag;
          render();
        });
      });

      main.querySelectorAll('.lib-lesson-row').forEach(row => {
        row.addEventListener('click', () => this.openLessonJourney(row.dataset.lessonId));
      });
    };

    render();
  },

  renderLibBookCard(book) {
    return `
      <div class="lib-book-card" data-book-id="${book.id}">
        ${book.coverUrl
          ? `<img class="lib-book-cover" src="${book.coverUrl}" alt="">`
          : `<div class="lib-book-cover-ph"><span>${book.title}</span></div>`
        }
        <div class="lib-book-title">${book.title}</div>
        <div class="lib-book-author">${book.author}</div>
        <div class="lib-book-lessons">${book.lessons.length} lesson${book.lessons.length !== 1 ? 's' : ''}</div>
      </div>
    `;
  },

  capitalizeTag(tag) {
    return tag.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  },

  renderTopicLessonCard(lesson, book) {
    return `
      <div class="topic-lesson-card">
        <div class="dash-lesson-title">${lesson.title}</div>
        <div class="dash-lesson-body">${this.formatLessonBody(lesson.body)}</div>
        <div class="dash-lesson-source">
          ${book && book.coverUrl ? `<img class="lesson-source-thumb" src="${book.coverUrl}" alt="">` : ''}
          ${book ? `<em>${book.title}</em> · ${book.author}` : ''}
        </div>
        <div class="followup-prompt" style="margin-top:14px;padding-top:0">
          <div class="followup-row">
            <button class="followup-btn learn-more-btn" data-lesson-id="${lesson.id}" data-book-id="${book?.id}">Learn more</button>
            <button class="followup-btn ask-followup" data-lesson-id="${lesson.id}">
              <span class="ai-pill-badge">AI</span>
              Follow up
            </button>
          </div>
          <div class="learn-more-section hidden" id="learn-more-${lesson.id}"></div>
          ${book ? `<button class="followup-btn explore-book wide-followup" data-book-id="${book.id}">Explore the book</button>` : ''}
        </div>
      </div>
    `;
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
              <h3>Lessons live here</h3>
              <p>Use the "Add Book" flow to generate lessons with Claude, then paste them. Each one becomes a seed for your memory.</p>
            </div>
          `;
        } else {
          // Group lessons by their first tag
          const groups = {};
          const ungrouped = [];
          for (const lesson of freshBook.lessons) {
            const tag = (lesson.tags && lesson.tags.length > 0) ? lesson.tags[0] : null;
            if (tag) {
              if (!groups[tag]) groups[tag] = [];
              groups[tag].push(lesson);
            } else {
              ungrouped.push(lesson);
            }
          }

          const renderLesson = (lesson) => {
            const isLocked = !freshBook.completed && lesson.page && freshBook.currentPage && lesson.page > freshBook.currentPage;
            if (isLocked) {
              return `
                <div class="hub-lesson-item locked">
                  <div class="lesson-lock">page ${lesson.page}</div>
                  <div class="hub-lesson-title-locked">${lesson.title}</div>
                </div>
              `;
            }
            return `
              <div class="hub-lesson-card">
                <div class="hub-lesson-title">${lesson.title}</div>
                <div class="hub-lesson-body">${this.formatLessonBody(lesson.body)}</div>
                <div class="followup-prompt" style="margin-top:14px;padding-top:0">
                  <div class="followup-row">
                    <button class="followup-btn learn-more-btn" data-lesson-id="${lesson.id}" data-book-id="${bookId}">Learn more</button>
                    <button class="followup-btn ask-followup" data-lesson-id="${lesson.id}">
                      <span class="ai-pill-badge">AI</span>
                      Follow up
                    </button>
                  </div>
                  <div class="learn-more-section hidden" id="learn-more-${lesson.id}"></div>
                </div>
              </div>
            `;
          };

          const tagKeys = Object.keys(groups);
          if (tagKeys.length > 1) {
            // Multiple groups: render with topic headers
            for (const tag of tagKeys) {
              html += `<div class="hub-topic-group">`;
              html += `<div class="hub-topic-header">${tag.charAt(0).toUpperCase() + tag.slice(1)}</div>`;
              html += `<div class="hub-topic-lessons" id="group-${tag.replace(/\s+/g,'-')}">`;
              for (const lesson of groups[tag]) {
                html += renderLesson(lesson);
              }
              html += `</div></div>`;
            }
            for (const lesson of ungrouped) {
              html += renderLesson(lesson);
            }
          } else {
            // Only one tag or no tags: flat list
            for (const lesson of freshBook.lessons) {
              html += renderLesson(lesson);
            }
          }
        }
      } else {
        if (freshBook.quotes.length === 0) {
          html += `
            <div class="empty-state">
              <h3>Quiet for now</h3>
              <p>Save the lines that stop you mid-page. Use the Quick Add option to start collecting.</p>
            </div>
          `;
        } else {
          for (const quote of freshBook.quotes) {
            const preview = quote.text.length > 80 ? quote.text.slice(0, 80) + '...' : quote.text;
            html += `
              <div class="hub-quote-item collapsed" data-quote-id="${quote.id}">
                <div class="hub-quote-preview">"${preview}"</div>
                <div class="hub-quote-full hidden">"${quote.text}"</div>
                <button class="hub-quote-toggle">Show full quote</button>
              </div>
            `;
          }
        }
      }

      content.innerHTML = html;

      // Bind hub lesson learn-more and follow-up
      content.querySelectorAll('.learn-more-btn').forEach(btn => {
        btn.addEventListener('click', () => this.handleLearnMore(btn.dataset.lessonId, btn.dataset.bookId));
      });
      content.querySelectorAll('.ask-followup').forEach(btn => {
        btn.addEventListener('click', () => this.openChatWithContext('lesson', btn.dataset.lessonId));
      });

      // Bind quote toggles
      content.querySelectorAll('.hub-quote-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.hub-quote-item');
          const full = item.querySelector('.hub-quote-full');
          const preview = item.querySelector('.hub-quote-preview');
          const isHidden = full.classList.contains('hidden');
          full.classList.toggle('hidden');
          preview.classList.toggle('hidden');
          btn.textContent = isHidden ? 'Hide' : 'Show full quote';
        });
      });

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
    this.pushNav();

    // Close handlers — close DOM immediately, then sync history
    const closeHub = () => {
      modal.classList.add('hidden');
      if (history.state && history.state.layer) history.back();
    };
    modal.querySelector('.modal-back').onclick = closeHub;
    modal.querySelector('.modal-overlay').onclick = closeHub;
  },

  // ===== PRACTICE TAB =====
  renderPractice(container) {
    const main = container || document.getElementById('main-content');
    main.innerHTML = '';

    const data = Storage.getData();
    const allLessons = this.getAllUnlockedLessons(data);

    const render = () => {
      main.innerHTML = this.renderQuiz(data, allLessons);
      this.bindQuizEvents(main, data, allLessons, render);
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

  // ===== CHAT POPUP =====
  bindChatFab() {
    const fab = document.getElementById('chat-fab');
    const modal = document.getElementById('chat-modal');
    if (!fab || !modal) return;

    const openChat = () => {
      this.renderChatPopup();
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      this.pushNav();
      setTimeout(() => {
        const input = document.getElementById('chat-input');
        if (input) input.focus();
      }, 100);
    };

    const closeChat = () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      const sheet = modal.querySelector('.modal-content');
      if (sheet) sheet.style.transform = '';
      if (history.state && history.state.layer) history.back();
    };

    fab.addEventListener('click', openChat);
    modal.querySelector('.modal-close').addEventListener('click', closeChat);
    modal.querySelector('.modal-overlay').addEventListener('click', closeChat);

    // Keyboard avoidance — push the sheet above the keyboard
    if (window.visualViewport) {
      const adjustForKeyboard = () => {
        if (modal.classList.contains('hidden')) return;
        const sheet = modal.querySelector('.modal-content');
        if (!sheet) return;
        const kb = Math.max(0, window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop);
        sheet.style.transform = kb > 50 ? `translateY(-${kb}px)` : '';
        if (kb > 50) {
          const msgs = document.getElementById('chat-messages');
          if (msgs) msgs.scrollTop = msgs.scrollHeight;
        }
      };
      window.visualViewport.addEventListener('resize', adjustForKeyboard);
      window.visualViewport.addEventListener('scroll', adjustForKeyboard);
    }
  },

  renderChatPopup() {
    const body = document.getElementById('chat-popup-body');
    if (!body) return;

    const data = Storage.getData();
    const hasKey = (data.settings.geminiApiKey || data.settings.groqApiKey);

    if (!hasKey) {
      body.innerHTML = `
        <div class="chat-empty">
          <div>
            <p>Add an API key in Settings to use chat.</p>
            <button class="btn btn-primary" id="chat-go-settings" style="width:auto;margin-top:12px">Open Settings</button>
          </div>
        </div>
      `;
      document.getElementById('chat-go-settings').addEventListener('click', () => {
        // Close chat (no history.back — we're navigating forward to settings)
        const chatModal = document.getElementById('chat-modal');
        chatModal.classList.add('hidden');
        document.body.style.overflow = '';
        // Open settings on top
        document.getElementById('settings-page').classList.add('open');
        this.pushNav();
      });
      return;
    }

    // Determine selected book + lesson from chatContext
    let selectedBookId = '';
    let selectedLessonId = '';
    if (this.chatContext?.type === 'book') {
      selectedBookId = this.chatContext.id;
    } else if (this.chatContext?.type === 'lesson') {
      selectedLessonId = this.chatContext.id;
      for (const b of data.books) {
        if (b.lessons && b.lessons.some(l => l.id === selectedLessonId)) {
          selectedBookId = b.id;
          break;
        }
      }
    }

    // Book dropdown
    let bookOptions = '<option value="">No book</option>';
    for (const book of data.books) {
      if (book.title === 'Loose Quotes') continue;
      bookOptions += `<option value="${book.id}" ${selectedBookId === book.id ? 'selected' : ''}>${book.title}</option>`;
    }

    // Lesson dropdown (from selected book)
    const selectedBook = data.books.find(b => b.id === selectedBookId);
    let lessonOptions = '<option value="">All lessons</option>';
    if (selectedBook) {
      for (const lesson of selectedBook.lessons) {
        lessonOptions += `<option value="${lesson.id}" ${selectedLessonId === lesson.id ? 'selected' : ''}>${lesson.title}</option>`;
      }
    }

    // Provider dropdown
    const configured = LLM.getConfiguredProviders(data.settings);
    const currentProvider = LLM.selectedProvider || 'auto';
    let providerOptions = `<option value="auto" ${currentProvider === 'auto' ? 'selected' : ''}>Auto</option>`;
    for (const id of configured) {
      providerOptions += `<option value="${id}" ${currentProvider === id ? 'selected' : ''}>${LLM.providers[id].name}</option>`;
    }

    let messagesHtml = '';
    if (this.chatMessages.length === 0) {
      messagesHtml = '<div class="chat-empty">Ask anything about your books and lessons.</div>';
    } else {
      messagesHtml = this.chatMessages.map(msg => {
        if (msg.role === 'user') {
          const escaped = msg.content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
          return `<div class="chat-msg user"><div class="chat-msg-user-bubble">${escaped}</div></div>`;
        } else {
          return `<div class="chat-msg assistant"><div class="chat-ai-label">AI</div><div class="chat-ai-content">${this.parseMarkdown(msg.content)}</div></div>`;
        }
      }).join('');
    }

    body.innerHTML = `
      <div class="chat-context-bar">
        <div class="chat-bar-row">
          <select id="chat-book" class="chat-context-select">${bookOptions}</select>
          <select id="chat-lesson" class="chat-context-select">${lessonOptions}</select>
          <select id="chat-provider" class="chat-provider-select">${providerOptions}</select>
        </div>
      </div>
      <div class="chat-messages-container" id="chat-messages">${messagesHtml}</div>
      <div class="chat-clear"><a id="clear-chat">Clear chat</a></div>
      <div class="chat-input-bar">
        <input type="text" id="chat-input" placeholder="Ask about your reading...">
        <button class="btn btn-primary" id="chat-send">Send</button>
      </div>
    `;

    // Scroll: show top of latest AI response, or bottom if no AI yet
    const container = document.getElementById('chat-messages');
    const lastAI = container.querySelector('.chat-msg.assistant:last-child');
    if (lastAI) {
      container.scrollTop = lastAI.offsetTop - 8;
    } else {
      container.scrollTop = container.scrollHeight;
    }

    // Book change → rebuild lesson dropdown
    document.getElementById('chat-book').addEventListener('change', (e) => {
      const bookId = e.target.value;
      const book = data.books.find(b => b.id === bookId);
      const lessonSel = document.getElementById('chat-lesson');
      lessonSel.innerHTML = '<option value="">All lessons</option>';
      if (book) {
        for (const lesson of book.lessons) {
          lessonSel.innerHTML += `<option value="${lesson.id}">${lesson.title}</option>`;
        }
        this.chatContext = { type: 'book', id: bookId };
      } else {
        this.chatContext = null;
      }
    });

    // Lesson change
    document.getElementById('chat-lesson').addEventListener('change', (e) => {
      const lessonId = e.target.value;
      const bookId = document.getElementById('chat-book').value;
      if (lessonId) {
        this.chatContext = { type: 'lesson', id: lessonId };
      } else if (bookId) {
        this.chatContext = { type: 'book', id: bookId };
      } else {
        this.chatContext = null;
      }
    });

    // Provider change
    document.getElementById('chat-provider').addEventListener('change', (e) => {
      LLM.selectedProvider = e.target.value === 'auto' ? null : e.target.value;
    });

    // Send message
    const sendMessage = async () => {
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;

      input.value = '';
      this.chatMessages.push({ role: 'user', content: text });
      this.renderChatMessages();

      const messagesDiv = document.getElementById('chat-messages');
      const typingEl = document.createElement('div');
      typingEl.className = 'chat-msg assistant typing';
      typingEl.innerHTML = '<div class="chat-ai-label">AI</div><div class="chat-ai-content"><span class="typing-dots"><span></span><span></span><span></span></span></div>';
      messagesDiv.appendChild(typingEl);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      try {
        let systemPrompt = '';
        const freshData = Storage.getData();

        if (this.chatContext) {
          if (this.chatContext.type === 'book') {
            const book = freshData.books.find(b => b.id === this.chatContext.id);
            if (book) systemPrompt = LLM.buildSystemPrompt(book, book.lessons, book.quotes);
          } else if (this.chatContext.type === 'lesson') {
            for (const book of freshData.books) {
              const lesson = book.lessons.find(l => l.id === this.chatContext.id);
              if (lesson) {
                systemPrompt = LLM.buildSystemPrompt(book, [lesson], book.quotes);
                break;
              }
            }
          }
        }

        const response = await LLM.chat(this.chatMessages, freshData.settings, systemPrompt);
        typingEl.remove();
        this.chatMessages.push({ role: 'assistant', content: response });
        this.renderChatMessages();
      } catch (err) {
        typingEl.remove();
        if (err.message === 'ALL_PROVIDERS_EXHAUSTED') {
          this.chatMessages.push({ role: 'assistant', content: 'All providers are rate-limited. Try again later, or add another API key in Settings.' });
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
      this.renderChatPopup();
    });
  },

  renderChatMessages() {
    const div = document.getElementById('chat-messages');
    if (!div) return;

    if (this.chatMessages.length === 0) {
      div.innerHTML = '<div class="chat-empty">Ask anything about your books and lessons.</div>';
    } else {
      div.innerHTML = this.chatMessages.map(msg => {
        if (msg.role === 'user') {
          const escaped = msg.content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
          return `<div class="chat-msg user"><div class="chat-msg-user-bubble">${escaped}</div></div>`;
        } else {
          return `<div class="chat-msg assistant"><div class="chat-ai-label">AI</div><div class="chat-ai-content">${this.parseMarkdown(msg.content)}</div></div>`;
        }
      }).join('');
    }
    // Show top of latest AI response; for user messages scroll to bottom
    const lastMsg = div.querySelector('.chat-msg:last-child');
    if (lastMsg && lastMsg.classList.contains('assistant')) {
      div.scrollTop = lastMsg.offsetTop - 8;
    } else {
      div.scrollTop = div.scrollHeight;
    }
  },

  parseMarkdown(text) {
    // Escape HTML
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Headers (h3/h4 style)
    text = text.replace(/^#{1,3}\s+(.+)$/gm, '<h4>$1</h4>');
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic (skip em tags that are already in text)
    text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
    // Code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bullet lists
    text = text.replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>');
    // Wrap consecutive <li> in <ul>
    text = text.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
    // Numbered lists
    text = text.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    // Paragraphs from double newlines
    const parts = text.split(/\n\n+/);
    text = parts.map(p => {
      p = p.trim();
      if (!p) return '';
      if (p.startsWith('<h4>') || p.startsWith('<ul>') || p.startsWith('<ol>')) return p;
      return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');
    return text;
  },

  openChatWithContext(type, id) {
    this.chatContext = { type, id };
    this.renderChatPopup();
    document.getElementById('chat-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    this.pushNav();
  },

  // ===== SETTINGS =====
  bindSettings() {
    const page = document.getElementById('settings-page');
    const openBtn = document.getElementById('settings-btn');

    const openSettings = () => {
      const data = Storage.getData();
      document.getElementById('gemini-key').value = data.settings.geminiApiKey || '';
      document.getElementById('groq-key').value = data.settings.groqApiKey || '';

      // Theme buttons
      document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === data.settings.theme);
      });

      // Reset to main settings pane
      document.getElementById('settings-panes').classList.remove('show-sub');
      page.classList.add('open');
      this.pushNav();
    };

    const closeSettings = () => {
      page.classList.remove('open');
      if (history.state && history.state.layer) history.back();
    };

    openBtn.addEventListener('click', openSettings);
    document.getElementById('settings-page-back').addEventListener('click', closeSettings);

    // Gemini key
    document.getElementById('gemini-key').addEventListener('change', (e) => {
      Storage.updateData(d => { d.settings.geminiApiKey = e.target.value; });
    });

    // iOS-style API Keys sub-page navigation
    document.getElementById('nav-api-keys').addEventListener('click', () => {
      document.getElementById('settings-panes').classList.add('show-sub');
    });

    document.getElementById('settings-back').addEventListener('click', () => {
      document.getElementById('settings-panes').classList.remove('show-sub');
    });

    // Toggle key visibility
    document.getElementById('toggle-key-vis').addEventListener('click', () => {
      const input = document.getElementById('gemini-key');
      input.type = input.type === 'password' ? 'text' : 'password';
    });

    // Groq key
    document.getElementById('groq-key').addEventListener('change', (e) => {
      Storage.updateData(d => { d.settings.groqApiKey = e.target.value; });
    });

    document.getElementById('toggle-groq-vis').addEventListener('click', () => {
      const input = document.getElementById('groq-key');
      input.type = input.type === 'password' ? 'text' : 'password';
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
        closeSettings();
      } catch (err) {
        this.showToast('Import failed: ' + err.message);
      }
    });

    // Sign out
    // Refresh app
    document.getElementById('refresh-app').addEventListener('click', () => {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistration().then(reg => {
          if (reg) reg.update();
        });
      }
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => {
        location.reload(true);
      });
    });

    document.getElementById('sign-out').addEventListener('click', () => {
      if (window.Auth) {
        window.Auth.signOut();
        closeSettings();
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
    const theme = data.settings.theme || 'dark';
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.querySelector('meta[name="theme-color"]').content = '#0D0D0D';
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.querySelector('meta[name="theme-color"]').content = '#F5F4F0';
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

    const closeAddBook = () => {
      modal.classList.add('hidden');
      if (history.state && history.state.layer) history.back();
    };
    modal.querySelector('.modal-close').addEventListener('click', closeAddBook);
    modal.querySelector('.modal-overlay').addEventListener('click', closeAddBook);

    // Copy Claude prompt
    document.getElementById('copy-claude-prompt').addEventListener('click', () => {
      const title = document.getElementById('new-book-title').value || '[TITLE]';
      const author = document.getElementById('new-book-author').value || '[AUTHOR]';
      const prompt = `I want to add the book "${title}" by ${author} to my reading memory app. Generate a comprehensive set of key lessons from this book. Return ONLY valid JSON in this exact format, with no other text:

[
  {
    "title": "Self-contained lesson title with enough context to understand standalone (max 10 words)",
    "body": "2-4 sentence explanation. First sentence states the core concept. Remaining sentences give supporting detail or examples.",
    "detail": "A 2-3 paragraph deeper breakdown in markdown. Paragraph 1: the core concept explained more precisely. Paragraph 2: how ${author} develops this argument — what frameworks, metaphors, or narrative structure they use. Paragraph 3: key evidence — specific examples, case studies, or data points the author uses, as a bullet list.",
    "page": 45,
    "tags": ["optional", "tags"]
  }
]

Rules:
- Generate 15-30 lessons covering the book's main concepts, frameworks, key cases/examples, and memorable arguments
- Include the approximate page number where each lesson appears (best estimate is fine)
- Order lessons by page number, ascending
- Cover not just the headline ideas but also vivid examples, cases, and counter-intuitive points worth remembering
- Every title MUST be self-contained — a reader seeing it out of context should immediately understand what it refers to. Bad: "Poland as the Counter-Example". Good: "Poland Resisted Shock Therapy Through Strong Unions"
- The "detail" field should use markdown: **bold** for key terms, bullet points (- ) for evidence lists
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
            detail: l.detail || null,
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
      closeAddBook();
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
      closeAddBook();
      this.showToast('Quote saved');
      if (this.currentTab === 'library') this.renderLibrary();
    });
  },

  openAddBookModal() {
    document.getElementById('add-book-modal').classList.remove('hidden');
    this.pushNav();
  },

  // ===== FAVORITES =====
  isFavorite(lessonId) {
    const data = Storage.getData();
    return (data.favorites || []).includes(lessonId);
  },

  toggleFavorite(lessonId) {
    Storage.updateData(d => {
      if (!d.favorites) d.favorites = [];
      const idx = d.favorites.indexOf(lessonId);
      if (idx >= 0) {
        d.favorites.splice(idx, 1);
        this.showToast('Removed from saved');
      } else {
        d.favorites.push(lessonId);
        this.showToast('Saved');
      }
    });
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

  // ===== CONCEPT QUIZ =====
  buildQuizQuestions(data, allLessons, count = 10) {
    if (allLessons.length < 4) return null;

    // Shuffle and pick questions
    const shuffled = [...allLessons].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    return selected.map(lesson => {
      const correctBook = data.books.find(b => b.lessons.some(l => l.id === lesson.id));

      // Pick 3 wrong lesson titles from the full pool (different lessons)
      const others = allLessons
        .filter(l => l.id !== lesson.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      // Options: 4 lesson objects shuffled, marked with correct id
      const options = [...others, lesson].sort(() => Math.random() - 0.5);
      return { lesson, correctBook, options, chosen: null };
    });
  },

  renderQuiz(data, allLessons) {
    if (allLessons.length < 4) {
      return `
        <div class="empty-state">
          <h3>Almost ready to play</h3>
          <p>You need at least 4 lessons across your books before the quiz can challenge you. Keep reading.</p>
        </div>
      `;
    }

    if (!this.quizSession) {
      const questions = this.buildQuizQuestions(data, allLessons);
      if (!questions) return `<div class="empty-state"><h3>Not quite enough to work with</h3><p>Add a few more lessons and we'll build a quiz from your reading.</p></div>`;
      this.quizSession = { questions, current: 0, score: 0, finished: false };
    }

    const session = this.quizSession;
    if (session.finished) return this.renderQuizResults(session);

    const q = session.questions[session.current];
    const total = session.questions.length;
    const progressPct = Math.round((session.current / total) * 100);
    const isCorrect = q.chosen && q.chosen === q.lesson.id;
    const labels = ['A', 'B', 'C', 'D'];

    return `
      <div class="quiz-wrap">
        <div class="quiz-top-bar">
          <span class="quiz-counter">${session.current + 1}<span class="quiz-counter-total"> / ${total}</span></span>
          <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${progressPct}%"></div></div>
          <span class="quiz-score-pill ${session.score > 0 ? 'has-score' : ''}">${session.score} ✓</span>
        </div>

        <div class="quiz-card">
          <div class="quiz-card-label">Name the concept</div>
          <div class="quiz-prompt-body">${this.quizFormatBody(q.lesson.body)}</div>
        </div>

        <div class="quiz-options" id="quiz-options">
          ${q.options.map((opt, i) => {
            let state = '';
            let icon = labels[i];
            if (q.chosen) {
              if (opt.id === q.lesson.id) { state = 'correct'; icon = '✓'; }
              else if (opt.id === q.chosen) { state = 'wrong'; icon = '✗'; }
              else state = 'dim';
            }
            return `
              <button class="quiz-option ${state}" data-lesson-id="${opt.id}" ${q.chosen ? 'disabled' : ''}>
                <span class="quiz-opt-label">${icon}</span>
                <span class="quiz-opt-title">${opt.title}</span>
              </button>
            `;
          }).join('')}
        </div>

        ${q.chosen ? `
          <div class="quiz-feedback ${isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-wrong'}">
            ${isCorrect
              ? `<strong>Correct!</strong> — from <em>${q.correctBook?.title || ''}</em>`
              : `<strong>${q.lesson.title}</strong> — from <em>${q.correctBook?.title || ''}</em>`}
          </div>
          <button class="btn btn-primary quiz-next-btn" id="quiz-next">
            ${session.current + 1 < total ? 'Next →' : 'See results'}
          </button>
        ` : ''}
      </div>
    `;
  },

  renderQuizResults(session) {
    const total = session.questions.length;
    const score = session.score;
    const pct = Math.round((score / total) * 100);

    const storedBest = parseInt(localStorage.getItem('quiz_best') || '0');
    const isNewBest = score > storedBest;
    if (isNewBest) localStorage.setItem('quiz_best', String(score));
    const best = isNewBest ? score : storedBest;

    let emoji, message;
    if (pct === 100)    { emoji = '🏆'; message = 'Perfect score!'; }
    else if (pct >= 80) { emoji = '⭐'; message = 'Great memory!'; }
    else if (pct >= 60) { emoji = '👍'; message = 'Solid effort'; }
    else if (pct >= 40) { emoji = '📚'; message = 'Keep at it'; }
    else                { emoji = '💪'; message = 'Practice makes perfect'; }

    const reviewHtml = session.questions.map(q => {
      const correct = q.chosen === q.lesson.id;
      return `
        <div class="quiz-review-item ${correct ? 'review-correct' : 'review-wrong'}">
          <span class="review-icon">${correct ? '✓' : '✗'}</span>
          <span class="review-text">
            <span class="review-lesson">${q.lesson.title}</span>
            <span class="review-book">${q.correctBook?.title || ''}</span>
          </span>
        </div>
      `;
    }).join('');

    return `
      <div class="quiz-results">
        <div class="quiz-results-hero">
          <div class="quiz-results-emoji">${emoji}</div>
          <div class="quiz-results-score">${score}<span class="quiz-results-total">/${total}</span></div>
          <div class="quiz-results-message">${message}</div>
          <div class="quiz-results-sub">
            ${isNewBest
              ? `<span class="quiz-best-badge">New best 🎉</span>`
              : `Best: ${best}/${total}`}
          </div>
        </div>
        <div class="quiz-review">
          <div class="quiz-review-label">Review</div>
          ${reviewHtml}
        </div>
        <button class="btn btn-primary quiz-restart-btn" id="quiz-restart">Play again</button>
      </div>
    `;
  },

  quizFormatBody(body) {
    if (!body) return '';
    const clean = body.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (clean.length <= 300) return clean;
    const cut = clean.lastIndexOf(' ', 300);
    return clean.slice(0, cut > 0 ? cut : 300) + '…';
  },

  bindQuizEvents(main, data, allLessons, render) {
    // Option tap
    main.querySelectorAll('.quiz-option:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const session = this.quizSession;
        if (!session) return;
        const q = session.questions[session.current];
        if (q.chosen) return;
        q.chosen = btn.dataset.lessonId;
        if (q.chosen === q.lesson.id) session.score++;
        render();
      });
    });

    // Next / finish
    const nextBtn = document.getElementById('quiz-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const session = this.quizSession;
        session.current++;
        if (session.current >= session.questions.length) session.finished = true;
        render();
      });
    }

    // Restart
    const restartBtn = document.getElementById('quiz-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.quizSession = null;
        render();
      });
    }
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
