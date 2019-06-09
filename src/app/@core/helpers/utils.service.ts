// TODO move the utils file to utils folder and add testing

import { Observable, of, EMPTY } from 'rxjs';
export class AppUtils {

  /**
   *
   * @param time Take a time with diffrent format and seperate it in 5 type { second, minutes, hour, days, weeks }
   */
  static computeElapsedTime(time) {
    const second = Math.floor((Date.now() - new Date(time).getTime()) / 1000);
    const minutes = Math.floor(second / 60);
    const hour = Math.floor(minutes / 60);
    const days = Math.floor(hour / 24);
    const weeks = Math.floor(days / 7);
    return { second, minutes, hour, days, weeks };
  }
  /**
   *
   * @param time Take a time with diffrent format and return the elapsed time relative to the current date
   * @returns observalbe that hold the computed time and the type { second, minutes, hour, days, weeks }
   */
  static dateToPresent(time): Observable<{ time, type }> {
    const elapsed = AppUtils.computeElapsedTime(time);
    const times = Object.keys(elapsed);
    for (let i = times.length - 1; i; i--) {
      const type = times[i];
      const timeType = elapsed[type];
      if (timeType) {
        return of({ time: timeType, type });
      }
    }
    return EMPTY;
  }

  static filterPath(obj, ...allowed) {
    allowed.push('tags', 'page', 'size', 'lastTimeStamp');
    return Object.keys(obj).reduce((acc, curr) => {
      if (!obj[curr] && allowed.indexOf(curr) === -1) { return acc; }
      return acc += `${curr}=${obj[curr]}&`;
    }, '');
  }
  /**
   *
   * @param functions Accept array of function to invoke in inverse order,
   *  so that each function will accept tha value from last invoked function as argument
   */
  static compose(...functions) {
    return (args) => functions.reduceRight((arg, fn) => fn(arg), args);
  }
  /**
   *
   * @param functions Accept array of function to invoke in order,
   * so that each function will accept tha value of last invoked function as argument
   */
  static pipe(...functions) {
    return (args) => functions.reduce((arg, fn) => fn(arg), args);
  }

  // NOTE merge and return unique list from two lists
  static mergeList<T>(concatTo: Partial<T>[], filterFrom: Partial<T>[], key: keyof T) {
    return concatTo.concat(filterFrom.filter(one => !concatTo.find(two => two[key] === one[key])));
  }

  static excludeEmptyKeys(toCheckObject: { [key: string]: string }, withEmptyString = false) {
    function replaceUndefinedOrNull(key: string, value: any) {
      if (withEmptyString) {
        return !value ? undefined : value;
      } else {
        return value !== '' && !value ? undefined : value;
      }
    }
    return JSON.parse(JSON.stringify(toCheckObject, replaceUndefinedOrNull));
  }

  static isAllKeyEmpty(object: { [key: string]: string }) {
    for (const key in object) {
      // NOTE add support for checking objects and arrays
      if (!!object[key]) {
        return false;
      }
    }
    return true;
  }

  static extractDateFromTIME_ZONE(date = new Date()) {
    return new Date(date).toISOString().substr(0, 10);
  }

  static toTimestamp(date = new Date()) {
    return new Date(date).getTime();
  }

  static isEllipsisActivated(element: HTMLElement) {
    const tolerance = 2;
    return element.offsetWidth + tolerance < element.scrollWidth;
  }

  static replaceLineBrecksWithHTMLTag(text: string) {
    return text.replace(/\r?\n/g, '<br />');
  }

  static strictText(text: string, count: number, insertDots = true) {
    return text.slice(0, count) + (((text.length > count) && insertDots) ? '&hellip;' : '');
  }

  static fullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;
    const requestFullScreen =
      docEl.requestFullscreen || docEl['mozRequestFullScreen'] ||
      docEl['webkitRequestFullScreen'] || docEl['msRequestFullscreen'];
    const cancelFullScreen =
      doc.exitFullscreen || doc['mozCancelFullScreen'] ||
      doc['webkitExitFullscreen'] || doc['msExitFullscreen'];
    if (
      !doc.fullscreenElement && !doc['mozFullScreenElement'] &&
      !doc['webkitFullscreenElement'] && !doc['msFullscreenElement']
    ) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  }

  static replaceTextCharToHTMLentity(text) {
    const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      // tslint:disable-next-line:quotemark
      "'": '&#39;',
      '/': '&#x2F;'
    };
    return String(text).replace(/[&<>"'\/]/g, (s) => {
      return entityMap[s];
    });
  }
  static refactorTime(value: string) {
    const timeSwitcher = t => t < 10 ? `0${t}` : t;
    let time = value;
    const timePares = time.split(':');
    let hours: string | number = +(timePares[0]);
    let minutes: string | number = +(timePares[1]);
    let interval = 'PM';
    if (hours >= 13) {
      hours -= 12;
    } else if (hours < 12) {
      interval = 'AM';
    }
    hours = timeSwitcher(hours);
    minutes = timeSwitcher(minutes);
    time = `${hours}:${minutes} ${interval}`;
    return {
      timePares,
      time,
      hours,
      minutes
    };
  }

}
