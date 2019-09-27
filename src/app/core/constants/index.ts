export namespace Constants {
  export class Application {
    static readonly TOKEN_KEY = 'token';
    static readonly APPLICATION_NAME = 'Mallak';
    static readonly LANGUAGE_KEY = 'language';
  }

  export class Routing {
    static readonly LOGIN = '/portal/login';
    static readonly ADMINS = '/admins';
    static readonly Users = '/users';

    // FIXME NOT_IMPLEMENTED
    static readonly SERVER_ERROR = 'error500';
    static readonly NOT_FOUND = 'error404';
    static readonly FOEBIDDEN = 'error403';
  }

  export class API {  }

}
