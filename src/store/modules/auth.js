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
      dispatch('inputRegistrationStep', 2, {root: true})
      window.location.href = process.env.VUE_APP_FRONT_END_URL + `register` 
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
    // commit('SET_USER_DETAILS', data)
  },

  async verifyEmail ({dispatch}, data) {
    try {
      const response = await
      axios.post('verify_email', data)
      if(response.status == 201) { 
        dispatch('openAlert', {message: 'Could not verify account. It May have have already been verified or non-existent altogether. Try Logging in', code: 'error'}, {root: true})
        router.push('/Login')
        return 
      }
      dispatch('openAlert', {message: 'Verification Successful. Please Log In.', code: 'success'}, {root: true})
      router.push('/Login')
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'verifyEmail'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'verifyEmail'}, {root: true})
      }
    }
  },
  
  async initialisePasswordReset ({dispatch}, data) {
    try {
      const response = await
      axios.post('initialise_password_reset', data)
      if(response.status == 201) { 
        dispatch('openAlert', {message: 'Sorry, We do not recogonise this email.', code: 'error'}, {root: true})
        return 
      }
      dispatch('openAlert', {message: 'Email sent. Kindly check your inbox for farther instructions.', code: 'success'}, {root: true})
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'initialisePasswordReset'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'initialisePasswordReset'}, {root: true})
      }
    }
  },
  
  async resendVerificationEmail ({dispatch}) {
    try {
      const response = await
      axios.get('resend_verification_email')
      dispatch('openAlert', {message: 'Email resent. You will recieve it in a few minutes.', code: 'success'}, {root: true})

      console.log(response)
    } catch (e) {
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'resendVerificationEmail'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'resendVerificationEmail'}, {root: true})
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

  async checkIfAccountIsVerified({dispatch}){
    try{
      const response  = await
      axios.get('is_account_verified')
      if(!response.data){
        dispatch('openAlert', {message: 'No it is not verified. Please verify.', code: 'error'}, {root: true})
      } else {
        dispatch('openAlert', {message: 'Yes! You are right! It is already verified. Please log in.', code: 'success'}, {root: true})
        dispatch('inputRegistrationStep', 1, {root: true})
        router.push('/Login')

      }
      console.log(response)
      return true
    } catch(e){
      console.log(e)
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'checkIfAccountIsVerified'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'checkIfAccountIsVerified'}, {root: true})
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
        if(!response.data.user.email_verification){
          window.location.href = process.env.VUE_APP_FRONT_END_URL + `dashboard`
          return true 
        } else {
          dispatch('openAlert', {message: 'Email not verified. Verify email.', code: 'error'}, {root: true})
          dispatch('inputRegistrationStep', 2, {root: true})
          window.location.href = process.env.VUE_APP_FRONT_END_URL + `register`
        }
      } else {
          dispatch('openAlert', {message: 'Email or password do not match any of our records. Please try again. In case you have forgotten your account`s credentials then click on the `forgot password` link to recover your account', code: 'error'}, {root: true})
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
  
  async logout ({commit, dispatch}) {
    try {
      dispatch('setLoadingStatus', true, {root: true})
      const response = await
      axios.get('logout')
      dispatch('setLoadingStatus', false, {root: true})
      if(response.status == 200){
        commit('SET_AUTH_DETAILS', null)
        commit('SET_USER_DETAILS', null)
        dispatch('openAlert', {message: 'You have been successfully logged out.', code: 'info'}, {root: true})
        window.location.href = process.env.VUE_APP_LANDING_URL
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
