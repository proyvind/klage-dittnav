import { CookieOptions } from 'express';

export interface Request {
  readonly path: string;
  readonly method: string;
  readonly url: string;
  readonly query: Record<string, string | string[]>;
  readonly header: (name: string) => string | undefined;
  sessionId?: string;
}

export interface Response {
  readonly redirect: (status: number, path: string) => void;
  readonly cookie: (name: string, value: string, options: CookieOptions) => void;
}
