import { Observable, of, EMPTY, throwError, Observer, Subject, OperatorFunction } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
export class AppUtils {

    public static isEmptyString(value: string): boolean {
        return typeof value !== 'string' || value === '';
    }

    static isObjectEmpty(obj: object) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    /**
     * check if all values inside an object is a falsy type,
     * NOTE: no deep check
     * @param object 
     */
    static isAllObjectKeysEmpty(object: { [key: string]: any }) {
        for (const key in object) {
            if (object[key] === undefined || object[key] === '') {
                return true;
            }
        }
        return false;
    }

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

    static generate<T>(length: number, callback: (index: number) => T) {
        const foo = [];
        for (let i = 0; i <= length; i++) {
            foo.push(callback(i));
        }
        return foo;
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

    static flattenArray(data: any[]) {
        return data.reduce((a, b) => a.concat(b), []);
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

    static unsubscribe(subscription: Subject<any>) {
        subscription.next();
        subscription.complete();
    }

    static preventBubblingAndCapturing(event: Event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
    }

    static debounce(func: () => void, wait: number, immediate = false) {
        let timeout: any;

        return function executedFunction() {
            const later = () => {
                timeout = null;
                if (!immediate) {
                    func.apply(this, arguments);
                }
            };

            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(this, arguments);
            }
        };
    }

    static cloneObject<T>(target: T, source: Partial<T> = {}): T {
        const clone = JSON.parse(JSON.stringify(target));
        return Object.assign(clone, source);
    }

    static mapEnumToValueAnd(enumObject: object): { title: string, value: any }[] {
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

    /**
     * merge and return unique list from two lists
     * @param concatTo
     * @param filterFrom 
     * @param key to filter upon
     */
    static mergeListOfObjects<T>(concatTo: Partial<T>[], filterFrom: Partial<T>[], key: keyof T) {
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
     * @param list check if the list has at least an item
     */
    static hasItemWithin(list: any[]) {
        return Array.isArray(list) && !!list.length;
    }

    /**
     * convert an object with key:value to query param string
     * null and undefined values will be omited
     * @param obj
     */
    static convertObjectToQueryParams(obj: any) {
        return Object.keys(obj)
            .reduce((acc, curr, index, thisArray) => {
                if (AppUtils.isNullorUndefined(obj[curr])) {
                    return acc;
                }
                const lastIndex = thisArray.length - 1 === index;
                return acc += `${curr}=${obj[curr]}${lastIndex ? '' : '&'}`;
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
     * remove null and undefined properties from an object expect empty string
     * @param withEmptyString to indicate of the empty values should be removed
     */
    static excludeEmptyKeys(object: object, withEmptyString = false) {
        const replaceUndefinedOrNull = (key: string, value: any) => {
            if (withEmptyString) {
                return this.isEmptyString(value) || this.isNullorUndefined(value)
                    ? undefined
                    : value;
            } else {
                return this.isNullorUndefined(value) ? undefined : value;
            }
        };
        return JSON.parse(JSON.stringify(object, replaceUndefinedOrNull));
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

    static replaceTextCharToHTMLentity(text: string) {
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

    static isFalsy(value: any) {
        return !!!value;
    }

    static isTruthy(value: any) {
        return !!value;
    }

    static isNullorUndefined(value: any) {
        return value === null || value === undefined;
    }

    static equals<T>(...values: T[]) {
        return values.every((value, i, arr) => JSON.stringify(value) === JSON.stringify(arr[0]));
    }

    static notEquals<T>(...values: T[]) {
        return !this.equals(...values);
    }

    public static notNullOrUndefined(value: any) {
        return AppUtils.isFalsy(AppUtils.isNullorUndefined(value));
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
    observable: () => Observable<T> | Promise<T>,
    defaultValue: T = null
) {
    if (condition) {
        return observable();
    }
    return of(defaultValue);
}

export type PickAttr<T, P extends keyof T> = T[P];
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface KeyPairs<T> {
    [key: string]: T;
}

export function typeaheadOperator<T, Q>(
    provider: (query: Q) => Observable<T>,
    onEmpty: () => Partial<T> = null
): OperatorFunction<Q, T> {
    return (source) => {
        return source.pipe(
            filter(AppUtils.notNullOrUndefined),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap((value) => {
                if (AppUtils.notNullOrUndefined(onEmpty) && AppUtils.isEmptyString(value)) {
                    return of<T>(onEmpty() as any);
                }
                return provider(value);
            })
        );
    };
}

