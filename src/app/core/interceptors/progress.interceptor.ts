import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { MatSnackBarRef, MatSnackBar } from '@angular/material';
import { CustomHttpHeaders } from '../http/http.model';
import { FormWidgetManager } from '@partials/form';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
    showSnackbar = true;
    formUi = false;
    constructor(
        private snackbar: MatSnackBar,
        private formWidgetService: FormWidgetManager
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // TODO add a progress bar on top of `toolbar`

        if (JSON.parse(req.headers.get(CustomHttpHeaders.DISABLE_SNACKBAR))) {
            this.showSnackbar = false;
        }

        if (JSON.parse(req.headers.get(CustomHttpHeaders.ENABLE_FORM_UI))) {
            this.formUi = true;
            this.formWidgetService.notify(true);
        }

        const method = req.method;
        let snackbarRef: MatSnackBarRef<any> = null;
        if (this.showSnackbar && (method === 'POST' || method === 'PUT' || method === 'DELETE')) {
            Promise.resolve(null).then(() => snackbarRef = this.snackbar.open('Please wait', '', { duration: 500000 }));
        }
        return next.handle(req.clone())
            .pipe(
                tap(
                    event => {
                        if (event instanceof HttpResponse) {
                            //   this.message = event.body.message;
                        }
                    },
                    event => {
                        if (event.errorMessages) {
                            this.snackbar.open(event.errorMessages[0]);
                        }
                        if (event instanceof HttpErrorResponse) {
                            // TODO show `errorMessages` instead
                        }
                    }),
                finalize(() => {
                    if (snackbarRef) {
                        setTimeout(() => {
                            snackbarRef.dismiss();
                        }, 500);
                    }

                    if (JSON.parse(req.headers.get(CustomHttpHeaders.ENABLE_FORM_TOAST))) {
                        let text = 'Updated';
                        if (req.method === 'POST') {
                            text = 'Created';
                        }
                        this.snackbar.open(text);
                    }

                    if (this.formUi) {
                        this.formWidgetService.notify(false);
                        this.formUi = false;
                    }
                }),
            );
    }
}
