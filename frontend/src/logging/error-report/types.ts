import { AppEventEnum } from './action';

export interface IErrorReport {
  session_time_ms: number;
  formatted_session_time: string;
  token_expires: number;
  user_events: UserEvent[];
  client_version: string;
}

export interface BaseEvent {
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
}

interface RestoreErrorReportEvent {
  type: 'restore-error-report';
  referrer: string;
}

export type UserEvent = BaseEvent &
  (NavigationEvent | AppEvent | ErrorEvent | ApiEvent | SessionEvent | RestoreErrorReportEvent);
