import { isNotUndefined } from '../../functions/is-not-type-guards';
import { BaseEvent } from './types';

export const formatSessionTime = (sessionTimeMs: number): string => {
  const hours = Math.floor(sessionTimeMs / 1000 / 60 / 60);
  const minutes = Math.floor((sessionTimeMs / 1000 / 60) % 60);
  const seconds = Math.floor((sessionTimeMs / 1000) % 60);
  const milliseconds = Math.floor(sessionTimeMs % 1000);

  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');
  const ms = milliseconds.toString().padStart(3, '0');

  return `${h}:${m}:${s}.${ms}`;
};

interface LogEvent extends BaseEvent {
  msg: string;
  stack?: string;
}

interface ColumnOptions {
  maxRouteLength: number;
  maxCount: number;
}

export const formatEvent = (
  { session_time, timestamp, count, route, msg, stack }: LogEvent,
  { maxRouteLength, maxCount }: ColumnOptions
): string => {
  const time = formatTime(session_time);
  const formattedRoute = formatRoute(route, maxRouteLength);
  const epochTime = formatTime(timestamp);
  const formattedCount = formatCount(count, maxCount);
  const formattedStack = formatStack(stack);

  return `${time} ${formattedRoute} ${formattedCount} ${msg} ${epochTime}${formattedStack}`;
};

const formatTime = (times: string[] | number[]): string => {
  const [first] = times;
  const last = times[times.length - 1];

  return `[${[first, last].filter(isNotUndefined).join(' - ')}]`;
};

const formatStack = (stack?: string): string => (typeof stack === 'string' ? `\n${stack}` : '');

const formatCount = (count: number, maxCount: number): string =>
  `${count.toString().padStart(maxCount.toString().length, ' ')}x`;

const formatRoute = (route: string, lineLength: number): string => `[${route}]`.padEnd(lineLength + 2, ' ');
