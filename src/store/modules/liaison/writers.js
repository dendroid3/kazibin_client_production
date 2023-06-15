import axios from "axios"
import router from "../../../router"

const state = {
  all_writers: null,
  view: null,
  my_writers: null,
  writers_pagination_details: null,
  my_writer_details: {},
  my_writer: null,
  my_writer_tasks_pagination_details: {},
  my_writer_offers: null,
  my_writer_bids: null,
  my_writer_invoices: null
}

const getters = {
  getAllWriters: (state) => (state.all_writers),
  getMyWriters: (state) => (state.my_writers),
  getViewWriter: (state) => (state.view),
  getWriterPaginationDetails: (state) => (state.writers_pagination_details),
  getViewMyWriter: (state) => (state.my_writer),
  getViewMyWriterDetails: (state) => (state.my_writer_details),
  getViewMyWriterTasksPaginationDetails: (state) => (state.my_writer_tasks_pagination_details),
  getViewMyWriterOffers: (state) => (state.my_writer_offers),
  getViewMyWriterBids: (state) => (state.my_writer_bids),
  getViewMyWriterInvoices: (state) => (state.my_writer_invoices)
}

const actions = {
  async fetchAllWriters({commit, dispatch}, data){
    try{
      const response =  await
      axios.post('/liaison/get_all_writers', data)
      commit('SET_ALL_WRITERS', response.data.writers)
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'setCostPerPage'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'setCostPerPage'}, {root: true})
      }
    }
  },

  
  async fetchAllWritersPaginated({commit, dispatch}, data){
    try{
      let page_url = data.link ? data.link :'/liaison/get_all_writers_paginated'
      const response =  await
      axios.post(page_url, data)
      commit('SET_ALL_WRITERS', response.data.data)
      commit('SET_WRITERS_PAGINATION_DETAILS', response.data)

    } catch (e) {
      if(e.response){
        if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'setCostPerPage'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'setCostPerPage'}, {root: true})
      }
      }
    }
  },
  setViewWriter({commit}, writer){
    commit('SET_VIEW_WRITER', writer)
  },

  async fetchMyWriters({commit, dispatch}){
    try{
      const response =  await
      axios.get('/liaison/get_my_writers')
      commit('SET_MY_WRITERS', response.data.writers)
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'setCostPerPage'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'setCostPerPage'}, {root: true})
      }
    }
  },

  setViewMyWriterDetails({commit}, writer){
    commit('SET_VIEW_MY_WRITER_DETAILS', writer)
  },

  async fetchMyWriter({commit,dispatch}, network){
    try {
      const data = {
        writer_id: network.writer_id
      }
      const response = await
      axios.post('/liaison/get_my_writer', data)
      commit('SET_VIEW_MY_WRITER', response.data)
      commit('SET_MY_WRITER_TASKS_PAGINATION_DETAILS', response.data.data.tasks)
      return true
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'getMyWriter'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'getMyWriter'}, {root: true})
      }
    }
  },

  async fetchMyWriterOffers({commit,dispatch}, network){
    try {
      const data = {
        writer_id: network.writer_id
      }
      const response = await
      axios.post('/liaison/get_my_writer_offers', data)
      commit('SET_VIEW_MY_WRITER_OFFERS', response.data)
      console.log(response)

      return response
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyWriterOffers'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchMyWriterOffers'}, {root: true})
      }
    }
  },

  async fetchMyWriterBids({commit,dispatch}, network){
    try {
      const data = {
        writer_id: network.writer_id
      }
      const response = await
      axios.post('/liaison/get_my_writer_bids', data)
      commit('SET_VIEW_MY_WRITKER_BIDS', response.data)
      return response
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyWriterBids'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchMyWriterBids'}, {root: true})
      }
    }
  },

  async fetchMyWriterInvoices({commit,dispatch}, network){
    try {
      const data = {
        broker_id: network.broker_id
      }
      const response = await
      axios.post('/liaison/get_my_writer_invoices', data)
      commit('SET_VIEW_MY_WRITER_INVOICES', response.data)
      return response
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyWriterInvoices'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchMyWriterInvoices'}, {root: true})
      }
    }
  },
}

const mutations = {
  SET_ALL_WRITERS: (state, writers) => (state.all_writers = writers),
  SET_MY_WRITERS: (state, writers) => (state.my_writers = writers),
  SET_VIEW_MY_WRITER: (state, writer) => (state.my_writer = writer),
  SET_MY_WRITER_TASKS_PAGINATION_DETAILS: (state, my_writer_tasks_pagination_details) => (state.my_writer_tasks_pagination_details = my_writer_tasks_pagination_details),


  SET_VIEW_WRITER: (state, writer) => (state.view = writer),
  SET_WRITERS_PAGINATION_DETAILS: (state, writers_pagination_details) => (
    state.writers_pagination_details = writers_pagination_details
  ),
  SET_VIEW_MY_WRITER_DETAILS: (state, my_writer_details) => (state.my_writer_details = my_writer_details),
  SET_VIEW_MY_WRITER_OFFERS: (state, my_writer_offers) => (state.my_writer_offers = my_writer_offers),
  SET_VIEW_MY_WRITKER_BIDS: (state, my_writer_bids) => (state.my_writer_bids = my_writer_bids),
  SET_VIEW_MY_WRITER_INVOICES: (state, my_writer_invoices) => (state.my_writer_invoices = my_writer_invoices)
}

export default {
  state,
  getters,
  actions,
  mutations
}