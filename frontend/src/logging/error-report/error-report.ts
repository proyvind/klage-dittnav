import { ENVIRONMENT } from '@app/environment/environment';
import { isNotUndefined } from '@app/functions/is-not-type-guards';
import { parseJSON } from '@app/functions/parse-json';
import { AppEventEnum } from './action';
import { formatEvent, formatSessionTime } from './formatters';
import { BaseEvent, IErrorReport, UserEvent } from './types';

const startTime = Date.now();

const SESSION_STORAGE_KEY = 'error-report';

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

  if (a.type === 'session' && b.type === 'session') {
    return a.action === b.action;
  }

  return false;
};

class ErrorReport {
  private resumeErrorReport = (): boolean => {
    const json = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    const savedErrorReport = json === null ? null : parseJSON<IErrorReport>(json);

    if (savedErrorReport !== null && savedErrorReport.client_version === ENVIRONMENT.version) {
      this.errorReport = savedErrorReport;

      return true;
    }

    return false;
  };

  private errorReport: IErrorReport = {
    session_time_ms: 0,
    formatted_session_time: '',
    token_expires: 0,
    user_events: [],
    client_version: ENVIRONMENT.version,
  };

  constructor() {
    if (this.resumeErrorReport()) {
      this.addEvent({ type: 'restore-error-report', referrer: document.referrer, ...getBaseEvent() });
    }
  }

  public addNavigationEvent = (route: string) => this.addEvent({ type: 'navigation', ...getBaseEvent(route) });

  public addAppEvent = (action: AppEventEnum) => this.addEvent({ type: 'app', action, ...getBaseEvent() });

  public addErrorEvent = (error_message: string, error_stack?: string) =>
    this.addEvent({
      type: 'error',
      error_message,
      error_stack,
      ...getBaseEvent(),
    });

  public addApiEvent = (endpoint: string, method: string, status: number | string = 'NO_STATUS', message?: string) =>
    this.addEvent({ type: 'api', request: `${method} ${status} ${endpoint}`, message, ...getBaseEvent() });

  public addSessionEvent = (action: string) => this.addEvent({ type: 'session', action, ...getBaseEvent() });

  public setTokenExpires = (tokenExpires: number) => {
    this.errorReport.token_expires = tokenExpires;
    this.save();
  };

  public sendErrorReport = async () => {
    this.errorReport.session_time_ms = Date.now() - startTime;
    this.errorReport.formatted_session_time = formatSessionTime(this.errorReport.session_time_ms);

    const maxRouteLength = this.maxRouteLength();
    const maxCount = this.maxCount();

    try {
      const res = await fetch('/error-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...this.errorReport,
          user_events: this.errorReport.user_events
            .reverse()
            .map((line) => {
              switch (line.type) {
                case 'navigation': {
                  return formatEvent({ ...line, msg: 'Navigate to' }, { maxRouteLength, maxCount });
                }
                case 'app': {
                  return formatEvent({ ...line, msg: line.action }, { maxRouteLength, maxCount });
                }
                case 'error': {
                  const stack = [line.error_stack, line.component_stack]
                    .filter(isNotUndefined)
                    .map((s) => `\t${s}`)
                    .join('\n---\n');

                  const msg = `Error: ${line.error_message}`;

                  return formatEvent({ ...line, stack, msg }, { maxRouteLength, maxCount });
                }
                case 'api': {
                  const msg = `${line.request} ${typeof line.message === 'string' ? `- ${line.message}` : ''}`;

                  return formatEvent({ ...line, msg }, { maxRouteLength, maxCount });
                }
                case 'session': {
                  return formatEvent({ ...line, msg: line.action }, { maxRouteLength, maxCount });
                }
                case 'restore-error-report': {
                  const msg = `Restored. Referrer: "${line.referrer}".`;

                  return formatEvent({ ...line, msg }, { maxRouteLength, maxCount });
                }
              }

              return '';
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

  private maxRouteLength = (): number => Math.max(...this.errorReport.user_events.map((e) => e.route.length));

  private maxCount = (): number => Math.max(...this.errorReport.user_events.map((e) => e.count));

  private save = () => window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(this.errorReport));

  private addEvent = (event: UserEvent) => {
    const existingEvent = this.errorReport.user_events[this.errorReport.user_events.length - 1];

    if (existingEvent !== undefined && eventEquality(existingEvent, event)) {
      this.errorReport.user_events[this.errorReport.user_events.length - 1] = {
        ...event,
        count: existingEvent.count + 1,
        timestamp: [...existingEvent.timestamp, ...event.timestamp],
        session_time: [...existingEvent.session_time, ...event.session_time],
      };

      return;
    }

    this.errorReport.user_events = this.errorReport.user_events
      .slice(-99)
      .sort(({ timestamp: [a = 0] }, { timestamp: [b = 0] }) => a - b)
      .concat(event);

    this.save();
  };
}

export const {
  addApiEvent,
  addAppEvent,
  addErrorEvent,
  addNavigationEvent,
  addSessionEvent,
  sendErrorReport,
  setTokenExpires,
} = new ErrorReport();
