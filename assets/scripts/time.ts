export enum TimeBase {
  HOUR = 1000 * 60 * 60,
  MINUTE = 1000 * 60,
  SECOND = 1000
}
export interface FormattedTime {
  hours: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
}

export function getTimeFormatted (time: number): FormattedTime {
  const h = Math.floor(time / TimeBase.HOUR);
  const m = Math.floor((time % TimeBase.HOUR) / TimeBase.MINUTE);
  const s = Math.floor((time % TimeBase.MINUTE) / TimeBase.SECOND);
  const ms = Math.floor(time % TimeBase.SECOND);

  return {
    hours: `${h < 10 ? '0' : ''}${h}`,
    minutes: `${m < 10 ? '0' : ''}${m}`,
    seconds: `${s < 10 ? '0' : ''}${s}`,
    milliseconds: `${ms < 100 ? (ms < 10 ? '00' : '0') : ''}${ms}`,
  }
}
