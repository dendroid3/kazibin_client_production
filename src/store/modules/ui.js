// This is for manipulating the UI. It performs no Ajax calls.

const state = {
  registration_step: 1,
  loading_status: false,
}

const getters = {
  getRegistrationStep: (state) => (state.registration_step),
  isLoading: (state) => (state.loading_status),
}

const actions = {
  inputRegistrationStep({commit}, number) {
    commit('INPUT_REGISTRATION_STEP', number)
  },
  setLoadingStatus({commit}, status) {
    commit('SET_LOADING_STATUS', status)
  }
}

const mutations = {
  INPUT_REGISTRATION_STEP: (state, number) => (
    state.registration_step = number
  ),
  SET_LOADING_STATUS: (state, status) => (
    state.loading_status = status
  )
}

export default {
  state,
  getters,
  actions,
  mutations
}