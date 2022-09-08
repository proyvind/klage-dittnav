import { formatSessionTime } from './formatters';

describe('formatted session time should be formatted correctly', () => {
  const hours = 46 * 60 * 60 * 1000;
  const minutes = 40 * 60 * 1000;
  const seconds = 30 * 1000;
  const milliseconds = 123;

  it('should pretty format milliseconds', () => {
    expect.assertions(1);
    const formattedSessionTime = formatSessionTime(milliseconds);
    expect(formattedSessionTime).toBe('00:00:00.123');
  });

  it('should pretty format multi-hour session time', () => {
    expect.assertions(1);
    const formattedSessionTime = formatSessionTime(hours + minutes + seconds + milliseconds);
    expect(formattedSessionTime).toBe('46:40:30.123');
  });

  it('should pretty format multi-minute session time', () => {
    expect.assertions(1);
    const formattedSessionTime = formatSessionTime(minutes + seconds + milliseconds);
    expect(formattedSessionTime).toBe('00:40:30.123');
  });

  it('should pretty format multi-second session time', () => {
    expect.assertions(1);
    const formattedSessionTime = formatSessionTime(seconds + milliseconds);
    expect(formattedSessionTime).toBe('00:00:30.123');
  });

  it('should pretty format no-ms session time', () => {
    expect.assertions(1);
    const formattedSessionTime = formatSessionTime(seconds);
    expect(formattedSessionTime).toBe('00:00:30.000');
  });
});
