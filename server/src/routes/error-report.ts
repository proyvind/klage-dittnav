import { Request, Router, json } from 'express';
import { AnyObject, getLogger } from '@app/logger';

const router = Router();

const log = getLogger('frontend-error-reporter');

export const errorReporter = () => {
  router.post('/error-report', json(), (req: Request<never, never, AnyObject>, res) => {
    log.warn({ msg: 'Error report', data: req.body });
    res.status(200).send();
  });

  return router;
};
