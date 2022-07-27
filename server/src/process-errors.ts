import { EmojiIcons, sendToSlack } from './slack';

export const processErrors = () => {
  process
    .on('unhandledRejection', (reason, promise) => {
      console.error(`Process ${process.pid} received a unhandledRejection signal, ${JSON.stringify(reason)}`);

      promise.catch((err) => {
        if (err instanceof Error) {
          console.error(`Uncaught error: ${err.message}`);
        } else {
          console.error(`Uncaught error: Unknown error.`);
        }

        process.exit(1);
      });
    })
    .on('uncaughtException', (e) => {
      console.error(`Process ${process.pid} received a uncaughtException signal, ${e.message}`);
      process.exit(1);
    })
    .on('SIGTERM', (signal) => {
      console.error(`Process ${process.pid} received a SIGTERM signal, ${signal}`);
      process.exit(1);
    })

    .on('SIGINT', (signal) => {
      console.error(`Process ${process.pid} has been interrupted, ${signal}`);
      process.exit(1);
    })
    .on('beforeExit', async (code) => {
      sendToSlack(`Crash ${JSON.stringify(code)}`, EmojiIcons.Scream);
    });
};
