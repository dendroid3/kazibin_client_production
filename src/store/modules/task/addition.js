// this module is for addition of tasks.

import axios from 'axios'

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
  async stepOne({commit}, data){
    try{
      console.log('ibjnsdd')
      commit('SET_STEP_ONE_ERROR', null)

      const response = await
      axios.post('create_task/step_1', data)
      console.log(response)

      if(response.status == 201){
        commit('SET_STEP_ONE_ERROR', response.data.errors)
        return false
      }

      commit('SET_ADD_TASK_STEP', 2)
      commit('SET_STEP_ONE_RESPONSE', response.data.task)

      return false
    }catch(e){
      commit('SET_STEP_ONE_ERROR', response.data.errors)
      console.log(e)
      return false
    }
  },
  async stepTwo({commit}, data){
    try{
      const response = await
      axios.post('create_task/step_2', data)
      commit('SET_ADD_TASK_STEP', 3)
      commit('SET_STEP_TWO_RESPONSE', response.data.task_files)

      return false
    }catch(e){
      console.log(e)
      return false
    }
  },
  
  async stepThree({commit}, data){
    try{
      const response = await
      axios.post('create_task/step_3', data)
      commit('SET_STEP_THREE_RESPONSE', response.data.task)
      commit('SET_ADD_TASK_STEP', 4)
      return false
    }catch(e){
      console.log(e)
      return false
    }
  },
  async stepFour({commit}, data){
    try{
      const response = await
      axios.post('create_task/step_4', data)
      commit('SET_STEP_FOUR_RESPONSE', response.data.task)
      commit('SET_ADD_TASK_STEP', 5)
      return false
    }catch(e){
      console.log(e)
      return false
    }
  },
  async stepFive({commit}, data){
    try{
      const response = await
      axios.post('create_task/step_5', data)
      commit('SET_STEP_FIVE_RESPONSE', response.data.task)
      commit('SET_ADD_TASK_STEP', 6)
      return false
    }catch(e){
      console.log(e)
      return false
    }
  },
  async stepSix({commit}, data){
    try{
      const response = await
      axios.post('create_task/step_6', data)
      commit('SET_STEP_SIX_RESPONSE', response.data.task)
      commit('SET_ADD_TASK_STEP', 6)
      console.log(response)
      return false
    }catch(e){
      console.log(e)
      return false
    }
  },
  setAddTaskStep({commit}, step){
    commit('SET_ADD_TASK_STEP', step)
  },
  flashAdditionResponses({commit}){
    commit('FLASH_RESPONSES')
  }
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