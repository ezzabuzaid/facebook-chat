export namespace Constants {
  export class Application {
    static readonly TOKEN_KEY = 'token';
    static readonly APPLICATION_NAME = 'Mallak';
    static readonly LANGUAGE_KEY = 'language';
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


    // FIXME NOT_IMPLEMENTED
    static readonly SERVER_ERROR = 'error500';
    static readonly NOT_FOUND = 'error404';
    static readonly FOEBIDDEN = 'error403';
  }

  export class API { }

}
