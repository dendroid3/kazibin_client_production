import axios from "axios"

const state = {
  all_writers: null,
  view: null
}

const getters = {
  getAllWriters: (state) => (state.all_writers),
  getViewWriter: (state) => (state.view)
}

const actions = {
  async fetchAllWriters({commit}, data){
    try{
      console.log('osijdosdsod')
      const response =  await
      axios.post('/liaison/get_all_writers', data)
      console.log(response)
      commit('SET_ALL_WRITERS', response.data.writers)
    } catch (e) {
      console.log(e)
    }
  },
  setViewWriter({commit}, writer){
    commit('SET_VIEW_WRITER', writer)
  }
}

const mutations = {
  SET_ALL_WRITERS: (state, writers) => (state.all_writers = writers),
  SET_VIEW_WRITER: (state, writer) => (state.view = writer)
}

export default {
  state,
  getters,
  actions,
  mutations
}