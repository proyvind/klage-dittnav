import { parse } from 'cookie';
import { Request } from '@app/types/http';

export const getCookie = (req: Request, name: string): string | undefined => {
  const cookieHeader = req.header('cookie');

  if (cookieHeader === undefined) {
    return undefined;
  }

  const cookies = parse(cookieHeader);

  const value = cookies[name];

  if (value === undefined || value.length === 0) {
    return undefined;
  }

  return value;
};
