import { parseJSON } from '../functions/parse-json';
import { formatSessionTime } from './formatters';

interface BaseEvent {
  timestamp: number[]; // Unix timestamp in milliseconds
  sessionTime: string[]; // Time since start of session.
  route: string; // Current path. /nb/klage/1234/begrunnelse
  count: number; // Number of times this event has been logged.
}

interface NavigationEvent {
  type: 'navigation';
}

interface AppEvent {
  type: 'app';
  action: string;
}

interface ErrorEvent {
  type: 'error';
  errorMessage: string;
  errorStack?: string;
  componentStack?: string;
  eventId?: string;
}

interface ApiEvent {
  type: 'api';
  message?: string;
  request: string;
}

type UserEvent = BaseEvent & (NavigationEvent | AppEvent | ErrorEvent | ApiEvent);

const startTime = Date.now();
const userEvents: UserEvent[] = [];

interface ErrorReport {
  sessionTimeMs: number;
  formattedSessionTime: string;
  tokenExpires: number;
  userEvents: UserEvent[];
}

const getErrorReport = (): ErrorReport => {
  const json = window.sessionStorage.getItem('error-report');
  const errorReport = json === null ? null : parseJSON<ErrorReport>(json);

  if (errorReport !== null) {
    return errorReport;
  }

  return {
    sessionTimeMs: 0,
    formattedSessionTime: '',
    tokenExpires: 0,
    userEvents,
  };
};

const data: ErrorReport = getErrorReport();

const save = () => window.sessionStorage.setItem('error-report', JSON.stringify(data));

const addEvent = (event: UserEvent) => {
  const existingEvent = userEvents[userEvents.length - 1];

  if (existingEvent !== undefined && eventEquality(existingEvent, event)) {
    userEvents[userEvents.length - 1] = {
      ...event,
      count: existingEvent.count + 1,
      timestamp: [...existingEvent.timestamp, ...event.timestamp],
      sessionTime: [...existingEvent.sessionTime, ...event.sessionTime],
    };

    return;
  }

  userEvents.push(event);
  save();
};

export const addNavigationEvent = (route: string) => addEvent({ type: 'navigation', ...getBaseEvent(route) });

export const addAppEvent = (action: string) => addEvent({ type: 'app', action, ...getBaseEvent() });

export const addErrorEvent = (errorMessage: string, errorStack?: string, componentStack?: string, eventId?: string) =>
  addEvent({ type: 'error', errorMessage, errorStack, componentStack, eventId, ...getBaseEvent() });

export const addApiEvent = (
  endpoint: string,
  method: string,
  status: number | string = 'NO_STATUS',
  message?: string
) => addEvent({ type: 'api', request: `${method} ${status} ${endpoint}`, message, ...getBaseEvent() });

export const setTokenExpires = (tokenExpires: number) => {
  data.tokenExpires = tokenExpires;
  save();
};

export const sendErrorReport = async () => {
  data.sessionTimeMs = Date.now() - startTime;
  data.formattedSessionTime = formatSessionTime(data.sessionTimeMs);

  try {
    const res = await fetch('/error-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
    sessionTime: [formatSessionTime(now - startTime)],
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
