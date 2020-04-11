import { BehaviorSubject, Subject } from 'rxjs';
import { AppUtils } from '../utils';
import { tap } from 'rxjs/operators';

export class Listener<T> {
    public value = null;
    protected state: Subject<T> = null;
    constructor(defaultValue: T = null) {
        if (AppUtils.isNullorUndefined(defaultValue)) {
            this.state = new Subject<T>();
        } else {
            this.state = new BehaviorSubject<T>(defaultValue);
            this.value = defaultValue;
        }
    }

    public listen() {
        return this.state.asObservable()
            .pipe(tap(data => {
                this.value = data;
            }));
    }

    public notify(value: T) {
        this.state.next(value as any);
    }

    public dispose() {
        this.state.next();
        this.state.complete();
    }

}
