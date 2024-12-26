import axios from 'axios'
import accounts from './accounts'

const state = {
    accounts: null
}

const getters = {
    getMyManagedAccounts: (state) => (state.accounts)
}

const actions = {
    async addAccount({ dispatch }, account) {
        try {
            const response = await axios.post('/managed/create', account)
            dispatch('openAlert', { message: response.data, code: 'success' }, { root: true })
            return true
        } catch (error) {
            alert(error)
            console.error(error)
        }
    },

    async fetchAccounts ({commit}, data) {
        try {
            const response = await axios.post('/managed/get', data)
            commit('SET_ACCOUNTS', response.data)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

const mutations = {
    SET_ACCOUNTS: (state, accounts) => (state.accounts = accounts)
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}