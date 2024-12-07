import axios from 'axios'
import Cookies from 'js-cookie'

const state = {
    accounts: null,
    accounts_pagination_details: null,
    current_account_in_view: null,
    my_accounts: null
}

const getters = {
    getAccounts: (state) => (state.accounts),
    getAccountsPaginationDetails: (state) => (state.accounts_pagination_details),
    getCurrentAccountInView: (state) => (state.current_account_in_view),
    getMyAccounts: (state) => (state.my_accounts)
}

const actions = {
    async fetchAccounts({commit}) {
        try {
            const response = await
            axios.get('/marketplace/get_for_display')
            commit('SET_ACCOUNTS', response.data.accounts)
            return response.data
        } catch (err) {
            console.log(err)
        }
    },

    async fetchAccountsPaginated({commit}, data) {
        try {
            let url = ''
            if(Cookies.get('KAZIBIN_TOKEN')){
                url = data ? '/marketplace/get_paginated?' + data : '/marketplace/get_paginated'
            } else {
                url = data ? '/marketplace/get_paginated_guest?' + data : '/marketplace/get_paginated_guest'
            }
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

    async fetchAccount({commit, dispatch}, data) {
        try {
            const response = await
            axios.post('/marketplace/get_current', data)
            commit('SET_CURRENT_ACCOUNT_IN_VIEW', response.data.account)
            console.log(response)
            return true
        } catch (err) {
            if(err.code) {
                console.log(err.code)
            }
            dispatch('openAlert', {message: 'You must write a proposal to go with your bid!', code: 'error'}, {root: true})

            console.log(err)
        }
    },

    setCurrentAccountInView({commit}, data) {
        commit('SET_CURRENT_ACCOUNT_IN_VIEW', data)
    },

    async addAccount({commit, dispatch}, data) {
        try {
            const response = await
            axios.post('/marketplace/create', data)
            dispatch('openAlert', {message: response.data.message, code: 'success'}, {root: true})
            return response.data
        } catch (err) {
            console.log(err)   
        }
    },

    async fetchMyAccounts({commit, dispatch}, data){
        try {
            // console.log(data)
            // const url = data.page ? '/account/get_mine?' + data.page : '/account/get_mine'

            const response = await
            axios.post('/marketplace/get_mine', data)
            commit('SET_MY_ACCOUNTS', response.data)
            console.log(response.data)
            return response.data
        } catch (err) {
            console.log(err)
            return true
        }
    },

    async updateAccount({commit, dispatch}, data) {
        try {
            const response = await
            axios.post('/marketplace/update', data)
            dispatch('openAlert', {message: response.data.message, code: 'success'}, {root: true})
            console.log(response)
            return response.status
        } catch (err) {
            console.log(err)   
        }
    },

    async deleteAccount({commit, dispatch}, data) {
        try {
            console.log('data', data)

            const response = await axios.delete('/marketplace/delete', {
                data: data 
            });
            dispatch('openAlert', {message: response.data.message, code: 'success'}, {root: true})
            dispatch('fetchMyAccounts', null, {root: true})
            dispatch('fetchDashboardDetails', null, {root: true})
            return response.status
        } catch (err) {
            console.log(err)   
        }
    },
}


const mutations = {
    SET_ACCOUNTS: (state, accounts) => (state.accounts = accounts),
    SET_ACCOUNTS_PAGINATION_DETAILS: (state, account_pagination_details) => (state.accounts_pagination_details = account_pagination_details),
    SET_CURRENT_ACCOUNT_IN_VIEW: (state, current_account_in_view) => (state.current_account_in_view = current_account_in_view),
    SET_MY_ACCOUNTS: (state, my_accounts) => (state.my_accounts = my_accounts)
}

export default {
    state, getters, actions, mutations
}

