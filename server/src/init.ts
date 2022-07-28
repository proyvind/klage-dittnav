import { Express } from 'express';
import { serverConfig } from './config/server-config';
import { getLogger } from './logger';
import { setupProxy } from './routes/setup-proxy';
import { setupStaticRoutes } from './routes/static-routes';
import { setupVersionRoute } from './routes/version';
import { EmojiIcons, sendToSlack } from './slack';

const log = getLogger('init');

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
    server.listen(PORT, () => log.info({ msg: `Listening on port ${PORT}` }));
  } catch (e) {
    if (e instanceof Error) {
      log.error({ error: e, msg: 'Server crashed' });
      await sendToSlack(`Server crashed: ${e.message}`, EmojiIcons.Scream);
    } else if (typeof e === 'string' || typeof e === 'number') {
      const msg = `Server crashed: ${JSON.stringify(e)}`;
      log.error({ msg });
      await sendToSlack(msg, EmojiIcons.Scream);
    }

    process.exit(1);
  }
};
