import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
const tasks = new Map();
const html = await readFile(new URL('./index.html', import.meta.url));
http.createServer(async (req, res) => {
  const send = (status, data) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(data)); };
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end(html); }
  if (req.method === 'POST' && url.pathname === '/api/tasks') {
    let raw = '';
    for await (const chunk of req) { raw += chunk; if (raw.length > 10000) return send(413, { error: 'Payload muito grande' }); }
    let body;
    try { body = JSON.parse(raw); } catch { return send(400, { error: 'JSON inválido' }); }
    if (typeof body?.title !== 'string' || !body.title.trim() || body.title.trim().length > 100) return send(400, { error: 'Título deve ter entre 1 e 100 caracteres' });
    const task = { id: randomUUID(), title: body.title.trim(), completed: false };
    tasks.set(task.id, task); return send(201, task);
  }
  const match = url.pathname.match(/^\/api\/tasks\/([^/]+)$/);
  if (match && req.method === 'GET') return tasks.has(match[1]) ? send(200, tasks.get(match[1])) : send(404, { error: 'Tarefa não encontrada' });
  if (match && req.method === 'DELETE') { if (!tasks.delete(match[1])) return send(404, { error: 'Tarefa não encontrada' }); res.writeHead(204); return res.end(); }
  return send(404, { error: 'Rota não encontrada' });
}).listen(3000, '127.0.0.1');
