//this module is for fetching tasks only

import axios from "axios"

const state = {
  all_done_by_me: null,
  all_posted_by_me: null,
  all_available_for_bidding: null,
  availability_details: null
}
const getters = {
  getAllTasksPostedByMe: (state)=> (state.all_posted_by_me),
  getAllTasksDoneByMe: (state)=> (state.all_done_by_me),
  getAllTasksAvailableForBidding: (state)=> (state.all_available_for_bidding),
  getAvailabilityDetails: (state)=> (state.availability_details),
}
const actions = {
  async fetchAllPostedByMe({commit}){
    try{
      const response = await
      axios.get('/task/get_all_posted_by_me')
      console.log(response)
      commit('SET_ALL_TASKS_POSTED_BY_ME', response.data)
    } catch (e){
      console.log(e)
    }
  },
  async fetchAllDoneByMe({commit}){
    try{
      const response = await
      axios.get('/task/get_all_done_by_me')
      console.log(response)
      commit('SET_ALL_TASKS_DONE_BY_ME', response.data)
    } catch (e){
      console.log(e)
    }
  },
  async fetchAvailabilityDetails({commit}){
    try{
      const response = await
      axios.get('/task/get_availability_details')
      console.log(response)
      commit('SET_AVAILABILITY_DETAILS', response.data)
    } catch (e){
      console.log(e)
    }
  },
  async fetchAllAvailableForBidding({commit}, data){
    try{
      console.log('kjh')
      const response = await
      axios.post('/task/get_available_for_bidding', data)
      console.log(response)
      commit('SET_ALL_TASKS_AVAILABLE_FOR_BIDDING', response.data.tasks)
      return true
    } catch (e){
      console.log(e)
    }
  }
}
const mutations = {
  SET_ALL_TASKS_POSTED_BY_ME: (state, tasks) => (state.all_posted_by_me = tasks),
  SET_ALL_TASKS_DONE_BY_ME: (state, tasks) => (state.all_done_by_me = tasks),
  SET_ALL_TASKS_AVAILABLE_FOR_BIDDING: (state, tasks) => (state.all_available_for_bidding = tasks),
  SET_AVAILABILITY_DETAILS: (state, availability_details) =>(state.availability_details = availability_details)
}

export default {
  state,
  getters,
  actions,
  mutations
}
