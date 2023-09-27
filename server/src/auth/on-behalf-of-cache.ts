import { getLogger } from '@app/logger';

const log = getLogger('auth');

export const oboCache: Map<string, [string, number]> = new Map();

setInterval(
  () => {
    const before = oboCache.size;
    const timestamp = now();

    const deleted: number = Array.from(oboCache.entries())
      .map(([key, [, expires_at]]) => {
        if (expires_at <= timestamp) {
          return oboCache.delete(key);
        }

        return false;
      })
      .filter((d) => d).length;

    const after = oboCache.size;

    if (deleted === 0) {
      log.debug({ msg: `Cleaned the OBO token cache. No expired tokens found. Cache had ${before} tokens.` });

      return;
    }

    log.debug({
      msg: `Cleaned the OBO token cache. Deleted ${deleted} expired tokens. Cache had ${before} tokens, ${after} remaining.`,
    });
  },
  10 * 60 * 1000,
); // 10 minutes.

export const now = () => Math.round(Date.now() / 1000);
