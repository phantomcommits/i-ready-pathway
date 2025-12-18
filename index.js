import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  const url = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(process.cwd(), 'main', url);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath);
    res.status(200).send(content);
  } else {
    res.status(200).send("The server is UP, but it cannot find your files in the /main folder.");
  }
}
