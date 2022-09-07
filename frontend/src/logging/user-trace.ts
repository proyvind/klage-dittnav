interface BaseEvent {
  timestamp: number; // Unix timestamp in milliseconds
  path: string; // Current path. /nb/klage/1234/begrunnelse
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
  endpoint: string;
  status: number;
  method: string;
}

type UserEvent = BaseEvent & (NavigationEvent | AppEvent | ErrorEvent | ApiEvent);

const startTime = Date.now();
const userEvents: UserEvent[] = [];

const data = {
  sessionTimeSeconds: 0,
  formattedSessionTime: '',
  tokenExpires: 0,
  userEvents,
};

const addEvent = (event: UserEvent) => {
  const lastEvent = userEvents[userEvents.length - 1];

  if (lastEvent !== undefined && eventEquality(lastEvent, event)) {
    userEvents[userEvents.length - 1] = event;

    return;
  }

  userEvents.push(event);
};

export const addNavigationEvent = (path: string) => addEvent({ type: 'navigation', ...getBaseEvent(path) });

export const addAppEvent = (action: string) => addEvent({ type: 'app', action, ...getBaseEvent() });

export const addErrorEvent = (errorMessage: string, errorStack?: string, componentStack?: string, eventId?: string) =>
  addEvent({ type: 'error', errorMessage, errorStack, componentStack, eventId, ...getBaseEvent() });

export const addApiEvent = (endpoint: string, method: string, status: number, message?: string) =>
  addEvent({ type: 'api', endpoint, status, method, message, ...getBaseEvent() });

export const setTokenExpires = (tokenExpires: number) => {
  data.tokenExpires = tokenExpires;
};

export const logAllUserEvents = async () => {
  data.sessionTimeSeconds = Math.round((Date.now() - startTime) / 1000);
  data.formattedSessionTime = formatSessionTime(data.sessionTimeSeconds);

  try {
    const res = await fetch('/internal/error-report', {
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

const getBaseEvent = (path = window.location.pathname): BaseEvent => ({
  timestamp: Date.now(),
  path,
});

const eventEquality = (a: UserEvent, b: UserEvent) => {
  if (a.type === 'api' && b.type === 'api') {
    return a.endpoint === b.endpoint && a.method === b.method && a.status === b.status && a.message === b.message;
  }

  return false;
};

const formatSessionTime = (sessionTimeSeconds: number): string => {
  const hours = Math.floor(sessionTimeSeconds / 3600);
  const minutes = Math.floor((sessionTimeSeconds - hours * 3600) / 60);
  const seconds = sessionTimeSeconds - hours * 3600 - minutes * 60;

  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');

  return `${h}h ${m}m ${s}s`;
};
