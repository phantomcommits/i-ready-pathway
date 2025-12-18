import createServer from '@tomphttp/bare-server-node';
import path from 'path';
import fs from 'fs';

const bare = createServer('/bare/');

export default async function handler(req, res) {
  try {
    // 1. Handle Proxy (Bare Server)
    if (bare.shouldRoute(req)) {
      bare.routeRequest(req, res);
      return;
    }

    // 2. Handle Website Files
    const url = req.url === '/' ? '/index.html' : req.url;
    // We try two different paths just in case Vercel is being picky
    const pathsToTry = [
      path.join(process.cwd(), 'main', url),
      path.join(process.cwd(), url)
    ];

    let foundPath = pathsToTry.find(p => fs.existsSync(p) && fs.lstatSync(p).isFile());

    if (foundPath) {
      const content = fs.readFileSync(foundPath);
      const ext = path.extname(foundPath);
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
      res.setHeader('Content-Type', types[ext] || 'text/plain');
      res.status(200).send(content);
    } else {
      res.status(404).send(`File not found. I tried: ${pathsToTry.join(' AND ')}`);
    }
  } catch (error) {
    console.error("CRASH LOG:", error);
    res.status(500).send("The server started but hit an error: " + error.message);
  }
}
