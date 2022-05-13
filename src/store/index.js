import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

//package to store data in local storage and cookies. 
//vuex store data will be stored in local storgae save for the authentication token which will be in cookies
import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth'
import ui from './modules/ui'
import taskAddition from './modules/task/addition'
import taskFetch from './modules/task/fetch'
import writersFetch from './modules/liaison/writers'
import LiaisonRequest from './modules/liaison/request'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    ui,
    taskAddition,
    taskFetch,
    LiaisonRequest,
    writersFetch
  },
  plugins: [

    createPersistedState({
      key:'AUTH',
      paths:['auth']
    }),
    createPersistedState({
      key:'UI',
      paths:['UI']
    }),
    createPersistedState({
      key:'LiaisonRequest',
      paths:['LiaisonRequest']
    }),
    createPersistedState({
      key:'taskAddition',
      paths:['taskAddition']
    }),
    createPersistedState({
      key:'taskFetch',
      paths:['taskFetch']
    }),
    createPersistedState({
      key:'writersFetch',
      paths:['writersFetch']
    }),
    createPersistedState({
      key: 'KAZIBIN_TOKEN',
      paths: ['auth.token'],
      //save token in cookies
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
        removeItem: key => Cookies.remove(key)
      }
  }),
  ]
});
