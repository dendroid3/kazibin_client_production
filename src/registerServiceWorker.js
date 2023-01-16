/* eslint-disable no-console */

import { register } from 'register-service-worker';

// if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n'
        + 'For more details, visit https://goo.gl/AFskqB',
      );
      askForPermmision()
    },
    registered() {
      console.log('Service worker has been registered.');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated() {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
// }

const askForPermmision = () => {
  Notification.requestPermission((status) => {
    if(status === 'denied'){
      if(confirm('For real man! You do not want to be notified in realtime? Press OK to grant permmision, cancel to forget about it.')){
        askForPermmisionAgain()
      }
    }
  })
}

const askForPermmisionAgain = () => {
  Notification.requestPermission((status) => {
    console.log(status)
  })
}
