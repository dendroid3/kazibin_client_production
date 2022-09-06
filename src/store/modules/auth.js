// Module for registation, loggin in, reseting passwords and verifying KYC information

import axios from 'axios'
import router from '../../router'
const state = {
  email_verified: false,
  user: {},
  login_error: null,
  token: false
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
      dispatch('setLoadingStatus', false, {root: true})
      commit('SET_AUTH_DETAILS', response.data.token)
      commit('SET_USER_DETAILS', response.data.user)
      if(response.status == 201){return}
      // dispatch('inputRegistrationStep', 3, {root: true})
      window.location.href = process.env.VUE_APP_FRONT_END_URL + `MyProfile` 
      return false
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'register'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'register'}, {root: true})
      }
    }
  },

  updateUserDetails({}, data){
    commit('SET_USER_DETAILS', data)
  },

  async verifyEmail ({commit, dispatch, getters}) {
    try {
      const response = await
      axios.post('verify_email', getters.getUser)
      if(response.status == 201) { 
        return 
      }
      commit('SET_VERIFICATION', true)
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'verifyEmail'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'verifyEmail'}, {root: true})
      }
    }
  },
  
  async createProfile ({commit, dispatch}, data) {
    try {
      dispatch('setLoadingStatus', true, {root: true})
      const response = await
      axios.post('create_profile', data)
      commit('SET_USER_DETAILS', response.data.user)
      dispatch('setLoadingStatus', false, {root: true})
      router.push('/dashboard')
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'createProfile'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'createProfile'}, {root: true})
      }
    }
  },
  
  async login ({commit, dispatch}, data) {
    try {
      dispatch('setLoadingStatus', true, {root: true})
      commit('SET_LOGIN_ERROR', null)
      const response = await
      axios.post('login', data)
      dispatch('setLoadingStatus', false, {root: true})
      if(response.status == 200){
        commit('SET_AUTH_DETAILS', response.data.token)
        commit('SET_USER_DETAILS', response.data.user)
        window.location.href = process.env.VUE_APP_FRONT_END_URL + `dashboard`
        return true 
      } else {
        dispatch('setLoginError', response.data.error, {root: true})
      }
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'login'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'login'}, {root: true})
      }
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
