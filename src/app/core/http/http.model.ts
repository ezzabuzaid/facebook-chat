import { HttpInterceptor } from '@angular/common/http';

// HttpClient is declared in a re-exported module, so we have to extend the original module to make it work properly
// (see https://github.com/Microsoft/TypeScript/issues/13897)
declare module '@angular/common/http/http' {

    // Augment HttpClient with the added configuration methods from HttpService, to allow in-place replacement of
    // HttpClient with HttpService using dependency injection
    export interface HttpClient {
        /**
         * Configure request object.
         * @return The new instance.
         */
        configure(obj: MutateRequest): HttpClient;

    }

}


export interface ISetupInterceptor extends HttpInterceptor {
    configure: (obj: MutateRequest) => void;
}

export interface ModifiableInterceptor {
    name: string;
}

export enum CustomHttpHeaders {
    DISABLE_DEFAULT_URL = 'disableDefaultUrl',
    USE_LOCAL_CACHE = 'localCache',
    DISABLE_SNACKBAR = 'disableSnackbar',
    ENABLE_FORM_UI = 'enableFormUi',
    ENABLE_FORM_TOAST = 'enableFormToast',
    RETURN_FULL_BODY = 'full_body'
}

export type MutateRequest = { [T in CustomHttpHeaders]?: boolean };
