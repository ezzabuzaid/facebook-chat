export class ApplicationHelpers {
  static readonly LANGUAGE_KEY = 'language';
  static readonly LOGIN_PATH = 'portal/login';
  static readonly TOKEN_KEY = 'token';
  static readonly APPLICATION_NAME = 'buildozer';
}

export enum CustomHttpHeaders {
  DISABLE_DEFAULT_URL = 'disableDefaultUrl',
  USE_LOCAL_CACHE = 'localCache',
  DISABLE_SNACKBAR = 'disableSnackbar',
  ENABLE_FORM_UI = 'enableFormUi'
}

export type MutateRequest = { [T in CustomHttpHeaders]?: boolean };
