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

    static readonly REGISTER = {
      withSlash: '/portal/login',
      withoutSlash: 'register'
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
    static SESSIONS = {
      withSlash: '/sessions',
      withoutSlash: 'sessions',
    };
    static MediaHub = {
      withSlash: '/media',
      withoutSlash: 'media',
    };;

  }

  export class API {
    static readonly LOGIN = 'portal/login';
    static readonly users = {
      base: 'users',
      get search() {
        return this.base + '/search'
      }
    };
    static readonly CHAT = {
      base: '',
      get groups() {
        return this.base + 'groups';
      },
      get members() {
        return `members/${this.groups}`;
      }
    };

    static readonly SESSIONS = {
      base: 'sessions',
      get deactivate() {
        return this.base + '/deactivate';
      }
    };
  }

}
