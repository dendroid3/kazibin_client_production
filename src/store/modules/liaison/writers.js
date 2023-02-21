import axios from "axios"
import router from "../../../router"

const state = {
  all_writers: null,
  view: null,
  my_writers: null,
  writers_pagination_details: null,
  my_writer_details: {},
  my_writer: null,
  my_writer_tasks_pagination_details: {}
}

const getters = {
  getAllWriters: (state) => (state.all_writers),
  getMyWriters: (state) => (state.my_writers),
  getViewWriter: (state) => (state.view),
  getWriterPaginationDetails: (state) => (state.writers_pagination_details),
  getViewMyWriter: (state) => (state.my_writer),
  getViewMyWriterDetails: (state) => (state.my_writer_details),
  getViewMyWriterTasksPaginationDetails: (state) => (state.my_writer_tasks_pagination_details),

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
      console.log(response)
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'getMyWriter'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'getMyWriter'}, {root: true})
      }
    }
  }
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
  SET_VIEW_MY_WRITER_DETAILS: (state, my_writer_details) => (state.my_writer_details = my_writer_details)
}

export default {
  state,
  getters,
  actions,
  mutations
}