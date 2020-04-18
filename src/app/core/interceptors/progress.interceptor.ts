import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';
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
        if (this.showSnackbar) {
            Promise.resolve(null).then(() => this.snackbar.open('Please wait', '', { duration: 500000 }));
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
                        if (response instanceof HttpResponse && this.showSnackbar) {
                            let text = 'Updated';
                            if (req.method === 'POST') {
                                text = 'Created';
                            }
                            this.snackbar.open(text);
                        }
                    },
                    (error) => {
                        if (error instanceof HttpErrorResponse && error.error) {
                            this.snackbar.open(error.error.message);
                        }
                    }),
                finalize(() => {
                    this.progressBarManager.notify(false);
                    this.formWidgetService.notify(false);
                }),
            );
    }
}
