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
import taskChat from './modules/task/chat'
import writersFetch from './modules/liaison/writers'
import brokersFetch from './modules/liaison/brokers'
import LiaisonRequest from './modules/liaison/request'
import Logs from './modules/Logs/logs'
import LiaisonRequestMessages from './modules/liaison/requestmessages'
import TaskOffers from './modules/offer/offers'
import Bids from './modules/bid/bids'
import Invoices from './modules/transaction/invoices'
import Profile from './modules/profile/profile'
import Sockets from './modules/sockets/sockets'
import Search from './modules/search/search'
import Transactions from './modules/transaction/transactions'
import Statistics from './modules/statistics/statistics'
import Verification from './modules/verification/verifications'
import Download from './modules/download'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    ui,
    taskAddition,
    taskFetch,
    LiaisonRequest,
    writersFetch,
    taskChat,
    Logs,
    LiaisonRequestMessages,
    brokersFetch,
    TaskOffers,
    Bids,
    Invoices,
    Profile,
    Sockets,
    Search,
    Transactions,
    Statistics,
    Verification,
    Download
  },
  plugins: [

    createPersistedState({
      key:'AUTH',
      paths:['auth']
    }),
    createPersistedState({
      key:'Transactions',
      paths:['Transactions']
    }),
    createPersistedState({
      key:'Statistics',
      paths:['Statistics']
    }),
    createPersistedState({
      key:'Sockets',
      paths:['Sockets']
    }),
    createPersistedState({
      key:'Search',
      paths:['Search']
    }),
    createPersistedState({
      key:'Invoices',
      paths:['Invoices']
    }),
    createPersistedState({
      key:'Profile',
      paths:['Profile']
    }),
    createPersistedState({
      key:'Bids',
      paths:['Bids']
    }),
    createPersistedState({
      key:'UI',
      paths:['ui']
    }),
    createPersistedState({
      key:'taskChat',
      paths:['taskChat']
    }),
    createPersistedState({
      key:'TaskOffers',
      paths:['TaskOffers']
    }),
    createPersistedState({
      key:'Logs',
      paths:['Logs']
    }),
    createPersistedState({
      key:'LiaisonRequest',
      paths:['LiaisonRequest']
    }),
    createPersistedState({
      key:'LiaisonRequestMessages',
      paths:['LiaisonRequestMessages']
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
      key:'brokersFetch',
      paths:['brokersFetch']
    }),
    createPersistedState({
      key:'Verification',
      paths:['Verification']
    }),
    createPersistedState({
      key: 'KAZIBIN_TOKEN',
      paths: ['auth.token'],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3000, secure: false }),
        removeItem: key => Cookies.remove(key)
      }
  }),
  ]
});
