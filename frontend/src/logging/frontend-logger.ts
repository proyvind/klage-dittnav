import {
  DEFAULT_FRONTENDLOGGER_API_URL,
  createFrontendLogger,
  createMockFrontendLogger,
  setUpErrorReporting,
} from '@navikt/frontendlogger';

const IS_LOCALHOST = window.location.hostname === 'localhost';

export const logger = (IS_LOCALHOST ? createMockFrontendLogger : createFrontendLogger)(
  'klage-dittnav',
  DEFAULT_FRONTENDLOGGER_API_URL
);

setUpErrorReporting(logger);
