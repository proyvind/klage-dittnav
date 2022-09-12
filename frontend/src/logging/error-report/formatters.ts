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

export const formatEvent = ({ session_time, timestamp, count, route }: BaseEvent, msg: string, stack = ''): string =>
  `[${formatTime(session_time)} (x${zeroPad(count)})]\t[${route}]\t${msg} (${formatTime(timestamp)})${stack}`;

const formatTime = (times: string[] | number[]): string => {
  const [first] = times;
  const last = times[times.length - 1];

  return [first, last].filter(isNotUndefined).join(' - ');
};

const zeroPad = (num: number) => num.toString(10).padStart(3, '0');
