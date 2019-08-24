export namespace Constants {
  export class Application {
    static readonly LANGUAGE_KEY = 'language';
    static readonly TOKEN_KEY = 'token';
    static readonly APPLICATION_NAME = 'Angular buildozer';
  }
  export class Routing {
    static readonly LOGIN = 'portal/login';
    static readonly register = 'portal/register';
    static readonly SERVER_ERROR = 'error500';
    static readonly NOT_FOUND = 'error404';
    static readonly FOEBIDDEN = 'error403';
  }

}
export enum CustomHttpHeaders {
  DISABLE_DEFAULT_URL = 'disableDefaultUrl',
  USE_LOCAL_CACHE = 'localCache',
  DISABLE_SNACKBAR = 'disableSnackbar',
  ENABLE_FORM_UI = 'enableFormUi'
}

export type MutateRequest = { [T in CustomHttpHeaders]?: boolean };
