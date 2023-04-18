// this module is for addition of tasks.

import axios from 'axios'
import router from '../../../router'

const state = {
  step: 1,
  step_one_errors: null,
  step_one_response: null,
  step_two_response: null,
  step_three_response: null,
  step_four_response: null,
  step_five_response: null,
  step_six_response: null
}

const getters = {
  getAddTaskStep: (state) => (state.step),
  getStepOneErrors: (state) => (state.step_one_errors),
  getStepOneResponse: (state) => (state.step_one_response),
  getStepTwoResponse: (state) => (state.step_two_response),
  getStepThreeResponse: (state) => (state.step_three_response),
  getStepFourResponse: (state) => (state.step_four_response),
  getStepFiveResponse: (state) => (state.step_five_response),
  getStepSixResponse: (state) => (state.step_six_response),
}

const actions = {
  async stepOne({commit, dispatch}, data){
    try{
      commit('SET_STEP_ONE_ERROR', null)

      const response = await
      axios.post('create_task/step_1', data)

      if(response.status == 201){
        commit('SET_STEP_ONE_ERROR', response.data.errors)
        return false
      }

      commit('SET_ADD_TASK_STEP', 2)
      commit('SET_STEP_ONE_RESPONSE', response.data.task)

      return false
    }catch(e){
            if(e.response){
                dispatch('handleError', {error: e, error_code: e.response.status, action: 'stepOne'}, {root: true})
            } else {
                dispatch('handleError', {error: e, action: 'stepOne'}, {root: true})
            }
      // commit('SET_STEP_ONE_ERROR', e.errors)
      return false
    }
  },

  async stepTwo({commit, dispatch}, data){
    try{
      const response = await
      axios.post('create_task/step_2', data)
      commit('SET_ADD_TASK_STEP', 3)
      commit('SET_STEP_TWO_RESPONSE', response.data.task_files)

      return false
    }catch(e){
      if(e.response){
          dispatch('handleError', {error: e, error_code: e.response.status, action: 'stepTwo'}, {root: true})
      } else {
          dispatch('handleError', {error: e, action: 'stepTwo'}, {root: true})
      }
      return false
    }
  },
  
  async stepThree({commit, dispatch}, data){
    try{
      const response = await
      axios.post('create_task/step_3', data)
      commit('SET_STEP_THREE_RESPONSE', response.data.task)
      commit('SET_ADD_TASK_STEP', 4)
      return false
    }catch(e){
      if(e.response){
          dispatch('handleError', {error: e, error_code: e.response.status, action: 'stepThree'}, {root: true})
      } else {
          dispatch('handleError', {error: e, action: 'stepThree'}, {root: true})
      }
      return false
    }
  },

  async stepFour({commit, dispatch}, data){
    try{
      const response = await
      axios.post('create_task/step_4', data)
      commit('SET_STEP_FOUR_RESPONSE', response.data.task)
      commit('SET_ADD_TASK_STEP', 5)
      return false
    }catch(e){
      if(e.response){
          dispatch('handleError', {error: e, error_code: e.response.status, action: 'stepFour'}, {root: true})
      } else {
          dispatch('handleError', {error: e, action: 'stepFour'}, {root: true})
      }
      return false
    }
  },

  async stepFive({commit, dispatch}, data){
    try{
      const response = await
      axios.post('create_task/step_5', data)
      commit('SET_STEP_FIVE_RESPONSE', response.data.task)
      commit('SET_ADD_TASK_STEP', 6)
      return false
    }catch(e){
      if(e.response){
          dispatch('handleError', {error: e, error_code: e.response.status, action: 'stepFive'}, {root: true})
      } else {
          dispatch('handleError', {error: e, action: 'stepFive'}, {root: true})
      }
      return false
    }
  },

  async stepSix({commit, dispatch}, data){
    try{
      const response = await
      axios.post('create_task/step_6', data)
      if(data.reassigning){
        dispatch('openAlert', {message: response.data, code: 'success'}, {root: true})
        router.push('/dashboard')
      } else {
        commit('SET_STEP_SIX_RESPONSE', response.data.task)
        commit('FLASH_RESPONSES')
        commit('SET_ADD_TASK_STEP', 1)
        dispatch('openAlert', {message: response.data, code: 'success'}, {root: true})
        dispatch('fetchDashboardDetails', null, {root: true})
        router.push('/Tasks/Posted')
        return false
      }
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'stepSix'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'stepSix'}, {root: true})
      }
      return false
    }
  },

  async deleteTask({dispatch}, data){
    try{
      const response = await
      axios.post('task/delete', data)

      dispatch('openAlert', {message: response.data.message, code: 'success'}, {root: true})
      
      return false
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'deleteTask'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'deleteTask'}, {root: true})
      }
      return false
    }
  },

  setAddTaskStep({commit}, step){
    commit('SET_ADD_TASK_STEP', step)
  },
  flashAdditionResponses({commit}){
    commit('FLASH_RESPONSES')
  },

  async changeDeadline({dispatch, getters}, data){
    try{
      const response = await
      axios.post('create_task/change_deadline', data)
      dispatch('openAlert', {message: response.data.message, code: 'success'})
      const task = getters.getTaskChatHeader
      task.expiry_time = response.data.task.expiry_time
      dispatch('setTaskChatHeader', task)

      if((router.history.current.name == "TaskChat")){

        if(getters.getTaskChatHeader.id == response.data.task_id){
          const messages_array = [...getters.getTaskMessages]
          messages_array.push(response.data.message)
          dispatch('setTaskMessages', messages_array, { root: true })
        } 
  
      } 
      return false
    }catch(e){
      if(e.response){
          dispatch('handleError', {error: e, error_code: e.response.status, action: 'changeDeadline'}, {root: true})
      } else {
          dispatch('handleError', {error: e, action: 'changeDeadline'}, {root: true})
      }
      return false
    }
  },
  
  async changePayment({dispatch, getters}, data){
    try{
      const response = await
      axios.post('create_task/change_payment', data)
      console.log(response)
      dispatch('openAlert', {message: response.data.message.message, code: 'success'})
      const task = getters.getTaskChatHeader
      task.pages = response.data.task.pages
      task.page_cost = response.data.task.page_cost
      task.full_pay = response.data.task.full_pay
      dispatch('setTaskChatHeader', task)
      if((router.history.current.name == "TaskChat")){

        if(getters.getTaskChatHeader.id == response.data.task_id){
          const messages_array = [...getters.getTaskMessages]
          messages_array.push(response.data.message)
          dispatch('setTaskMessages', messages_array, { root: true })
        } 
  
      } 
      return false
    }catch(e){
      if(e.response){
          dispatch('handleError', {error: e, error_code: e.response.status, action: 'changePayment'}, {root: true})
      } else {
          dispatch('handleError', {error: e, action: 'changePayment'}, {root: true})
      }
      return false
    }
  },
}

const mutations = {
  SET_ADD_TASK_STEP: (state, step) => (
    state.step = step
  ),
  SET_STEP_ONE_ERROR: (state, errors) => (
    state.step_one_errors = errors
  ),
  SET_STEP_ONE_RESPONSE: (state, task) => (
    state.step_one_response = task
  ),
  SET_STEP_TWO_RESPONSE: (state, task_files) => (
    state.step_two_response = task_files
  ),
  SET_STEP_THREE_RESPONSE: (state, task) => (
    state.step_three_response = task
  ),
  SET_STEP_FOUR_RESPONSE: (state, task) => (
    state.step_four_response = task
  ),
  SET_STEP_FIVE_RESPONSE: (state, task) => (
    state.step_five_response = task
  ),
  SET_STEP_SIX_RESPONSE: (state, task) => (
    state.step_six_response = task
  ),
  FLASH_RESPONSES: (state) => (
    state.step_one_response = null,
    state.step_two_response = null,
    state.step_three_response = null,
    state.step_four_response = null,
    state.step_five_response = null,
    state.step_six_response = null
  )
}

export default {
  state,
  getters,
  actions,
  mutations
}