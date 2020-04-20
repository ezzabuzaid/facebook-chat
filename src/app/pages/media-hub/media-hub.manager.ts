import { Injectable } from '@angular/core';
import { Listener } from '@core/helpers/listener';
import { Router } from '@angular/router';
import { map, filter, takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
import { AppUtils, typeaheadOperator } from '@core/helpers/utils';
import { RouteUtility } from '@shared/common';
import { MediaModel } from '@shared/models';
import { MediaPickerComponent } from './media-picker/media-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { MediaLightboxComponent, ILightBoxData } from './media-lightbox/media-lightbox.component';

@Injectable({
    providedIn: 'root'
})
export class MediaHubManager {

    subscription = new Subject();
    uploadListener = new Listener<MediaModel.File>();

    constructor(
        private routeUtility: RouteUtility,
        private router: Router,
        private dialog: MatDialog
    ) { }

    onFolderChange() {
        return this.routeUtility.onQueryParamChange('folder');
    }

    onSearch() {
        return merge(
            this.routeUtility.onQueryParamChange('file').pipe(filter(AppUtils.isTruthy)),
            this.onFolderChange().pipe(filter(AppUtils.isTruthy))
        )
            .pipe(
                takeUntil(this.subscription),
                map(() => ({
                    fileName: this.getFileName(),
                    folder: this.getFolderID(),
                    tag: this.getTagID()
                })),
                typeaheadOperator()
            )
    }

    search(query: MediaModel.FileSearchQuery) {
        const defaultQuery = query || new MediaModel.FileSearchQuery(
            this.getFileName(),
            this.getFolderID(),
            this.getTagID()
        );
        return this.router.navigate(['.'], {
            relativeTo: this.routeUtility.route,
            queryParamsHandling: 'merge',
            queryParams: {
                folder: defaultQuery.folder,
                file: defaultQuery.file,
                tag: defaultQuery.tag
            }
        })
    }

    /**
     * Get selected folder id
     */
    getFolderID() {
        return this.routeUtility.getQueryParam('folder');
    }

    getFileName() {
        return this.routeUtility.getQueryParam('file') || undefined;
    }

    getTagID() {
        return this.routeUtility.getQueryParam('tag') || undefined;
    }

    openMediaPicker() {
        return this.dialog.open<MediaPickerComponent, any, MediaModel.File[]>(MediaPickerComponent, {
            width: '1000px',
            height: '750px',
            panelClass: ['media-dialog']
        })
    }

    openLightbox(data: ILightBoxData) {
        this.dialog.open(MediaLightboxComponent, {
            width: '100vw',
            height: '100vh',
            panelClass: ['media-dialog'],
            data: data
        })
    }
}

export enum MediaHubViews {
    ListView,
    GridView
}
