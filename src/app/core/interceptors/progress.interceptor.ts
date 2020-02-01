import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { MatSnackBarRef, MatSnackBar } from '@angular/material';
import { ECustomHeaders, getHeader, HttpMethod } from '../http/http.model';
import { FormWidgetManager } from '@partials/form';
import { ProgressBarManager } from '@widget/progress-bar';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
    private showSnackbar = true;
    constructor(
        private snackbar: MatSnackBar,
        private formWidgetService: FormWidgetManager,
        private progressBarManager: ProgressBarManager,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showSnackbar = getHeader(req.headers, ECustomHeaders.SNACKBAR) && req.method !== HttpMethod.GET;
        let snackbarRef: MatSnackBarRef<any> = null;

        if (this.showSnackbar) {
            Promise.resolve(null).then(() => snackbarRef = this.snackbar.open('Please wait', '', { duration: 500000 }));
        }

        if (getHeader(req.headers, ECustomHeaders.FORM_PROGRESS_BAR)) {
            this.formWidgetService.notify(true);
        }

        if (getHeader(req.headers, ECustomHeaders.PROGRESS_BAR)) {
            this.progressBarManager.notify(true);
        }

        return next.handle(req.clone())
            .pipe(
                tap(
                    (response) => {
                        if (this.showSnackbar) {
                            let text = 'Updated';
                            if (req.method === 'POST') {
                                text = 'Created';
                            }
                            this.snackbar.open(text);
                        }

                    },
                    (error) => {
                        if (error.message) {
                            this.snackbar.open(error.message);
                        }
                    }),
                finalize(() => {
                    if (snackbarRef) {
                        setTimeout(() => {
                            snackbarRef.dismiss();
                        }, 500);
                    }

                    this.progressBarManager.notify(false);
                    this.formWidgetService.notify(false);
                }),
            );
    }
}
