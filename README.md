# Margins — A Personal Reading Memory PWA

Margins is a warm, book-like Progressive Web App that helps you remember what you read. Each book has its own hub with key lessons, saved quotes, and context. Daily habit mechanics keep you engaged with your reading notes, and an in-app chat (powered by Google Gemini) lets you ask follow-up questions.

## How to Run Locally

1. Open a terminal in the `margins/` folder
2. Start any static file server:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```
3. Open `http://localhost:8080` in your browser

## Deploy to Firebase Hosting

1. Install Firebase CLI if you haven't:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in:
   ```bash
   firebase login
   ```
3. From the `margins/` folder, initialize Firebase:
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project (or create one)
   - Set public directory to `.` (current directory)
   - Configure as single-page app: **No**
   - Don't overwrite `index.html`
4. Deploy:
   ```bash
   firebase deploy
   ```
5. Your app will be live at `https://your-project.web.app`

## Install on iPhone

1. Open your deployed URL in Safari on iOS
2. Tap the Share button > "Add to Home Screen"
3. The app will work offline and feel like a native app
4. Daily notifications require iOS 16.4+ and the app must be installed to home screen

## Get a Free Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it into Margins' Settings screen

## How It Works

- **Today**: Daily lesson/quote card with streak tracking. Mark as read to build your streak. Rate your recall to influence which lessons surface more often.
- **Library**: Grid of your books with covers from Open Library. Tap a book to see its lessons and quotes. Page-based spoiler protection blurs lessons ahead of your current reading position.
- **Practice**: Flashcard mode for spaced repetition of lessons, weighted by recall score. Connection mode pairs lessons from different books and prompts you to find relationships between ideas.
- **Ask**: Chat with Google Gemini about any book or lesson. Select context from a dropdown to give the AI your notes for that book.
- **Settings**: API key, notification time, Cream/Sepia Dark themes, data export/import.

## Design Decisions

- **Vanilla JS, no build step**: The app is entirely static HTML/CSS/JS. No React, no npm, no bundler. Just files you can host anywhere.
- **localStorage only**: All data lives in the browser. No backend, no accounts, no tracking. Export/import JSON for backups.
- **Quotes imported from xlsx**: Your quotes.xlsx was pre-converted to `data/initial-data.json` and loads automatically on first run.
- **Epictetus quote**: The quote with no book attribution is stored under "Loose Quotes".
- **Samuel Beckett quote**: "I can't go on. I'll go on." is attributed to Beckett but stored under "When Breath Becomes Air" (the book it was taken from).
- **Nexus quotes**: Attributed to Yuval Noah Harari (author wasn't in the spreadsheet but inferred from the book title).
- **Book covers**: Fetched automatically from Open Library's API. Falls back to a typographic card if no cover is found.
