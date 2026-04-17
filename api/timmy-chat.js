// Vercel serverless function: POST /api/timmy-chat
// Proxies chat messages to the Anthropic API so the key never hits the client.

import { buildSystemPrompt, MODEL, MAX_TOKENS } from './timmy-prompt.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
    return;
  }
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'messages array required' });
      return;
    }
    const system = await buildSystemPrompt();
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system,
        messages
      })
    });
    const data = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: data.error?.message || 'Anthropic API error', detail: data });
      return;
    }
    const reply = data.content?.[0]?.text || '';
    res.status(200).json({ reply, usage: data.usage });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
