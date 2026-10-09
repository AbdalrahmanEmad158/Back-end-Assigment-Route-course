export function toMs(time, unit) {
  switch (unit) {
    case 's':
      return time * 1000;
    case 'm':
      return time * 60 * 1000;
    case 'h':
      return time * 60 * 60 * 1000;
    default:
      return time;
  }
}

export function toSecounds(time, unit) {
  switch (unit) {
    case 'ms':
      return time / 1000;
       case 'm':
      return time *60;
    case 'h':
      return time * 60 * 60;
      case 'd':
      return time * 60 * 60 * 24;
    default:
      return time;
  }
}