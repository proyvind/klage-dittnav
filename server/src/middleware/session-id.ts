import crypto from 'crypto';
import { getCookie } from '@app/functions/get-cookie';
import { Request, Response } from '@app/types/http';

export const sessionIdMiddleware = (req: Request, res: Response, next: () => void) => {
  const sessionId = getCookie(req, 'session-id');

  if (sessionId === undefined) {
    const newSessionId = crypto.randomUUID();
    res.cookie('session-id', newSessionId, { httpOnly: true, sameSite: 'strict' });
    req.sessionId = newSessionId;

    return next();
  }

  req.sessionId = sessionId;

  return next();
};
