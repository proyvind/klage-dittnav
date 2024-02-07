import { redirectMiddleware } from '@app/middleware/redirect/redirect';
import { Request, Response } from '@app/types/http';

const NON_REDIRECT_URLS = [
  '/nb/klage/DAGPENGER',
  '/nb/klage/DAGPENGER/begrunnelse',
  '/nb/klage/DAGPENGER/oppsummering',
  '/nb/klage/DAGPENGER/innsending',
  '/nb/klage/123/begrunnelse',
  '/nb/klage/123/oppsummering',
  '/nb/klage/123/innsending',
  '/nb/klage/123/kvittering',
  '/nb/anke/DAGPENGER',
  '/nb/anke/DAGPENGER/begrunnelse',
  '/nb/anke/DAGPENGER/oppsummering',
  '/nb/anke/DAGPENGER/innsending',
  '/nb/anke/123/begrunnelse',
  '/nb/anke/123/oppsummering',
  '/nb/anke/123/innsending',
  '/nb/anke/123/kvittering',
  '/nb/ettersendelse/DAGPENGER',
];

const INTERNAL_REDIRECT_URLS: [string, string][] = [
  ['/nb/klage/123', '/nb/klage/123/begrunnelse'],
  ['/nb/anke/123', '/nb/anke/123/begrunnelse'],
  ['/nb/klage/uinnlogget/DAGPENGER', '/nb/klage/DAGPENGER'],
  ['/nb/klage/uinnlogget/DAGPENGER/begrunnelse', '/nb/klage/DAGPENGER/begrunnelse'],
  ['/nb/klage/ny/SYKEPENGER', '/nb/klage/SYKEPENGER'],
  ['/nb/klage/ny/DAGPENGER', '/nb/klage/DAGPENGER'],
  ['/nb/klage/ny/DAGPENGER/begrunnelse', '/nb/klage/DAGPENGER/begrunnelse'],
  ['/nb/anke/uinnlogget/DAGPENGER', '/nb/anke/DAGPENGER'],
  ['/nb/anke/uinnlogget/DAGPENGER/begrunnelse', '/nb/anke/DAGPENGER/begrunnelse'],
  ['/nb/anke/ny/DAGPENGER', '/nb/anke/DAGPENGER'],
  ['/nb/anke/ny/DAGPENGER/begrunnelse', '/nb/anke/DAGPENGER/begrunnelse'],
  ['/nb/ettersendelse/uinnlogget/DAGPENGER', '/nb/ettersendelse/DAGPENGER'],
  ['/nb/ettersendelse/ny/DAGPENGER', '/nb/ettersendelse/DAGPENGER'],
  ['/nb/klage/ny/DAGPENGER?saksnummer=123', '/nb/klage/DAGPENGER?saksnummer=123'],
];

const EXTERNAL_REDIRECT_URLS = [
  '/',
  '/nb',
  '/nb/ny',
  '/nb/klage',
  '/nb/anke',
  '/nb/klage/uinnlogget',
  '/nb/klage/ny',
  '/nb/anke/uinnlogget',
  '/nb/anke/ny',
  '/nb/ettersendelse/uinnlogget',
  '/nb/ettersendelse/ny',
];

describe('redirect', () => {
  it('should not redirect other methods than GET', () => {
    expect.assertions(3);

    const url = '/nb/klage/ny';
    const req: Request = createRequest(url, 'POST');
    const res: Response = { redirect: jest.fn(), cookie: jest.fn() };
    const next = jest.fn();

    redirectMiddleware(req, res, next);

    expect(res.redirect).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  it.each(NON_REDIRECT_URLS)('should not redirect %s', (url) => {
    expect.assertions(3);
    noRedirect(url);
  });

  it.each(INTERNAL_REDIRECT_URLS)('should redirect %s to %s', (from, to) => {
    expect.assertions(3);
    internalRedirect(from, to);
  });

  it.each(EXTERNAL_REDIRECT_URLS)('should redirect %s to external page', (url) => {
    expect.assertions(3);
    externalRedirect(url);
  });
});

const internalRedirect = (from: string, to: string) => {
  const req: Request = createRequest(from, 'GET');
  const res: Response = { redirect: jest.fn(), cookie: jest.fn() };
  const next = jest.fn();

  redirectMiddleware(req, res, next);

  expect(res.redirect).toHaveBeenCalledWith(301, to);
  expect(res.cookie).toHaveBeenCalledWith('redirected_from', from, { httpOnly: true, sameSite: 'strict' });
  expect(next).not.toHaveBeenCalledWith();
};

const externalRedirect = (from: string) => {
  const req: Request = createRequest(from, 'GET');
  const res: Response = { redirect: jest.fn(), cookie: jest.fn() };
  const next = jest.fn();

  redirectMiddleware(req, res, next);

  expect(res.redirect).toHaveBeenCalledWith(301, 'https://www.ekstern.dev.nav.no/klage');
  expect(res.cookie).toHaveBeenCalledWith('redirected_from', '', {
    expires: new Date(0),
    httpOnly: true,
    maxAge: 0,
    sameSite: 'strict',
  });
  expect(next).not.toHaveBeenCalled();
};

const noRedirect = (url: string) => {
  const req: Request = createRequest(url, 'GET');
  const res: Response = { redirect: jest.fn(), cookie: jest.fn() };
  const next = jest.fn();

  redirectMiddleware(req, res, next);

  expect(res.redirect).not.toHaveBeenCalledWith();
  expect(res.cookie).toHaveBeenCalledWith('redirected_from', '', {
    expires: new Date(0),
    httpOnly: true,
    maxAge: 0,
    sameSite: 'strict',
  });
  expect(next).toHaveBeenCalledWith();
};

const createRequest = (url: string, method: string): Request => {
  const [pathname, search] = url.split('?');

  if (pathname === undefined) {
    throw new Error(`Could not split url ${url} into pathname and search.`);
  }

  return {
    url,
    path: pathname,
    method,
    query: search === undefined ? {} : parseQueryParams(search),
    header: () => undefined,
  };
};

const parseQueryParams = (search: string): Record<string, string | string[]> => {
  const parts = search.split('&');

  const result: Record<string, string | string[]> = {};

  for (const s of parts) {
    const [key, value] = s.split('=');

    if (key === undefined || value === undefined) {
      continue;
    }

    result[key] = value;
  }

  return result;
};
