import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  try {
    const url = req.url === '/' ? 'index.html' : req.url.replace(/^\//, '');
    
    // We check three places: the root, the main folder, and a public folder
    const paths = [
      join(process.cwd(), url),
      join(process.cwd(), 'main', url),
      join(process.cwd(), 'public', url)
    ];

    for (const filePath of paths) {
      if (existsSync(filePath)) {
        const content = readFileSync(filePath);
        // Set content type based on file extension
        if (url.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
        else if (url.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
        else res.setHeader('Content-Type', 'text/html');
        
        return res.status(200).send(content);
      }
    }

    res.status(404).send("Server is LIVE, but it can't find your HTML files in root or /main. You are almost there!");
  } catch (err) {
    res.status(500).send("Vercel error: " + err.message);
  }
}
