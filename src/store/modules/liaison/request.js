import axios from "axios"

const state = {
  from_brokers: null,
  chat_view: null
}
const getters = {
  getRequestsFromBrokers: (state) => (state.from_brokers),
  getRequestChatView: (state) => (state.chat_view)
}
const actions = {
  async sendRequestToWriter({}, data){
    try{
      const response = await
      axios.post('/liaison/request/writer', data)
      return response
    }catch(e){
      console.log(e)
    }
  },
  
  async fetchRequestsFromBrokers({commit}){
    try{
      console.log('in')
      const response = await
      axios.get('/liaison/requests/from_brokers')
      commit('SET_LIAISON_REQUESTS_FROM_BROKERS', response.data.requests)
      return response
    }catch(e){
      console.log(e)
    }
  },

  setLiaisonRequestChat({commit}, data){
    commit('SET_LIAISON_REQUEST_CHAT', data)
  }
}
const mutations = {
  SET_LIAISON_REQUESTS_FROM_BROKERS: (state, requests)=> (state.from_brokers = requests),
  SET_LIAISON_REQUEST_CHAT: (state, request)=> (state.chat_view = request)
}

export default {
  state,
  getters,
  actions,
  mutations
}
