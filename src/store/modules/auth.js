// Module for registation, loggin in, reseting passwords and verifying KYC information

import axios from 'axios'
import router from '../../router'
const state = {
  email_verified: false,
  user: {},
  login_error: null
}

const getters = {
  isEmailVerified: (state) => (state.email_verified),
  getUser: (state) => (state.user),
  getLoginError: (state) => (state.login_error),
}

const actions = {
  async register ({commit, dispatch}, data) {
    try {
      dispatch('setLoadingStatus', true, {root: true})
      const response = await
      axios.post('register', data)
      console.log(response)
      dispatch('setLoadingStatus', false, {root: true})
      commit('SET_AUTH_DETAILS', response.data.token)
      commit('SET_USER_DETAILS', response.data.user)
      if(response.status == 201){return}
      dispatch('inputRegistrationStep', 2, {root: true})
      return false
    } catch (e) {
      console.log(e)
    }
  },
  async verifyEmail ({commit, getters}) {
    try {
      const response = await
      axios.post('verify_email', getters.getUser)
      console.log(response)
      if(response.status == 201) { 
        console.log('nope') 
        return 
      }
      commit('SET_VERIFICATION', true)
    } catch (e) {
      console.log(e)
    }
  },
  
  async createProfile ({commit, dispatch}, data) {
    try {
      dispatch('setLoadingStatus', true, {root: true})
      console.log('in auth')
      const response = await
      axios.post('create_profile', data)
      commit('SET_USER_DETAILS', response.data.user)
      dispatch('setLoadingStatus', false, {root: true})
      router.push('/dashboard')
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  },
  
  async login ({commit, dispatch}, data) {
    try {
      dispatch('setLoadingStatus', true, {root: true})
      commit('SET_LOGIN_ERROR', null)
      console.log('in auth')
      const response = await
      axios.post('login', data)
      dispatch('setLoadingStatus', false, {root: true})
      if(response.status == 200){
        commit('SET_AUTH_DETAILS', response.data.token)
        commit('SET_USER_DETAILS', response.data.user)
        router.push('/dashboard')
      } else {
        dispatch('setLoginError', response.data.error, {root: true})
      }
      console.log(response)
    } catch (e) {login
      console.log(e)
    }
  },

  async setLoginError({commit}, data){
    commit('SET_LOGIN_ERROR', data)
  }
}

const mutations = {
  SET_VERIFICATION: (state, data) => (
    state.email_verified = data
  ),
  SET_USER_DETAILS: (state, data) => (
    state.user = data
  ),
  SET_AUTH_DETAILS: (state, token) => (
    state.token = token
  ),
  SET_LOGIN_ERROR: (state, error) => (
    state.login_error = error
  )
}

export default {
  state,
  getters,
  actions,
  mutations
}
