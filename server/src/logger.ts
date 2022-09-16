import { performance } from 'perf_hooks';
import { RequestHandler } from 'express';

const VERSION = process.env.VERSION ?? 'unknown';

const LOGGERS: Map<string, Logger> = new Map();

type SerializableValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[]
  | null
  | null[]
  | undefined
  | undefined[];

export interface AnyObject {
  [key: string]: SerializableValue;
}

type LogArgs =
  | {
      msg?: string;
      error: Error | unknown;
      data?: SerializableValue | AnyObject;
    }
  | {
      msg: string;
      error?: Error | unknown;
      data?: SerializableValue | AnyObject;
    };

interface Logger {
  debug: (args: LogArgs) => void;
  info: (args: LogArgs) => void;
  warn: (args: LogArgs) => void;
  error: (args: LogArgs) => void;
}

interface Log extends AnyObject {
  '@timestamp': string;
  version: string;
  module: string;
  message?: string;
  stacktrace?: string;
}

type Level = 'debug' | 'info' | 'warn' | 'error';

export const getLogger = (module: string): Logger => {
  const cachedLogger = LOGGERS.get(module);

  if (typeof cachedLogger !== 'undefined') {
    return cachedLogger;
  }

  const logger: Logger = {
    debug: (args) => console.debug(getLog(module, 'debug', args)),
    info: (args) => console.info(getLog(module, 'info', args)),
    warn: (args) => console.warn(getLog(module, 'warn', args)),
    error: (args) => console.warn(getLog(module, 'error', args)),
  };

  LOGGERS.set(module, logger);

  return logger;
};

const getLog = (module: string, level: Level, { msg, error, data }: LogArgs) => {
  const log: Log = {
    level,
    '@timestamp': new Date().toISOString(),
    version: VERSION,
    module,
  };

  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      log.data = JSON.stringify(data, null, 2);
    } else {
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value !== 'object' && value !== null) {
          log[key] = value;
        } else {
          log[key] = JSON.stringify(value, null, 2);
        }
      });
    }
  } else {
    log.data = data;
  }

  if (error instanceof Error) {
    log.stacktrace = error.stack;
    log.message = typeof msg === 'string' ? `${msg} - ${error.name}: ${error.message}` : error.message;
  } else {
    log.message = msg;
  }

  return JSON.stringify(log);
};

const httpLogger = getLogger('http');

export const httpLoggingMiddleware: RequestHandler = (req, res, next) => {
  const start = performance.now();

  res.once('finish', () => {
    const { method, url } = req;

    if (url.endsWith('/isAlive') || url.endsWith('/isReady')) {
      return;
    }

    const { statusCode } = res;

    const responseTime = Math.round(performance.now() - start);

    logHttpRequest({
      method,
      url,
      statusCode,
      responseTime,
    });
  });

  next();
};

interface HttpData extends AnyObject {
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
}

const logHttpRequest = (data: HttpData) => {
  const msg = `${data.statusCode} ${data.method} ${data.url}`;

  if (data.statusCode >= 500) {
    httpLogger.error({ msg, data });

    return;
  }

  if (data.statusCode >= 400) {
    httpLogger.warn({ msg, data });
  }
};
