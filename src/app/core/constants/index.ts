export namespace Constants {
  export class Application {
    static readonly TOKEN_KEY = 'token';
    static readonly APPLICATION_NAME = 'Angular Buildozer';
    static readonly LANGUAGE_KEY = 'language';
    static REFRESH_TOKEN_KEY = 'refresh_token';
  }

  export class Routing {
    static readonly LOGIN = {
      withSlash: '/portal/login',
      withoutSlash: 'login'
    };
    static readonly Users = {
      withSlash: '/users',
      withoutSlash: 'users'
    };
    static readonly Todos = {
      withSlash: '/todos',
      withoutSlash: 'todos'
    };
    static readonly NOT_FOUND = {
      withSlash: '/404',
      withoutSlash: '404'
    };
    static HOME = {
      withSlash: '/home',
      withoutSlash: 'home',
    };
    static Portal = {
      withSlash: '/portal',
      withoutSlash: 'portal',
    };

    // FIXME NOT_IMPLEMENTED
    static readonly SERVER_ERROR = 'error500';
    static readonly FOEBIDDEN = 'error403';
  }

  export class API {
    static readonly LOGIN = '/portal/login';
  }

}
