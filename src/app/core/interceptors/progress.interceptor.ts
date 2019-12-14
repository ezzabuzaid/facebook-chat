import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { MatSnackBarRef, MatSnackBar } from '@angular/material';
import { ECustomHeaders, getHeader, HttpMethod } from '../http/http.model';
import { FormWidgetManager } from '@partials/form';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
    showSnackbar = true;
    formPorgress = false;
    constructor(
        private snackbar: MatSnackBar,
        private formWidgetService: FormWidgetManager
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // TODO add a progress bar on top of `toolbar`
        this.showSnackbar = getHeader(req.headers, ECustomHeaders.SNACKBAR) && req.method !== HttpMethod.GET;
        let snackbarRef: MatSnackBarRef<any> = null;

        if (getHeader(req.headers, ECustomHeaders.FORM_PROGRESS)) {
            this.formPorgress = true;
            this.formWidgetService.notify(true);
        }

        if (this.showSnackbar) {
            Promise.resolve(null).then(() => snackbarRef = this.snackbar.open('Please wait', '', { duration: 500000 }));
        }
        return next.handle(req.clone())
            .pipe(
                tap(
                    event => { },
                    event => {
                        if (event.message) {
                            this.snackbar.open(event.message);
                        }
                    }),
                finalize(() => {
                    if (snackbarRef) {
                        setTimeout(() => {
                            snackbarRef.dismiss();
                        }, 500);
                    }

                    if (this.showSnackbar) {
                        let text = 'Updated';
                        if (req.method === 'POST') {
                            text = 'Created';
                        }
                        this.snackbar.open(text);
                    }

                    if (this.formPorgress) {
                        this.formWidgetService.notify(false);
                        this.formPorgress = false;
                    }
                }),
            );
    }
}
