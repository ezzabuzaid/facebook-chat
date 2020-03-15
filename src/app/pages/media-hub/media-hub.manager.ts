import { Injectable, Host } from '@angular/core';
import { Listener } from '@core/helpers/listener';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { pluck, filter, distinctUntilKeyChanged, map } from 'rxjs/operators';
import { AppUtils } from '@core/helpers/utils';

@Injectable()
export class MediaHubManager extends Listener<any> {

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        super(null);
    }

    onQueryParamChange(param: string) {
        return this.route.queryParams
            .pipe(
                distinctUntilKeyChanged(param),
                pluck<Params, string>(param),
                filter<string>(AppUtils.isTruthy)
            );
    }

    onFolderChange() {
        return this.onQueryParamChange('folder_id');
    }

    onSearch() {
        return this.onQueryParamChange('file')
            .pipe(map((file) => ({
                fileName: file,
                folder_id: this.getCurrentFolderID()
            })));
    }

    search({ file, folder_id = this.getCurrentFolderID() }) {
        return this.router.navigate(['.'], {
            relativeTo: this.route,
            queryParams: {
                folder_id,
                file
            }
        })
    }

    getCurrentFolderID() {
        return this.getQueryParam('folder_id');
    }


    getQueryParam(param: string) {
        return this.route.snapshot.queryParamMap.get(param);
    }

}