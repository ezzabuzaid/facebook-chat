import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CustomHeaders } from '@core/http';
import { Listener } from '@core/helpers/listener';

export interface IRepoEvent<T> {
    type: 'CREATE' | 'UPDATE' | 'DELETE' | 'INITIAL';
    value: T;
}

/**
 * This class is responsiple to proivde a data with the minmal amount of code,
 * just extend it and override any method according to your needs, rarely you'll do this,
 * NOTE: please avoid do any abstract over this class
 */
export class Repo<T> extends Listener<IRepoEvent<T>> {
    constructor(
        protected http: HttpClient,
        initialValue: T
    ) {
        super({ type: 'INITIAL', value: initialValue });
    }

    protected getOne(URI: string) {
        return this.http.get<T>(URI);
    }

    protected getAll(URI: string) {
        return this.http.get<T[]>(URI);
    }

    protected add(URI: string, payload: T, configure: Partial<CustomHeaders> = {}) {
        return this.configure(configure)
            .post<T>(URI, payload)
            .pipe(tap(data => {
                this.notify({ type: 'CREATE', value: data });
            }));
    }

    private configure(configure: Partial<CustomHeaders>) {
        return this.http.configure(configure);
    }

    protected update(URI: string, payload: Partial<T>) {
        return this.http.put<T>(URI, payload)
            .pipe(tap(data => {
                this.notify({ type: 'UPDATE', value: data });
            }));
    }

    protected delete(URI: string, id: string) {
        return this.http.delete<T>(`${URI}/${id}`)
            .pipe(tap(data => {
                this.notify({ type: 'DELETE', value: data });
            }));
    }

}

