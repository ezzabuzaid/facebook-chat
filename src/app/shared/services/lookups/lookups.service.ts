import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectOption } from '@partials/form';

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
