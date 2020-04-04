import { Injectable } from '@angular/core';
import { Listener } from '@core/helpers/listener';
import { Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
import { AppUtils } from '@core/helpers/utils';
import { RouteUtility } from '@shared/common';
import { MediaModel } from '@shared/models';

@Injectable()
export class MediaHubManager extends Listener<any> {
    subscription = new Subject();
    uploadListener = new Listener();
    constructor(
        private routeUtility: RouteUtility,
        private router: Router
    ) {
        super();
    }

    onFolderChange() {
        return this.routeUtility.onQueryParamChange('folder');
    }

    onSearch() {
        return merge(
            this.routeUtility.onQueryParamChange('file').pipe(filter(AppUtils.isTruthy)),
            this.onFolderChange().pipe(filter(AppUtils.isTruthy))
        )
            .pipe(
                map(() => ({
                    fileName: this.getFileName(),
                    folder: this.getFolderID(),
                    tag: this.getTagID()
                })));
    }

    search(query: MediaModel.FileSearchQuery) {
        const defaultQuery = query || new MediaModel.FileSearchQuery(
            this.getFileName(),
            this.getFolderID(),
            this.getTagID()
        );
        return this.router.navigate(['.'], {
            relativeTo: this.routeUtility.route,
            queryParams: {
                folder: defaultQuery.folder,
                file: defaultQuery.file,
                tag: defaultQuery.tag
            }
        })
    }

    getFolderID() {
        return this.routeUtility.getQueryParam('folder');
    }

    getFileName() {
        return this.routeUtility.getQueryParam('file') || undefined;
    }

    getTagID() {
        return this.routeUtility.getQueryParam('tag') || undefined;
    }

}

export enum MediaHubViews {
    ListView,
    GridView
}
