// gemini.js — Google Gemini API integration

const Gemini = {
  async chat(messages, apiKey, systemPrompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const contents = [];

    if (systemPrompt) {
      contents.push({
        role: 'user',
        parts: [{ text: `System instructions: ${systemPrompt}\n\nPlease acknowledge and follow these instructions.` }]
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'Understood. I will follow these instructions.' }]
      });
    }

    for (const msg of messages) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      if (res.status === 429) {
        throw new Error('RATE_LIMIT');
      }
      throw new Error(err.error?.message || `API error ${res.status}`);
    }

    const json = await res.json();
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('No response from Gemini');
    return text;
  },

  buildSystemPrompt(book, lessons, quotes) {
    let prompt = '';
    if (book) {
      prompt = `The user is asking about the book "${book.title}" by ${book.author}.`;
      if (lessons && lessons.length > 0) {
        prompt += ` Here are the lessons they have for it:\n`;
        lessons.forEach((l, i) => {
          prompt += `${i + 1}. ${l.title}: ${l.body}\n`;
        });
      }
      if (quotes && quotes.length > 0) {
        prompt += `\nHere are their saved quotes:\n`;
        quotes.forEach((q, i) => {
          prompt += `${i + 1}. "${q.text}"\n`;
        });
      }
    }
    prompt += `\nAnswer questions in a thoughtful, concise way that helps them deepen their understanding and memory.`;
    return prompt;
  }
};
