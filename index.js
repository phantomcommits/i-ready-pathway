import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  try {
    const url = req.url === '/' ? '/index.html' : req.url;
    
    // This looks in the root AND the main folder
    const rootPath = path.join(process.cwd(), url);
    const mainPath = path.join(process.cwd(), 'main', url);

    if (fs.existsSync(mainPath)) {
      const content = fs.readFileSync(mainPath);
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(content);
    } 
    
    if (fs.existsSync(rootPath)) {
      const content = fs.readFileSync(rootPath);
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(content);
    }

    // DEBUG: If it fails, show us what folders exist so we can fix it tomorrow
    const filesInRoot = fs.readdirSync(process.cwd());
    res.status(200).send(`
      <h1>Almost there!</h1>
      <p>I couldn't find <b>${url}</b>.</p>
      <p>Folders I see in your project: ${filesInRoot.join(', ')}</p>
      <p>Check if your HTML files are inside a folder named 'main' or just in the root.</p>
    `);

  } catch (err) {
    res.status(500).send("Critical Error: " + err.message);
  }
}
