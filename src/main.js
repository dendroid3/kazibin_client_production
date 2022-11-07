import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');
window.Echo = new Echo({
  broadcaster: 'pusher',
  app_id: 'local',
  key: 'local',
  secret: 'local',
  cluster:'mt1',
  key:'local',
  wsHost: '192.168.0.100',
  authEndpoint : 'http://192.168.0.100:8000/api/broadcasting/auth',
  // authEndpoint : process.env.VUE_APP_API +'broadcasting/auth',
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  auth: {
      headers: {
          Authorization: 'Bearer ' + store.state.auth.token,
          Accept: "application/json",
      },
  },
  encrypted: false
});


import VueGeoLocation from 'vue-browser-geolocation'
Vue.use(VueGeoLocation)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB3Kv-kQ2RrmK6qoycuJS-L3F1-M7WJUUk'
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
