import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

export type Request = Pick<ExpressRequest, 'path' | 'method' | 'url' | 'query' | 'headers' | 'header'>;

export type Response = Pick<ExpressResponse, 'redirect' | 'cookie' | 'locals'>;
