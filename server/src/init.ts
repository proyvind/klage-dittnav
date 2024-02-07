import { Express, static as expressStatic } from 'express';
import { frontendDistDirectoryPath } from '@app/config/config';
import { redirectMiddleware } from '@app/middleware/redirect/redirect';
import { sessionIdMiddleware } from '@app/middleware/session-id';
import { serverConfig } from './config/server-config';
import { getLogger } from './logger';
import { appHandler } from './routes/app-handler';
import { errorReporter } from './routes/error-report';
import { setupProxy } from './routes/setup-proxy';
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
    server.use(errorReporter());
    server.use(await setupProxy());
    server.get('/favicon.ico', (req, _, next) => {
      req.url = '/favicon/favicon.ico';
      next();
    });
    server.use(expressStatic(frontendDistDirectoryPath, { index: false, fallthrough: true }));
    server.use(sessionIdMiddleware);
    server.use(redirectMiddleware);
    server.get('*', appHandler);
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
