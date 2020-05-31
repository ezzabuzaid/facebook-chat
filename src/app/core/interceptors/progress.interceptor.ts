import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormWidgetManager } from '@partials/form';
import { ProgressBarManager } from '@widget/progress-bar';
import { IRequestOptions } from '@shared/common';
import { RequestOptions } from '@ezzabuzaid/ngx-request-options';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
    private showSnackbar = true;
    constructor(
        private snackbar: MatSnackBar,
        private formWidgetManager: FormWidgetManager,
        private progressBarManager: ProgressBarManager,
        private requestOptions: RequestOptions<IRequestOptions>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showSnackbar = this.requestOptions.get(request, 'SNACKBAR') && request.method !== 'GET';
        if (this.showSnackbar) {
            Promise.resolve(null).then(() => this.snackbar.open('Please wait', '', { duration: 500000 }));
        }

        this.formWidgetManager.notify(this.requestOptions.get(request, 'FORM_PROGRESS_BAR'));
        this.progressBarManager.notify(this.requestOptions.get(request, 'PROGRESS_BAR'));

        return next.handle(request)
            .pipe(
                tap(
                    (response) => {
                        if (response instanceof HttpResponse && this.showSnackbar) {
                            const { message = null } = response.body;
                            if (message) {
                                this.snackbar.open(message);
                            }
                        }
                    },
                    (error) => {
                        if (error instanceof HttpErrorResponse && error.error) {
                            this.snackbar.open(error.error.message);
                        }
                    }),
                finalize(() => {
                    this.progressBarManager.notify(false);
                    this.formWidgetManager.notify(false);
                }),
            );
    }
}
