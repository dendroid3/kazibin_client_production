import axios from "axios";
import router from "../../../router";

const state = {
  view: {},
  my_brokers: null,
  all_brokers: null,
  broker_pagination_details: null,
  my_broker: {},
  my_broker_details: {},
  my_broker_tasks_pagination_details: {},
  my_broker_invoices: {},
  my_broker_invoices_pagination_details: {},
  my_broker_offers: {},
  my_broker_bids: {},
  my_broker_bids_pagination_details: {},

}

const getters = {
  getViewBroker: (state) => (state.view),
  getMyBrokers: (state) => (state.my_brokers),
  getAllBrokers: (state) => (state.all_brokers),
  getBrokerPaginationDetails: (state) => (state.broker_pagination_details),
  getViewMyBroker: (state) => (state.my_broker),
  getMyBrokerTasksPaginationDetails: (state) => (state.my_broker_tasks_pagination_details),
  getViewMyBrokerDetails: (state) => (state.my_broker_details),
  getViewMyBrokerInvoices: (state) => (state.my_broker_invoices),
  getMyBrokerInvoicesPaginationDetails: (state) => (state.my_broker_invoices_pagination_details),
  getViewMyBrokerOffers: (state) => (state.my_broker_offers),
  getViewMyBrokerBids: (state) => (state.my_broker_bids),
  getMyBrokerBidsPaginationDetails: (state) => (state.my_broker_bids_pagination_details),

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
      let page_url = data.link ? data.link :'/liaison/get_all_brokers_paginated'

      const response =  await
      axios.post(page_url, data)
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

  async fetchOneBroker({dispatch}, data){
    try{
      const response =  await
      axios.post('/get_one_broker', data)
      dispatch('setViewBroker', response.data.broker, {root: true})
      router.push('/Broker/' + data.code)
      return true
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchOneBroker'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchOneBroker'}, {root: true})
      }
    }
  },

  setViewMyBrokerDetails({commit}, broker){
    commit('SET_VIEW_MY_BROKER_DETAILS', broker)
  },

  async fetchMyBroker({commit,dispatch}, network){
    try {
      const data = {
        broker_id: network.broker_id
      }
      const response = await
      axios.post('/liaison/get_my_broker', data)
      commit('SET_VIEW_MY_BROKER', response.data)
      commit('SET_MY_BROKER_TASKS_PAGINATION_DETAILS', response.data.data.tasks)
      return true
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyBroker'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchMyBroker'}, {root: true})
      }
    }
  },

  async fetchMyBrokerInvoices({commit,dispatch}, network){
    try {
      const data = {
        broker_id: network.broker_id
      }
      const response = await
      axios.post('/liaison/get_my_broker_invoices', data)
      commit('SET_VIEW_MY_BROKER_INVOICES', response.data)
      commit('SET_MY_BROKER_INVOICES_PAGINATION_DETAILS', response.data.data.invoices)
      return response
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyBrokerInvoices'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchMyBrokerInvoices'}, {root: true})
      }
    }
  },

  async fetchMyBrokerOffers({commit,dispatch}, network){
    try {
      const data = {
        broker_id: network.broker_id
      }
      const response = await
      axios.post('/liaison/get_my_broker_offers', data)
      commit('SET_VIEW_MY_BROKER_OFFERS', response.data)
      return response
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyBrokerOffers'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchMyBrokerOffers'}, {root: true})
      }
    }
  },
  
  async fetchMyBrokerBids({commit,dispatch}, network){
    try {
      const data = {
        broker_id: network.broker_id
      }
      const response = await
      axios.post('/liaison/get_my_broker_bids', data)
      commit('SET_VIEW_MY_BROKER_BIDS', response.data)
      commit('SET_MY_BROKER_BIDS_PAGINATION_DETAILS', response.data.data.bids)

      return response
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyBrokerBids'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchMyBrokerBids'}, {root: true})
      }
    }
  }

}

const mutations = {
  SET_VIEW_BROKER: (state, broker) => (state.view = broker),
  SET_MY_BROKERS: (state, brokers) => (state.my_brokers = brokers),
  SET_ALL_BROKERS: (state, brokers) => (state.all_brokers = brokers),
  SET_BROKERS_PAGINATION_DETAILS: (state, broker_pagination_details) => (state.broker_pagination_details = broker_pagination_details),
  SET_VIEW_MY_BROKER: (state, my_broker) => (state.my_broker = my_broker),
  SET_MY_BROKER_TASKS_PAGINATION_DETAILS: (state, my_broker_tasks_pagination_details) => (state.my_broker_tasks_pagination_details = my_broker_tasks_pagination_details),

  SET_VIEW_MY_BROKER_DETAILS: (state, broker_details) => (state.my_broker_details = broker_details),
  SET_VIEW_MY_BROKER_INVOICES: (state, my_broker_invoices) => (state.my_broker_invoices = my_broker_invoices),
  SET_MY_BROKER_INVOICES_PAGINATION_DETAILS: (state, my_broker_invoices_pagination_details) => (state.my_broker_invoices_pagination_details = my_broker_invoices_pagination_details),

  SET_VIEW_MY_BROKER_OFFERS: (state, my_broker_offers) => (state.my_broker_offers = my_broker_offers),
  SET_VIEW_MY_BROKER_BIDS: (state, my_broker_bids) => (state.my_broker_bids = my_broker_bids),
  SET_MY_BROKER_BIDS_PAGINATION_DETAILS: (state, my_broker_bids_pagination_details) => (state.my_broker_bids_pagination_details = my_broker_bids_pagination_details),

}

export default {
  state,
  getters,
  actions,
  mutations
}
