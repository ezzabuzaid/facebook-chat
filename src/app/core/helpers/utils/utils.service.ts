import { Observable, of, EMPTY, throwError, Observer } from 'rxjs';
export class AppUtils {

    static generateAlphabeticString(stringLength = 5) {
        let randomString = '';
        let randomAscii: number;
        const asciiLow = 65;
        const asciiHigh = 90;
        for (let i = 0; i < stringLength; i++) {
            randomAscii = Math.floor((Math.random() * (asciiHigh - asciiLow)) + asciiLow);
            randomString += String.fromCharCode(randomAscii);
        }
        return randomString;
    }


    static isTrue(value: any) {
        return !!value;
    }

    static readFile(file: File) {
        return new Observable((observer: Observer<string | ArrayBuffer>) => {
            const reader = new FileReader();
            reader.addEventListener('abort', (error) => observer.error(error));
            reader.addEventListener('error', (error) => observer.error(error));
            reader.addEventListener('progress', console.log);
            reader.addEventListener('loadend', (e) => observer.next(reader.result));
            reader.readAsDataURL(file);
        });
    }

    static preventBubblingAndCapturing(event: Event) {
        event.preventDefault();
        event.stopPropagation();
    }

    static equals<T>(...values: T[]) {
        return values.every((val, i, arr) => JSON.stringify(val) === JSON.stringify(arr[0]));
    }

    static mapEnumToValueAnd(enumObject): { title: string, value: any }[] {
        return Object.keys(enumObject)
            .filter(item => isNaN(+item))
            .reduce((acc, curr) => {
                acc.push({ title: curr, value: enumObject[curr] });
                return acc;
            }, []);
    }

    static daysToSeconds(days: number) {
        const d = new Date();
        const a = new Date();
        a.setDate(a.getDate() + days);
        return a.getTime() - d.getTime();
    }

    static isDateElapsed(lastUpdate: number, maxAge: number) {
        return lastUpdate < Date.now() - maxAge;
    }

    static generateRandomString(length: number) {
        let string = '';
        const randomchar = () => {
            const number = Math.floor(Math.random() * 62);
            if (number < 10) {
                return number;
            }
            if (number < 36) {
                return String.fromCharCode(number + 55);
            }
            return String.fromCharCode(number + 61);
        };

        while (string.length < length) {
            string += randomchar();
        }
        return string;
    }

    static prepareQueryParams(obj) {
        return Object.keys(obj).reduce((acc, curr) => {
            if (!obj[curr]) { return acc; }
            return acc += `${curr}=${obj[curr]}&`;
        }, '');
    }

    // NOTE merge and return unique list from two lists
    static mergeList<T>(concatTo: Partial<T>[], filterFrom: Partial<T>[], key: keyof T) {
        return concatTo.concat(filterFrom.filter(one => !concatTo.find(two => two[key] === one[key])));
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

    static strictText(text: string, count: number, insertDots = true) {
        return text.slice(0, count) + (((text.length > count) && insertDots) ? '&hellip;' : '');
    }

    static flatArray(data: any[]) {
        return data.reduce((a, b) => a.concat(b), []);
    }

    /**
     *
     * @param value check if the value is Null or Undeifned
     */
    static isNullorUndefined(value: any) {
        return value === null || value === undefined;
    }

    /**
     *
     * @param list check if the list has at least an item
     */
    static hasItemWithin(list: any[]) {
        return Array.isArray(list) && !!list.length;
    }

    /**
     * convert an object with key:value to query param string
     * all falsy values will be avoided
     */
    static convertObjectToQueryParams(obj) {
        return Object.keys(obj).reduce((acc, curr) => {
            if (this.not(obj[curr])) { return acc; }
            return acc += `${curr}=${obj[curr]}&`;
        }, '');
    }

    /**
     *
     * @param functions Accept array of function to invoke in inverse order,
     *  so that each function will accept tha value from last invoked function as argument
     */
    static compose<T, Y>(...functions: ((arg: T | Y) => T)[]) {
        return (args: T | Y) => functions.reduceRight((acc, fn) => fn(acc), args);
    }
    /**
     *
     * @param functions Accept array of function to invoke in order,
     * so that each function will accept tha value of last invoked function as argument
     */
    static pipe<T, Y>(...functions: ((arg: T | Y) => T)[]) {
        return (args: T | Y) => functions.reduce((acc, fn) => fn(acc), args);
    }


    /**
     * remove all falsy props from an object expect empty string
     * @param withEmptyString to indicate of the empty values should be removed
     */
    static excludeEmptyKeys(fromObject: { [key: string]: string }, withEmptyString = false) {
        function replaceUndefinedOrNull(key: string, value: any) {
            if (withEmptyString) {
                return !value ? undefined : value;
            } else {
                return value !== '' && !value ? undefined : value;
            }
        }
        return JSON.parse(JSON.stringify(fromObject, replaceUndefinedOrNull));
    }

    /**
     * check if all values inside an object is a falsy type,
     * NOTE: no deep check
     */
    static isAllObjectKeysEmpty(object: { [key: string]: any }) {
        for (const key in object) {
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

    static stripText(text: string, count: number, insertDots = true) {
        return text.slice(0, count) + (((text.length > count) && insertDots) ? '&hellip;' : '');
    }

    // TODO: Move this function to independnt widget
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
            '\'': '&#39;',
            '/': '&#x2F;'
        };
        return String(text).replace(/[&<>"'\/]/g, (s) => entityMap[s]);
    }

    static capitalizeFirstLetter(name: string) {
        return name.replace(/^\w/, c => c.toUpperCase());
    }

    static removeLastChar(name: string) {
        return name.substring(name.length - 1, 0);
    }

    /**
     * get the value of inner object
     * @param key one.two
     * @param obj one:{two:'value'}
     */
    static getDottedProperty(key: string, obj: object) {
        return key.split('.').reduce((acc, curr) => (acc || {})[curr], obj);
    }

    /**
     * check if the value is falsy type
     */
    static not(value: any) {
        return !!!value;
    }


}

export function tryOrThrow<T>(cb: (...args: any) => T) {
    try {
        const test = (cb as any)();
        return of(test as ReturnType<typeof cb>);
    } catch (error) {
        return throwError(error);
    }
}

export function tryOrComplete<T>(
    condition: boolean,
    observable: Observable<T> | Promise<T>,
    defaultValue: T = null
) {
    if (condition) {
        return observable;
    }
    return of(defaultValue);
}

export type PickAttr<T, P extends keyof T> = T[P];
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface KeyPairs<T> {
    [key: string]: T;
}
