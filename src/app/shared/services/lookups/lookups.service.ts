import { HttpClient } from '@angular/common/http';
import { SelectOption } from '@shared/common';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LookupsService {

    constructor(
        private http: HttpClient
    ) { }

    getNationalities() {
        return this.http
            .configure({ LOCAL_CACHE: true })
            .get<SelectOption[]>('lookups/nationalities');
    }
}
