import { ENVIRONMENT } from '../../environment/environment';
import { isNotUndefined } from '../../functions/is-not-type-guards';
import { parseJSON } from '../../functions/parse-json';
import { SessionAnkeKey } from '../../redux/session/anke/types';
import { SessionKlageKey } from '../../redux/session/klage/types';
import { AppEventEnum } from './action';
import { formatSessionTime } from './formatters';

interface BaseEvent {
  timestamp: number[]; // Unix timestamp in milliseconds
  session_time: string[]; // Time since start of session.
  route: string; // Current path. /nb/klage/1234/begrunnelse
  count: number; // Number of times this event has been logged.
}

interface NavigationEvent {
  type: 'navigation';
}

interface AppEvent {
  type: 'app';
  action: AppEventEnum;
}

interface ErrorEvent {
  type: 'error';
  error_message: string;
  error_stack?: string;
  component_stack?: string;
}

interface ApiEvent {
  type: 'api';
  message?: string;
  request: string;
}

interface SessionEvent {
  type: 'session';
  action: string;
  key: SessionAnkeKey | SessionKlageKey;
}

type UserEvent = BaseEvent & (NavigationEvent | AppEvent | ErrorEvent | ApiEvent | SessionEvent);

const startTime = Date.now();

interface ErrorReport {
  session_time_ms: number;
  formatted_session_time: string;
  token_expires: number;
  user_events: UserEvent[];
  client_version: string;
}

const SESSION_STORAGE_KEY = 'error-report';

const getErrorReport = (): ErrorReport => {
  const json = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  const savedErrorReport = json === null ? null : parseJSON<ErrorReport>(json);

  if (savedErrorReport !== null && savedErrorReport.client_version === ENVIRONMENT.version) {
    addEvent({ type: 'app', action: AppEventEnum.RESTORE_ERROR_REPORT, ...getBaseEvent() });

    return savedErrorReport;
  }

  return {
    session_time_ms: 0,
    formatted_session_time: '',
    token_expires: 0,
    user_events: [],
    client_version: ENVIRONMENT.version,
  };
};

const errorReport: ErrorReport = getErrorReport();

const save = () => window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(errorReport));

const addEvent = (event: UserEvent) => {
  const existingEvent = errorReport.user_events[errorReport.user_events.length - 1];

  if (existingEvent !== undefined && eventEquality(existingEvent, event)) {
    errorReport.user_events[errorReport.user_events.length - 1] = {
      ...event,
      count: existingEvent.count + 1,
      timestamp: [...existingEvent.timestamp, ...event.timestamp],
      session_time: [...existingEvent.session_time, ...event.session_time],
    };

    return;
  }

  errorReport.user_events = errorReport.user_events.slice(-99);
  errorReport.user_events.push(event);
  save();
};

export const addNavigationEvent = (route: string) => addEvent({ type: 'navigation', ...getBaseEvent(route) });

export const addAppEvent = (action: AppEventEnum) => addEvent({ type: 'app', action, ...getBaseEvent() });

export const addErrorEvent = (error_message: string, error_stack?: string, component_stack?: string) =>
  addEvent({
    type: 'error',
    error_message,
    error_stack,
    component_stack,
    ...getBaseEvent(),
  });

export const addApiEvent = (
  endpoint: string,
  method: string,
  status: number | string = 'NO_STATUS',
  message?: string
) => addEvent({ type: 'api', request: `${method} ${status} ${endpoint}`, message, ...getBaseEvent() });

export const addSessionEvent = (action: string, key: SessionAnkeKey | SessionKlageKey) =>
  addEvent({ type: 'session', key, action, ...getBaseEvent() });

export const setTokenExpires = (tokenExpires: number) => {
  errorReport.token_expires = tokenExpires;
  save();
};

export const sendErrorReport = async () => {
  errorReport.session_time_ms = Date.now() - startTime;
  errorReport.formatted_session_time = formatSessionTime(errorReport.session_time_ms);

  try {
    const res = await fetch('/error-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...errorReport,
        user_events: errorReport.user_events
          .reverse()
          .map((line) => {
            switch (line.type) {
              case 'navigation': {
                return formatEvent(line, 'Navigate to');
              }
              case 'app': {
                return formatEvent(line, line.action);
              }
              case 'error': {
                const stack = [line.error_stack, line.component_stack]
                  .filter(isNotUndefined)
                  .map((s) => `\t${s}`)
                  .join('\n---\n');

                const msg = `Error: ${line.error_message}`;

                return formatEvent(line, msg, `\n${stack}`);
              }
              case 'api': {
                const msg = `${line.request} ${typeof line.message === 'string' ? `- ${line.message}` : ''}`;

                return formatEvent(line, msg);
              }
              default:
                return '';
            }
          })
          .join('\n'),
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to log user events: ${res.status}`);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    } else {
      console.error('Failed to log user events.');
    }
  }
};

const getBaseEvent = (route = window.location.pathname): BaseEvent => {
  const now = Date.now();

  return {
    timestamp: [now],
    session_time: [formatSessionTime(now - startTime)],
    count: 1,
    route,
  };
};

const eventEquality = (a: UserEvent, b: UserEvent) => {
  if (a.type === 'api' && b.type === 'api') {
    return a.request === b.request && a.message === b.message;
  }

  return false;
};

const formatEvent = ({ session_time, timestamp, count, route }: BaseEvent, msg: string, stack = ''): string =>
  `[${formatTime(session_time)} (x${zeroPad(count)})]\t[${route}]\t${msg} (${formatTime(timestamp)})${stack}`;

const formatTime = (times: string[] | number[]): string => {
  const [first] = times;
  const last = times[times.length - 1];

  return [first, last].filter(isNotUndefined).join(' - ');
};

const zeroPad = (num: number) => num.toString(10).padStart(3, '0');
