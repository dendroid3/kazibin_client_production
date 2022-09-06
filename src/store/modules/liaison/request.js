import axios from "axios"
import router from '../../../router'
const state = {
  to_and_from_brokers: null,
  to_and_from_writers: null,
  chat_view: null,
  requests_pagination_details: null
}
const getters = {
  getRequestsToAndFromBrokers: (state) => (state.to_and_from_brokers),
  getRequestsToAndFromWWriters: (state) => (state.to_and_from_writers),
  getRequestChatView: (state) => (state.chat_view),
  getRequestsPaginationDetails: (state) => (state.requests_pagination_details)
}
const actions = {
  async sendRequestToWriter({dispatch}, data){
    try{
      const response = await
      axios.post('/liaison/request/writer', data)
      dispatch('openAlert', {message: 'request sent succesfully', code: 'success'}, {root: true})
      router.push('/Requests')
      return response
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'sendRequestToWriter'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'sendRequestToWriter'}, {root: true})
      }
    }
  },
  
  async sendRequestToBroker({dispatch}, data){
    try{
      const response = await
      axios.post('/liaison/request/broker', data)
      dispatch('openAlert', {message: 'request sent succesfully', code: 'success'}, {root: true})
      router.push('/Requests')
      return response
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'sendRequestToBroker'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'sendRequestToBroker'}, {root: true})
      }
    }
  },

  async rejectRequest({dispatch}, data){
    try{
      const response = await
      axios.post('/liaison/request/reject', data)
      dispatch('openAlert', {message: 'request rejected', code: 'error'}, {root: true})
      router.push('/Dashboard')
      return response
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'rejectRequest'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'rejectRequest'}, {root: true})
      }
    }
  },
  
  async acceptLiaisonRequest({dispatch}, data){
    try{
      const response = await
      axios.post('/liaison/request/accept', data)
      dispatch('openAlert', {message: response.data.message.message, code: 'success'}, {root: true})
      router.push('/Network')
      return response
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'acceptLiaisonRequest'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'acceptLiaisonRequest'}, {root: true})
      }
    }
  },

  async fetchAllRequests({commit, dispatch}){
    try{
      const response = await
      axios.get('/liaison/requests/get_all')
      commit('SET_LIAISON_REQUESTS_TO_AND_FROM_BROKERS', response.data.requests.brokers_requests)
      commit('SET_LIAISON_REQUESTS_TO_AND_FROM_WRITERS', response.data.requests.writers_requests)
      return response
    }catch(e){      
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAllRequests'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchAllRequests'}, {root: true})
      }
    }
  },
  
  async fetchAllRequestsPaginated({commit, dispatch}, data){
    try{
      let page_url = data.link ? data.link :'/liaison/requests/get_all_paginated'
      console.log('sdsdasd')
      const response = await
      axios.post(page_url, data)
      console.log(response)
      // console.log(data.filter_option)
      commit('SET_REQUESTS_PAGINATION_DETAILS', response.data)
      if(data.filter_option == 'to writers' || data.filter_option == 'from writers'){
        commit('SET_LIAISON_REQUESTS_TO_AND_FROM_WRITERS', response.data.data)
      } else {
        commit('SET_LIAISON_REQUESTS_TO_AND_FROM_BROKERS', response.data.data)
      }
      return response
    }catch(e){     
      console.log(e) 
      // if(e.response){
      //   dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAllRequests'}, {root: true})
      // } else {
      //   dispatch('handleError', {error: e, action: 'fetchAllRequests'}, {root: true})
      // }
    }
  },

  setLiaisonRequestChat({commit}, data){
    commit('SET_LIAISON_REQUEST_CHAT', data)
  }
}
const mutations = {
  SET_LIAISON_REQUESTS_TO_AND_FROM_BROKERS: (state, requests)=> (state.to_and_from_brokers = requests),
  SET_LIAISON_REQUESTS_TO_AND_FROM_WRITERS: (state, requests)=> (state.to_and_from_writers = requests),
  SET_LIAISON_REQUEST_CHAT: (state, request)=> (state.chat_view = request),
  SET_REQUESTS_PAGINATION_DETAILS: (state, requests_pagination_details) => (state.requests_pagination_details = requests_pagination_details)
}

export default {
  state,
  getters,
  actions,
  mutations
}
