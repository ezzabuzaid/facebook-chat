import { HttpInterceptor, HttpHeaders } from '@angular/common/http';

declare module '@angular/common/http/http' {

    // Augment HttpClient with the added configuration methods from HttpService, to allow in-place replacement of
    // HttpClient with HttpService using dependency injection
    export interface HttpClient {
        /**
         * Configure request object.
         * @return The new instance.
         */
        configure(obj: Partial<CustomHeaders>): HttpClient;

    }

}

export interface ISetupInterceptor extends HttpInterceptor {
    configure: (obj: CustomHeaders) => void;
}

export interface ModifiableInterceptor {
    name: string;
}
export enum ECustomHeaders {
    DEFAULT_URL = 'DEFAULT_URL',
    SNACKBAR = 'SNACKBAR',
    LOCAL_CACHE = 'LOCAL_CACHE',
    CACHE_CATEGORY = 'CACHE_CATEGORY',
    FULL_RESPONSE = 'FULL_RESPONSE',
    FORM_PROGRESS = 'FORM_PROGRESS',
}
export class CustomHeaders {
    [ECustomHeaders.DEFAULT_URL] = true;
    [ECustomHeaders.SNACKBAR] = true;
    [ECustomHeaders.LOCAL_CACHE] = false;
    [ECustomHeaders.FULL_RESPONSE] = false;
    [ECustomHeaders.FORM_PROGRESS] = false;
    [ECustomHeaders.CACHE_CATEGORY] = 'local_cache';
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
}

export function getHeader<T = boolean>(headers: HttpHeaders, name: ECustomHeaders): T {
    return JSON.parse(headers.get(name));
}
