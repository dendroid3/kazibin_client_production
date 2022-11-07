import axios from "axios";

const state = {
    about_statistics: null
}

const getters = {
    getAboutStatistics: (state) => (state.about_statistics)
}

const actions = {
    async fetchAboutStatistics({commit}){
        try{
            const response = await
            axios.get('get_about_statistics')
            commit('SET_ABOUT_STATISTICS', response.data)
        } catch(e){
        }
    }
}

const mutations = {
    SET_ABOUT_STATISTICS: (state, about_statistics) => (state.about_statistics = about_statistics)
}

export default {
    state,
    getters,
    actions,
    mutations
}
