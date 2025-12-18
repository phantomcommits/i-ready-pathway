import createServer from '@tomphttp/bare-server-node';
const bare = createServer('/bare/');

export default async function handler(req, res) {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    // This tells Vercel to just serve the files in your /main folder
    res.status(404).send('Not Found');
  }
}
