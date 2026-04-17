import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import timmyChat from '../api/timmy-chat.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = dirname(__dirname); // parent of dashboard/
const PORT = process.env.PORT || 3006;

// Load .env for local dev (Vercel injects env vars on its own)
try {
  const envText = await readFile(join(__dirname, '.env'), 'utf8');
  for (const line of envText.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2];
  }
} catch {}

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

createServer(async (req, res) => {
  let path = req.url.split('?')[0];
  if (path === '/') path = '/index.html';

  // --- Timmy chat API (mirrors Vercel serverless shape) ---
  if (path === '/api/timmy-chat') {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    let body = {};
    try { body = JSON.parse(Buffer.concat(chunks).toString() || '{}'); } catch {}
    const shim = {
      status(code) { res.statusCode = code; return this; },
      json(obj) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); }
    };
    await timmyChat({ method: req.method, body }, shim);
    return;
  }

  // --- Static files ---
  try {
    // Block .env from being served as a static file
    if (path.endsWith('.env') || path.includes('..')) {
      res.writeHead(404);
      return res.end('Not found');
    }
    const file = await readFile(join(__dirname, path));
    res.writeHead(200, { 'Content-Type': MIME[extname(path)] || 'application/octet-stream' });
    res.end(file);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => {
  console.log(`Srishti's Dashboard → http://localhost:${PORT}`);
});
