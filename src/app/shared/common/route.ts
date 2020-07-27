import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Constants } from '@core/constants';
import { distinctUntilKeyChanged, pluck, share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RouteUtility {

    constructor(
        public route: ActivatedRoute
    ) { }

    onQueryParamChange(param: string) {
        return this.route.queryParams
            .pipe(
                distinctUntilKeyChanged(param),
                pluck<Params, string>(param),
                share()
            );
    }

    getQueryParam(param: string) {
        return this.route.snapshot.queryParamMap.get(param);
    }

    redirectUrl() {
        return this.route.snapshot.queryParamMap.get(Constants.Application.REDIRECT_URL);
    }

}
