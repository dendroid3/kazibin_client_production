import axios from 'axios'

const state = {
    from_home_results: null
}

const getters = {
    getFromHomeResults: (state) => (state.from_home_results)
}

const actions = {
    async searchFromHome({commit, dispatch}, data){
        try {
            const response = await
            axios.post('/search/from_home', data)
            commit('SET_SEARCH_FROM_HOME_RESULTS', response.data)
            console.log(response)
            return response
        } catch(e){
            if(e.response){
                dispatch('handleError', {error: e, error_code: e.response.status, action: 'searchFromHome'}, {root: true})
            } else {
                dispatch('handleError', {error: e, action: 'searchFromHome'}, {root: true})
            }
        }
    }}

const mutations = {
    SET_SEARCH_FROM_HOME_RESULTS: (state, from_home_results) => (
        state.from_home_results = from_home_results
    )
}

export default {
    state,
    getters,
    actions,
    mutations
}
