import { Express } from 'express';
import { serverConfig } from './config/server-config';
import { setupProxy } from './routes/setup-proxy';
import { setupStaticRoutes } from './routes/static-routes';
import { setupVersionRoute } from './routes/version';
import { EmojiIcons, sendToSlack } from './slack';

const PORT = serverConfig.port;

export const init = async (server: Express) => {
  try {
    server.get('/loggedin-redirect', (req, res) => {
      const { redirect } = req.query;

      if (typeof redirect === 'string' && redirect.length !== 0) {
        res.redirect(`/oauth2/login?redirect=${redirect}`);
      } else {
        res.redirect('/oauth2/login?redirect=/');
      }
    });
    server.use(setupVersionRoute());
    server.use(await setupProxy());
    server.use(setupStaticRoutes());
    server.listen(PORT, () => console.info(`Listening on port ${PORT}`));
  } catch (e) {
    if (e instanceof Error) {
      await sendToSlack(`Server crashed: ${e.message}`, EmojiIcons.Scream);
    } else if (typeof e === 'string' || typeof e === 'number') {
      await sendToSlack(`Server crashed: ${JSON.stringify(e)}`, EmojiIcons.Scream);
    }

    process.exit(1);
  }
};
