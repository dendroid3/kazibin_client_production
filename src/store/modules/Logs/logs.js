import axios from 'axios'

const state = {
  logs: {}
}

const getters = {
  getLogMessages: (state) => (state.logs)
}

const actions = {
  async fetchLogMessages({commit, dispatch}){
    try{
      const response = await
      axios.get('/getLogs')
      commit('SET_LOGS', response.data.messages)
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchLogMessages'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchLogMessages'}, {root: true})
      }
    }
  }
}

const mutations = {
  SET_LOGS: (state, messages) => (
    state.logs = messages
  )
}

export default {
  state,
  getters,
  actions,
  mutations
}