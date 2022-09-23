// This is for manipulating the UI. It performs no Ajax calls.

import axios from 'axios'
import router from '../../router'

const state = {
  registration_step: 1,
  loading_status: true,
  alert_message: null,
  alert: false,
  alert_code: false,
  task_chat_invoice: false,
  task_chat_view_invoice: false
}

const getters = {
  getRegistrationStep: (state) => (state.registration_step),
  isLoading: (state) => (state.loading_status),
  isAlertOpen: (state) => (state.alert),
  getAlertCode: (state) => (state.alert_code),
  getAlertMessage: (state) => (state.alert_message),
  getTaskChatInvoice: (state) => (state.task_chat_invoice),
  getTaskChatViewInvoice: (state) => (state.task_chat_view_invoice),
}

const actions = {
  handleError({dispatch, getters}, data){
    if(data.error_code){
      switch (data.error_code) {
        case 401:
          dispatch('openAlert', {message: 'You need to log in to perform this action, please log in', code: 'error'}, {root: true})
          router.push('/login')
          break;
  
        case 500:
          const error = {
            user_phone_number: getters.getUser.phone_number,
            url: data.error.response.config.url,
            message: data.error.response.data.message,
            error_code: data.error_code,
            page: router.history.current.name,
            action: data.action
          }
          axios.post('/log_error', error)
          break;
      
        default:
          const default_error = {
            user_phone_number: getters.getUser.phone_number,
            url: data.error.response.config.url,
            message: data.error.response.data.message ? data.error.response.data.message : 'No message for this one',
            error_code: data.error_code,
            page: router.history.current.name,
            action: data.action
          }
          axios.post('/log_error', default_error)
          break;
      }
    } else{
      let error_message = 'Something went wrong while performing this action:::> ' + data.action +
      ' Help us serve you better by sending us a bug report. Explain to us what you were trying to do. Call us on 07000000 if it is an urgent action. Thank you. '
      dispatch('openAlert', {message: error_message, code: 'error', timeout: 10000}, {root: true})
      const error = {
        user_phone_number: getters.getUser.phone_number,
        message: data.error.message,
        page: router.history.current.name,
        action: data.action
      }
      axios.post('/log_error', error)
    }
  },

  inputRegistrationStep({commit}, number) {
    commit('INPUT_REGISTRATION_STEP', number)
  },

  toggleTaskChatInvoice({commit}, data){
    commit('TOGGLE_TASK_CHAT_INVOICE',data)
  },

  toogleTaskChatViewInvoice({commit}, data){
    commit('TOOGLE_TASK_CHAT_VIEW_INVOICE', data)
  },

  setLoadingStatus({commit}, status) {
    commit('SET_LOADING_STATUS', status)
  },

  openAlert({commit, dispatch}, text){
    
    if(text.code == 'error'){
      var audio = new Audio(require('../../assets/sounds/error.mp3'));
      audio.play()
    } else if(text.code == 'success'){
      var audio = new Audio(require('../../assets/sounds/success.mp3'));
      audio.play()
    } else if(text.code == 'info'){
      var audio = new Audio(require('../../assets/sounds/info.mp3'));
      audio.play()
    }
    const data = {
      message: text.message,
      code: text.code
    }
    commit('OPEN_ALERT', data)
    setTimeout(() => {
      dispatch('closeAlert', null, {root: true})
    }, text.timeout ? text.timeout : 3000);
  },

  closeAlert({commit}){
    commit('CLOSE_ALERT')
  },
}

const mutations = {
  INPUT_REGISTRATION_STEP: (state, number) => (
    state.registration_step = number
  ),
  SET_LOADING_STATUS: (state, status) => (
    state.loading_status = status
  ),
  OPEN_ALERT: (state, data) => (
    state.alert = true,
    state.alert_message = data.message,
    state.alert_code = data.code
  ),
  CLOSE_ALERT: (state) => (
    state.alert = false,
    state.message = ''
  ),
  TOGGLE_TASK_CHAT_INVOICE: (state, data) => (
    state.task_chat_invoice = data
  ),
  TOOGLE_TASK_CHAT_VIEW_INVOICE: (state, data) => (
    state.task_chat_view_invoice = data
  )
}

export default {
  state,
  getters,
  actions,
  mutations
}