import axios from "axios";

const state = {
  view: {},
  my_brokers: null,
  all_brokers: null,
  broker_pagination_details: null
}

const getters = {
  getViewBroker: (state) => (state.view),
  getMyBrokers: (state) => (state.my_brokers),
  getAllBrokers: (state) => (state.all_brokers),
  getBrokerPaginationDetails: (state) => (state.broker_pagination_details)
}

const actions = {
  setViewBroker({commit}, broker){
    commit('SET_VIEW_BROKER', broker)
  },

  async fetchMyBrokers({commit, dispatch}){
    try{
      const response =  await
      axios.get('/liaison/get_my_brokers')
      commit('SET_MY_BROKERS', response.data.brokers)
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyBrokers'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchMyBrokers'}, {root: true})
      }
    }
  },
  
  async fetchAllBrokers({commit}, data){
    try{
      const response =  await
      axios.post('/liaison/get_all_brokers', data)
      commit('SET_ALL_BROKERS', response.data.brokers)
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAllBrokers'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchAllBrokers'}, {root: true})
      }
    }
  }, 

  async fetchAllBrokersPaginated({commit, dispatch}, data){
    try{
      let page_url = data.link ? data.link :'/task/get_all_brokers_paginated'
      console.log('response')

      const response =  await
      axios.post(page_url, data)
      console.log(response)
      commit('SET_ALL_BROKERS', response.data.data)
      commit('SET_BROKERS_PAGINATION_DETAILS', response.data)

    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAllBrokersPaginated'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchAllBrokersPaginated'}, {root: true})
      }
    }
  },
}

const mutations = {
  SET_VIEW_BROKER: (state, broker) => (state.view = broker),
  SET_MY_BROKERS: (state, brokers) => (state.my_brokers = brokers),
  SET_ALL_BROKERS: (state, brokers) => (state.all_brokers = brokers),
  SET_BROKERS_PAGINATION_DETAILS: (state, broker_pagination_details) => (
    state.broker_pagination_details = broker_pagination_details
  )

}

export default {
  state,
  getters,
  actions,
  mutations
}
