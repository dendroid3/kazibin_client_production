//this module is for fetching tasks only

import axios from "axios"

const state = {
  all_done_by_me: null,
  all_posted_by_me: null,
  all_posted_by_me_pagination_details: null,
  all_available_for_bidding: null,
  availability_details: null,
  task_for_bidding: null,
  all_available_for_bidding_pagination_details: null,
  all_done_by_me_pagination_details: null
}
const getters = {
  getAllTasksPostedByMe: (state)=> (state.all_posted_by_me),
  getAllTasksPostedByMePaginationDetails: (state)=> (state.all_posted_by_me_pagination_details),
  getAllTasksDoneByMe: (state)=> (state.all_done_by_me),
  getAllTasksDoneByMePaginationDetails: (state)=> (state.all_done_by_me_pagination_details),
  getAllTasksAvailableForBidding: (state)=> (state.all_available_for_bidding),
  getAllTasksAvailableForBiddingPaginationDetails: (state)=> (state.all_available_for_bidding_pagination_details),
  getAvailabilityDetails: (state)=> (state.availability_details),
  getTaskForBidding: (state)=> (state.task_for_bidding),
}
const actions = {
  async fetchAllPostedByMe({commit, dispatch}){
    try{
      const response = await
      axios.get('/task/get_all_posted_by_me')
      commit('SET_ALL_TASKS_POSTED_BY_ME', response.data)
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAllPostedByMe'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchAllPostedByMe'}, {root: true})
      }
    }
  },

  async fetchAllPostedByMePaginated({commit, dispatch}, data){
    try{
      let page_url = data.link ? data.link :'/task/get_all_posted_by_me_paginated'
      const response = await
      axios.post(page_url, data)
      commit('SET_ALL_TASKS_POSTED_BY_ME', response.data.data)
      commit('SET_ALL_TASKS_POSTED_BY_ME_PAGINATION_DETAILS', response.data)
      return true
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAllPostedByMePaginated'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchAllPostedByMePaginated'}, {root: true})
      }
    }
  },

  async fetchAllDoneByMe({commit, dispatch}){
    try{
      const response = await
      axios.get('/task/get_all_done_by_me')
      commit('SET_ALL_TASKS_DONE_BY_ME', response.data)
    } catch (e){
      dispatch('handleError', {error: e, error_code: e.response.status}, {root: true})
    }
  },

  async fetchAllDoneByMePaginated({commit, dispatch}, data){
    try{
      let page_url = data.link ? data.link :'/task/get_all_done_by_me_paginated'
      const response = await
      axios.post(page_url, data)
      commit('SET_ALL_TASKS_DONE_BY_ME', response.data.data)
      commit('SET_ALL_TASKS_DONE_BY_ME_PAGINATION_DETAILS', response.data)
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAllDoneByMePaginated'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchAllDoneByMePaginated'}, {root: true})
      }
    }
  },

  async fetchAvailabilityDetails({commit, dispatch}){
    try{
      const response = await
      axios.get('/task/get_availability_details')
      commit('SET_AVAILABILITY_DETAILS', response.data)
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAvailabilityDetails'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchAvailabilityDetails'}, {root: true})
      }
    }
  },

  async fetchAllAvailableForBidding({commit, dispatch}, data){
    try{
      const response = await
      axios.post('/task/get_available_for_bidding', data)
      commit('SET_ALL_TASKS_AVAILABLE_FOR_BIDDING', response.data)
      return true
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAllAvailableForBidding'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchAllAvailableForBidding'}, {root: true})
      }
    }
  },

  async fetchAllAvailableForBiddingPaginated({commit, dispatch}, data){
    try{
      let page_url = data.link ? data.link :'/task/get_available_for_bidding_paginated'
      const response = await
      axios.post(page_url, data)
      console.log(response)
      commit('SET_ALL_TASKS_AVAILABLE_FOR_BIDDING', response.data.data)
      commit('SET_TASKS_AVAILABLE_FOR_BIDDING_BY_ME_PAGINATION_DETAILS', response.data)
      return true
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAllAvailableForBiddingPaginated'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchAllAvailableForBiddingPaginated'}, {root: true})
      }
    }
  },

  async fetchTaskForBidding({commit, dispatch}, data){
    try{
      const response = await
      axios.post('/task/get_for_bidding', data)
      commit('SET_TASK_FOR_BIDDING', response.data)
      return true
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchTaskForBidding'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchTaskForBidding'}, {root: true})
      }
    }
  }
}
const mutations = {
  SET_ALL_TASKS_POSTED_BY_ME: (state, tasks) => (state.all_posted_by_me = tasks),
  SET_ALL_TASKS_POSTED_BY_ME_PAGINATION_DETAILS: (state, all_posted_by_me_pagination_details) =>(
    state.all_posted_by_me_pagination_details = all_posted_by_me_pagination_details
  ),
  SET_ALL_TASKS_DONE_BY_ME: (state, tasks) => (state.all_done_by_me = tasks),
  SET_ALL_TASKS_AVAILABLE_FOR_BIDDING: (state, tasks) => (state.all_available_for_bidding = tasks),
  SET_AVAILABILITY_DETAILS: (state, availability_details) =>(state.availability_details = availability_details),
  SET_TASK_FOR_BIDDING: (state, task_for_bidding) =>(state.task_for_bidding = task_for_bidding),
  SET_TASKS_AVAILABLE_FOR_BIDDING_BY_ME_PAGINATION_DETAILS: (state, all_available_for_bidding_pagination_details) => (
    state.all_available_for_bidding_pagination_details = all_available_for_bidding_pagination_details
  ),
  SET_ALL_TASKS_DONE_BY_ME_PAGINATION_DETAILS: (state, all_done_by_me_pagination_details) => (
    state.all_done_by_me_pagination_details = all_done_by_me_pagination_details
  )
}

export default {
  state,
  getters,
  actions,
  mutations
}
