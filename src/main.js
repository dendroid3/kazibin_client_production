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
  wsHost: 'api.kazibin.adilirealestate.com',
  authEndpoint : 'https://api.kazibin.adilirealestate.com/api/broadcasting/auth',
  wsPort: 6003,
  forceTLS: true,
  disableStats: true,
  auth: {
      headers: {
          Authorization: 'Bearer ' + store.state.auth.token,
          Accept: "application/json",
      },
  },
  encrypted: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
