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
  
  // wsHost: 'api.kazibin.adilirealestate.com',
  // authEndpoint : 'https://api.kazibin.adilirealestate.com/api/broadcasting/auth',
  
  wsHost: '127.0.0.1',
  wsPort: '6001',
  authEndpoint : 'http://localhost:8000/api/broadcasting/auth',

  
  forceTLS: false,
  disableStats: false,
  
  auth: {
      headers: {
          Authorization: 'Bearer ' + store.state.auth.token,
          Accept: "application/json",
      },
  },

  enabledTransports: ['ws']
});
// wssPort: '',
// encrypted: true,
// enabledTransports: ['ws', 'wss']


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
