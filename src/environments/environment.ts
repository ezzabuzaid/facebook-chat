// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpointUrl: 'http://localhost:8080/api/',
  serverOrigin: 'http://localhost:8080',
  firebase: {
    apiKey: 'AIzaSyBZtOQcwlZZYu7IEmuDnS2i_ziyVa2a5bo',
    authDomain: 'chatbase-ebaa0.firebaseapp.com',
    databaseURL: 'https://chatbase-ebaa0.firebaseio.com',
    projectId: 'chatbase-ebaa0',
    storageBucket: 'chatbase-ebaa0.appspot.com',
    messagingSenderId: '483016343062'
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
