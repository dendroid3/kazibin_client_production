import axios from 'axios'

const state = {
    accounts: null,
    accounts_pagination_details: null,
    current_account_in_view: null
}

const getters = {
    getAccounts: (state) => (state.accounts),
    getAccountsPaginationDetails: (state) => (state.accounts_pagination_details),
    getCurrentAccountInView: (state) => (state.current_account_in_view)
}

const actions = {
    async fetchAccounts({commit}) {
        try {
            const response = await
            axios.get('/account/get_for_display')
            commit('SET_ACCOUNTS', response.data.accounts)
            return response.data
        } catch (err) {
            console.log(err)
        }
    },

    async fetchAccountsPaginated({commit}, data) {
        try {
            const url = data ? '/account/get_paginated?' + data : '/account/get_paginated'
            const response = await
            axios.get(url)
            commit('SET_ACCOUNTS', response.data.accounts.data)
            console.log(response.data)
            commit('SET_ACCOUNTS_PAGINATION_DETAILS', response.data)
            return response.data
        } catch (err) {
            console.log(err)
        }
    },

    async fetchAccount({commit}) {
        try {
            const response = await
            axios.post('/account/get_current', data)
            commit('SET_CURRENT_ACCOUNT_IN_VIEW', response.data)
            return true
        } catch (err) {
            console.log(err)
        }
    },

    setCurrentAccountInView({commit}, data) {
        commit('SET_CURRENT_ACCOUNT_IN_VIEW', data)
    }
}

const mutations = {
    SET_ACCOUNTS: (state, accounts) => (state.accounts = accounts),
    SET_ACCOUNTS_PAGINATION_DETAILS: (state, account_pagination_details) => (state.accounts_pagination_details = account_pagination_details),
    SET_CURRENT_ACCOUNT_IN_VIEW: (state, current_account_in_view) => (state.current_account_in_view = current_account_in_view)
}

export default {
    state, getters, actions, mutations
}
