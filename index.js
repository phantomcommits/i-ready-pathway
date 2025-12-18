import createServer from '@tomphttp/bare-server-node';
const bare = createServer('/bare/');

export default async function handler(req, res) {
  // If the request is for the proxy, handle it
  if (req.url.startsWith('/bare/')) {
    return bare.routeRequest(req, res);
  }
  
  // Otherwise, just send a "Hello" to prove it's alive
  res.status(200).send("The server is alive. If you see this, the proxy is working. Go to bed!");
}
