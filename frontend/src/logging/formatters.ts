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
