import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ISetupInterceptor, ModifiableInterceptor, RequestOptions, RequestData } from '../http/http.model';
import { map, finalize } from 'rxjs/operators';
import { AppUtils } from '@core/helpers/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { Connectivity } from '@shared/common';

@Injectable()
export class SetupInterceptor implements ISetupInterceptor, ModifiableInterceptor {
    public name = SetupInterceptor.name;
    private dataForNextRequest: Partial<RequestOptions> = new RequestOptions();

    constructor(
        private snackbar: MatSnackBar,
        @Inject(PLATFORM_ID) private platformId: any,
        private connectivity: Connectivity,
        private requestData: RequestData
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requestData.set(request, this.dataForNextRequest);
        this.configure(new RequestOptions());


        if (isPlatformBrowser(this.platformId)) {
            if (this.connectivity.isOffline) {
                this.snackbar.open('The internet connection is not active, please check your connection');
                return of();
            }
        } else {
            return of();
        }

        return next.handle(request)
            .pipe(
                map((response: HttpResponse<any>) => {
                    const fullResponse = this.requestData.get(request, 'FULL_RESPONSE');
                    const defaultUrl = this.requestData.get(request, 'DEFAULT_URL');
                    if (response instanceof HttpResponse && defaultUrl && AppUtils.not(fullResponse)) {
                        return response.clone({ body: response.body.data });
                    }
                    return response;
                }),
                finalize(() => {
                    this.requestData.delete(request);
                })
            );
    }

    configure(obj: Partial<RequestOptions>) {
        this.dataForNextRequest = obj;
    }

}
