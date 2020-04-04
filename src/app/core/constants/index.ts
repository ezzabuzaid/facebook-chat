export namespace Constants {
  export class Application {
    static readonly TOKEN_KEY = 'token';
    static readonly APPLICATION_NAME = 'Angular Buildozer';
    static readonly LANGUAGE_KEY = 'language';
    static REFRESH_TOKEN_KEY = 'refresh_token';
    static DEVICE_UUID = 'x-device-uuid';
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
    static readonly UPLOADS = {
      base: 'uploads',
      get tags() {
        return this.folders + '/tags';
      },
      get folders() {
        return 'folders'
      },
      get files() {
        return this.folders + '/files'
      },
      get search() {
        return this.base + '/search'
      }
    };

    static readonly PORTAL = {
      base: 'portal',
      get refreshtoken() {
        return this.base + '/refreshtoken'
      },
      get login() {
        return this.base + '/login'
      },
      get logout() {
        return this.base + '/logout'
      }
    };
    static readonly USERS = {
      base: 'users',
      get search() {
        return this.base + '/search'
      }
    };
    static readonly CHAT = {
      base: '',
      get rooms() {
        return this.base + 'rooms';
      },
      get groups() {
        return `${this.base}${this.rooms}/groups`;
      },
      get conversation() {
        return `${this.base}${this.rooms}/conversations`;
      },
      get messages() {
        return `${this.base}${this.rooms}/messages`;
      },
      get members() {
        return `${this.rooms}/members`;
      },
    };

    static readonly SESSIONS = {
      base: 'sessions',
      get deactivate() {
        return this.base + '/deactivate';
      }
    };
  }

}
