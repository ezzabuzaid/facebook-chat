import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ISetupInterceptor, ModifiableInterceptor, CustomHeaders, getHeader, ECustomHeaders } from '../http/http.model';
import { map } from 'rxjs/operators';
import { AppUtils } from '@core/helpers/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { connectivity } from '@shared/common';

@Injectable()
export class SetupInterceptor implements ISetupInterceptor, ModifiableInterceptor {
    public name = SetupInterceptor.name;
    private defaultSetting = new CustomHeaders();

    constructor(
        private snackbar: MatSnackBar,
        @Inject(PLATFORM_ID) private platformId: any,
    ) {
        this.configure(this.defaultSetting);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = this.setCustomHeaders(req.headers);
        this.configure(this.defaultSetting);


        if (isPlatformBrowser(this.platformId)) {
            if (AppUtils.isFalsy(connectivity.isOnline)) {
                this.snackbar.open('The internet connection is not active, please check your connection');
                return of();
            }
        } else {
            return of();
        }

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

    setCustomHeaders(headers: HttpHeaders) {
        for (const header in (new CustomHeaders())) {
            headers = headers.set(header, String(this[header]));
        }
        return headers;
    }
}
