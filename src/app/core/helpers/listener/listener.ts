import { BehaviorSubject } from 'rxjs';

export class Listener<T> {
    protected state: BehaviorSubject<T> = null;
    constructor(defaultValue: T = null) {
        this.state = new BehaviorSubject<T>(defaultValue);
    }

    listen() {
        return this.state.asObservable();
    }

    notify(value: T) {
        this.state.next(value);
    }

}
