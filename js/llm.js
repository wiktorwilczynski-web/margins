// llm.js — Multi-provider LLM abstraction with automatic fallback

const LLM = {
  providers: {
    gemini: {
      name: 'Gemini',
      keyField: 'geminiApiKey',
      async chat(messages, apiKey, systemPrompt) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;
        const contents = [];

        if (systemPrompt) {
          contents.push({ role: 'user', parts: [{ text: `System instructions: ${systemPrompt}\n\nPlease acknowledge and follow these instructions.` }] });
          contents.push({ role: 'model', parts: [{ text: 'Understood. I will follow these instructions.' }] });
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
          body: JSON.stringify({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 1024 } })
        });

        if (!res.ok) {
          if (res.status === 429) throw new Error('RATE_LIMIT');
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || `Gemini error ${res.status}`);
        }

        const json = await res.json();
        return json.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }
    },

    groq: {
      name: 'Groq',
      keyField: 'groqApiKey',
      async chat(messages, apiKey, systemPrompt) {
        const url = 'https://api.groq.com/openai/v1/chat/completions';
        const formatted = [];

        if (systemPrompt) {
          formatted.push({ role: 'system', content: systemPrompt });
        }
        for (const msg of messages) {
          formatted.push({ role: msg.role, content: msg.content });
        }

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: formatted,
            temperature: 0.7,
            max_tokens: 1024
          })
        });

        if (!res.ok) {
          if (res.status === 429) throw new Error('RATE_LIMIT');
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || `Groq error ${res.status}`);
        }

        const json = await res.json();
        return json.choices?.[0]?.message?.content || '';
      }
    }
  },

  providerOrder: ['gemini', 'groq'],
  lastProvider: null,

  async chat(messages, settings, systemPrompt) {
    for (const id of this.providerOrder) {
      const provider = this.providers[id];
      const key = settings[provider.keyField];
      if (!key) continue;

      try {
        const result = await provider.chat(messages, key, systemPrompt);
        this.lastProvider = id;
        return result;
      } catch (err) {
        if (err.message === 'RATE_LIMIT') {
          console.warn(`${provider.name} rate limited, trying next provider...`);
          continue;
        }
        throw err;
      }
    }
    throw new Error('ALL_PROVIDERS_EXHAUSTED');
  },

  buildSystemPrompt(book, lessons, quotes) {
    let prompt = '';
    if (book) {
      prompt = `The user is asking about the book "${book.title}" by ${book.author}.`;
      if (lessons && lessons.length > 0) {
        prompt += ` Here are the lessons they have for it:\n`;
        lessons.forEach((l, i) => { prompt += `${i + 1}. ${l.title}: ${l.body}\n`; });
      }
      if (quotes && quotes.length > 0) {
        prompt += `\nHere are their saved quotes:\n`;
        quotes.forEach((q, i) => { prompt += `${i + 1}. "${q.text}"\n`; });
      }
    }
    prompt += `\nAnswer questions in a thoughtful, concise way that helps them deepen their understanding and memory.`;
    return prompt;
  },

  getConfiguredProviders(settings) {
    return this.providerOrder.filter(id => {
      const key = settings[this.providers[id].keyField];
      return key && key.trim().length > 0;
    });
  }
};
