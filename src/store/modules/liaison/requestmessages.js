import axios from "axios"

const state = {
  request_messages: [],
}

const getters = {
  getRequestMessages: (state) => (state.request_messages),
}

const actions = {
  async fetchRequestMessages({commit, dispatch}, data){
    try{
      const response = await
      axios.post('/liaison/request/get_messages', data)
      commit('SET_REQUEST_MESSAGES', response.data.messages)
      return true
    } catch(e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchRequestMessages'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchRequestMessages'}, {root: true})
      }
    }
  },
  // 
  async sendRequestMessage({commit, getters, dispatch}, data){
    try{
      const response = await
      axios.post('/liaison/request/send_message', data)
      if(response.data.status == 200){
        const messages_array = [...getters.getRequestMessages]
        const new_message = response.data.message
        new_message.mine = true
        messages_array.push(new_message)
        commit('PUSH_REQUEST_MESSAGE', messages_array)
      }
      return response.data
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'sendRequestMessage'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'sendRequestMessage'}, {root: true})
      }
    }
  },

  async setCostPerPage({commit, getters, dispatch}, data){
    try{
      const response = await
      axios.post('/liaison/request/set_cost_per_page', data)
      if(response.data.status == 200){
        const messages_array = [...getters.getRequestMessages]
        const new_message = response.data.message
        messages_array.push(new_message)
        commit('PUSH_REQUEST_MESSAGE', messages_array)
      }
      return response.data
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'setCostPerPage'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'setCostPerPage'}, {root: true})
      }
    }
  }
}

const mutations = {
  SET_REQUEST_MESSAGES: (state, messages) => (
    state.request_messages = messages
  ),
  PUSH_REQUEST_MESSAGE: (state, messages) => (
    state.request_messages = messages
  )
}

export default {
  state,
  getters,
  actions,
  mutations
}