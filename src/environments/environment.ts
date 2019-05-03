// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'https://dev.creditspring.com.au',
  firebase: {
    apiKey: "AIzaSyBGahPzmjm99Kuteg279Q-GfJA4bfyBqOw",
    authDomain: "credit-spring.firebaseapp.com",
    databaseURL: "https://csapp-232404.firebaseio.com",
    projectId: "credit-spring",
    storageBucket: "credit-spring.appspot.com",
    messagingSenderId: "362179339793"
  },
  google_app_id: '362179339793-fjrgetqn7b0lji0e3rnd95ebaujddco4.apps.googleusercontent.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
