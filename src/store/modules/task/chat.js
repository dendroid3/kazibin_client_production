import axios from "axios"
import router from "../../../router"

const state = {
  task_chat_header: {},
  messages: null
}

const getters = {
  getTaskChatHeader: (state) => (state.task_chat_header),
  getTaskMessages: (state) => (state.messages),
}

const actions = {
  setTaskChatHeader({commit}, task){
    commit('SET_TASK_HEADER', task)
  },

  async sendTaskMessage({commit, getters, dispatch}, data){
    try{
      const response = await
      axios.post('/task/send_message', data)

      if(!response.data.files){
        const messages_array = [...getters.getTaskMessages]
        const new_message = response.data.message
        new_message.mine = true
        messages_array.push(new_message)
        commit('SET_TASK_MESSAGES', messages_array)
      } else {
        const messages_array = [...getters.getTaskMessages]
        response.data.messages.forEach(new_message => {
          new_message.mine = true
          messages_array.push(new_message)
        });
        commit('SET_TASK_MESSAGES', messages_array)
      }
      return response.data
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'sendTaskMessage'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'sendTaskMessage'}, {root: true})
      }
    }
  },

  async fetchTaskMessages({commit, dispatch}, data){
    try{
      const response = await
      axios.post('/task/get_messages', data)
      commit('SET_TASK_MESSAGES', response.data.messages)
      return true
    } catch(e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchTaskMessages'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchTaskMessages'}, {root: true})
      }
    }
  },

  setTaskMessages({commit}, messages){
    commit('SET_TASK_MESSAGES', messages)
  },

  async markComplete({dispatch}, data){
    try{
      const response = await
      axios.post('/task/mark_complete', data)
      dispatch('openAlert', {message: response.data[0].message, code: 'success'}, {root: true})
      router.push('/dashboard')
      return true
    } catch(e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'markComplete'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'markComplete'}, {root: true})
      }
    }
  },

  async rateUser({commit, dispatch}, data){
    try{
      const response = await
      axios.post('/task/rate_user', data)
      dispatch('openAlert', {message: response.data, code: 'success'}, {root: true})
      router.push('/Tasks/Taken')
      return true
    } catch(e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'rateUser'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'rateUser'}, {root: true})
      }
    }
  }
}

const mutations = {
  SET_TASK_HEADER: (state, task) => (
    state.task_chat_header = task
  ),
  SET_TASK_MESSAGES: (state, messages) => (
    state.messages = messages
  )
}

export default {
  state, 
  getters,
  actions,
  mutations
}