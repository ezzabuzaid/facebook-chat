import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare module '@angular/common/http/http' {

    // Augment HttpClient with the added configuration methods from HttpService, to allow in-place replacement of
    // HttpClient with HttpService using dependency injection
    export interface HttpClient {
        /**
         * Configure request object.
         * @return The new instance.
         */
        configure(obj: Partial<RequestOptions>): HttpClient;

    }

}

export interface ISetupInterceptor extends HttpInterceptor {
    /**
     * Pass the data to setup interceptor in order to pass it along with the request
     */
    configure: (data: RequestOptions) => void;
}

export interface ModifiableInterceptor {
    name: string;
}

export class RequestOptions {
    /**
     * Weather if the request should prefixed the request url with the default
     */
    DEFAULT_URL = true;
    /**
     * Weather to show response message in a snackbar
     */
    SNACKBAR = true;
    /**
     * Indicates if the progress bar should be shown for the request latency
     */
    PROGRESS_BAR = true;
    /**
     * Special progress to show when using form container
     * 
     * FYI, the progress bae will be shown in all form container in the same view although the another form didn't ask to
     */
    FORM_PROGRESS_BAR = true;
    /**
     * Returns the whole resoponse
     * 
     * the default is to return only the data property from the reponse
     */
    FULL_RESPONSE = false;
    /**
     * Enable saving the request response in web storage
     */
    LOCAL_CACHE = false;
    /**
     * Name of the object store that will be used to save the response
     * @requires LOCAL_CACHE to be true
     */
    CACHE_CATEGORY = 'local_cache';
}

@Injectable({
    providedIn: 'root'
})
export class RequestData {
    private states = new WeakMap<HttpRequest<any>, Partial<RequestOptions>>();

    get<T = boolean>(request: HttpRequest<any>, property: keyof RequestOptions) {
        return this.states.get(request)[property] as unknown as T;
    }

    set(request: HttpRequest<any>, data: Partial<RequestOptions>) {
        this.states.set(request, data);
        return this;
    }

    delete(request: HttpRequest<any>) {
        this.states.delete(request);
        return this;
    }
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
}
