import { ENVIRONMENT } from '../../environment/environment';
import { parseJSON } from '../../functions/parse-json';
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
  event_id?: string;
}

interface ApiEvent {
  type: 'api';
  message?: string;
  request: string;
}

type UserEvent = BaseEvent & (NavigationEvent | AppEvent | ErrorEvent | ApiEvent);

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

  errorReport.user_events.push(event);
  save();
};

export const addNavigationEvent = (route: string) => addEvent({ type: 'navigation', ...getBaseEvent(route) });

export const addAppEvent = (action: AppEventEnum) => addEvent({ type: 'app', action, ...getBaseEvent() });

export const addErrorEvent = (
  error_message: string,
  error_stack?: string,
  component_stack?: string,
  event_id?: string
) =>
  addEvent({
    type: 'error',
    error_message,
    error_stack,
    component_stack,
    event_id,
    ...getBaseEvent(),
  });

export const addApiEvent = (
  endpoint: string,
  method: string,
  status: number | string = 'NO_STATUS',
  message?: string
) => addEvent({ type: 'api', request: `${method} ${status} ${endpoint}`, message, ...getBaseEvent() });

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
      body: JSON.stringify(errorReport),
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
