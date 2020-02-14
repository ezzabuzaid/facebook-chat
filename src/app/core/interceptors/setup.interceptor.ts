import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ISetupInterceptor, ModifiableInterceptor, CustomHeaders, getHeader, ECustomHeaders } from '../http/http.model';
import { map, switchMap } from 'rxjs/operators';
import { AppUtils } from '@core/helpers/utils';
// import { connectivity } from '@shared/common';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Injectable()
export class SetupInterceptor implements ISetupInterceptor, ModifiableInterceptor {
    public name = SetupInterceptor.name;
    private defaultSetting = new CustomHeaders();

    constructor(
        private snackbar: MatSnackBar
    ) {
        this.configure(this.defaultSetting);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = this.setCustomHeaders(req.headers);
        this.configure(this.defaultSetting);

        // if (AppUtils.isFalsy(connectivity.isOnline)) {
        //     this.snackbar.open('The internet connection is not active, please check your connection');
        //     return of();
        // }

        return next.handle(req.clone({ headers }))
            .pipe(
                map(
                    (response: HttpResponse<any>) => {
                        const notFullResponse = AppUtils.isFalsy(getHeader(headers, ECustomHeaders.FULL_RESPONSE));
                        const defaultUrl = getHeader(headers, ECustomHeaders.DEFAULT_URL);

                        if (response instanceof HttpResponse && defaultUrl && notFullResponse) {
                            return response.clone({ body: response.body.data });
                        }
                        return response;
                    })
            );
    }

    configure(obj: Partial<CustomHeaders>) {
        Object.assign(this, obj);
    }

    setCustomHeaders(headers) {
        // tslint:disable-next-line: forin
        for (const header in (new CustomHeaders())) {
            headers = headers.set(header, String(this[header]));
        }
        return headers;
    }
}
