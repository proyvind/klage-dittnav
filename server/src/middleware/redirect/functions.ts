import { getCookie } from '@app/functions/get-cookie';
import { Request, Response } from '@app/types/http';

const EXPIRED = new Date(0);

export const deleteRedirectedCookie = (res: Response) =>
  res.cookie('redirected_from', '', { maxAge: 0, expires: EXPIRED, httpOnly: true, sameSite: 'strict' });

export const getRedirectedFrom = (req: Request): string | undefined => getCookie(req, 'redirected_from');

export const getHasSaksnummer = (req: Request) => (getSaksnummer(req) !== null ? 'true' : 'false');

export const removeSaksnummer = (url: string | undefined) => {
  if (url === undefined) {
    return undefined;
  }
  const [path, query] = url.split('?');

  if (query === undefined) {
    return path;
  }

  const params = query.split('&');
  const filtered = params.filter((param) => !param.startsWith('saksnummer='));

  if (filtered.length === 0) {
    return path;
  }

  return `${path}?${filtered.join('&')}`;
};

export const getSaksnummer = (req: Request): string | null => getQueryParam(req, 'saksnummer');

const getQueryParam = (req: Request, param: string) => {
  const queryParam = req.query[param];

  if (typeof queryParam === 'string' && queryParam.length !== 0) {
    return encodeURIComponent(queryParam);
  }

  if (Array.isArray(queryParam)) {
    const [first] = queryParam;

    if (typeof first === 'string' && first.length !== 0) {
      return encodeURIComponent(first);
    }
  }

  return null;
};

export const getReferrer = (req: Request) => req.header('referer') ?? 'UNKNOWN';
