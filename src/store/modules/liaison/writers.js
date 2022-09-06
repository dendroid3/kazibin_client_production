import axios from "axios"

const state = {
  all_writers: null,
  view: null,
  my_writers: null,
  writer_pagination_details: null
}

const getters = {
  getAllWriters: (state) => (state.all_writers),
  getMyWriters: (state) => (state.my_writers),
  getViewWriter: (state) => (state.view),
  getWriterPaginationDetails: (state) => (state.broker_pagination_details)

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
      let page_url = data.link ? data.link :'/task/get_all_writers_paginated'

      const response =  await
      axios.post(page_url, data)
      console.log(response)
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
      console.log(response)
      commit('SET_MY_WRITERS', response.data.writers)
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'setCostPerPage'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'setCostPerPage'}, {root: true})
      }
    }
  }
}

const mutations = {
  SET_ALL_WRITERS: (state, writers) => (state.all_writers = writers),
  SET_MY_WRITERS: (state, writers) => (state.my_writers = writers),
  SET_VIEW_WRITER: (state, writer) => (state.view = writer),
  SET_WRITERS_PAGINATION_DETAILS: (state, writer_pagination_details) => (
    state.writer_pagination_details = writer_pagination_details
  )
}

export default {
  state,
  getters,
  actions,
  mutations
}