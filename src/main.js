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
  
  auth: {
      headers: {
          Authorization: 'Bearer ' + store.state.auth.token,
          Accept: "application/json",
      },
  },

  // production setting
  authEndpoint : process.env.VUE_APP_API + 'broadcasting/auth',
  enabledTransports: ['ws', 'wss'],
  encrypted: false,
  forceTLS: true,
  disableStats: true,
  wsHost: 'api.app.kazibin.com',
  wsPort: '',
  wssHost: 'api.app.kazibin.com',
  wssPort: '',

  //local setting
  // wsHost: '127.0.0.1',
  // wsPort: '6001',
  // enabledTransports: ['ws'],
  // authEndpoint : 'http://127.0.0.1:8000/api/broadcasting/auth',
  // disableStats: false,
  // forceTLS: false,

});


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
