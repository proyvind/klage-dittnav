import { Request } from 'express';

export const getCookie = (name: string, req: Request): string | null => {
  const cookies = req.headers.cookie?.split(';');

  if (typeof cookies === 'undefined' || cookies.length === 0) {
    return null;
  }

  const cookie = cookies.find((c) => c.startsWith(`${name}=`));

  if (typeof cookie === 'undefined') {
    return null;
  }

  const parts = cookie.split('=');

  if (parts.length !== 2) {
    return null;
  }

  return parts[1] ?? null;
};
