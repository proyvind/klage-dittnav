import express, { Request } from 'express';
import { AnyObject, getLogger } from '../logger';

const router = express.Router();

const log = getLogger('frontend-error-reporter');

export const errorReporter = () => {
  router.post('/error-report', express.json(), (req: Request<never, never, AnyObject>, res) => {
    log.warn({ msg: 'Error report', data: req.body });
    res.status(200).send();
  });

  return router;
};
