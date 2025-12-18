import createServer from '@tomphttp/bare-server-node';
import path from 'path';
import fs from 'fs';

const bare = createServer('/bare/');

export default async function handler(req, res) {
  // 1. Handle Proxy (Bare Server)
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
    return;
  }

  // 2. Handle Website Files (from /main folder)
  const url = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(process.cwd(), 'main', url);

  if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath);
    // Auto-detect the file type (html, css, js)
    const ext = path.extname(filePath);
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
    res.setHeader('Content-Type', types[ext] || 'text/plain');
    res.status(200).send(content);
  } else {
    res.status(404).send('File not found in /main folder');
  }
}
