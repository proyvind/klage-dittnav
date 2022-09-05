import { getLogger } from './logger';
import { EmojiIcons, sendToSlack } from './slack';

const log = getLogger('');

export const processErrors = () => {
  process
    .on('unhandledRejection', (reason, promise) => {
      log.error({ error: reason, msg: `Process ${process.pid} received a unhandledRejection signal` });

      promise.catch((error: unknown) => log.error({ error, msg: `Uncaught error` }));
    })
    .on('uncaughtException', (error) =>
      log.error({ error, msg: `Process ${process.pid} received a uncaughtException signal` })
    )
    .on('SIGTERM', (signal) => {
      log.info({ msg: `Process ${process.pid} received a ${signal} signal.` });
      process.exit(0);
    })
    .on('SIGINT', (signal) => {
      const error = new Error(`Process ${process.pid} has been interrupted, ${signal}.`);
      log.error({ error });
      process.exit(1);
    })
    .on('beforeExit', async (code) => {
      const msg = `Crash ${JSON.stringify(code)}`;
      log.error({ msg });
      sendToSlack(msg, EmojiIcons.Scream);
    });
};
