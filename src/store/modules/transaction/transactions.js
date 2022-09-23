import axios from 'axios'

const state = {
    my_transactions: null,
    my_transactions_pagination_details: null
}

const getters = {
    getMyTransactions: (state) => (state.my_transactions),
    getMyTransactionsPaginationDetails: (state) => (state.my_transactions_pagination_details),
}

const actions = {
    async claimTransaction({dispatch}, data){
        try{
            const response = await
            axios.post('transaction/claim', data)
            console.log(response)
            if(response.data.error){
                dispatch('openAlert', {message: response.data.message, code: 'error', timeout: 5000}, {root: true})
                return true
            } else {
                dispatch('openAlert', {message: response.data.message, code: 'success'}, {root: true})
                dispatch('fetchDashboardDetails', null, {root: true})
                dispatch('fetchMyTransactions', null, {root: true})
                return false 
            }
        } catch(e) {
            if(e.response){
                dispatch('handleError', {error: e, error_code: e.response.status, action: 'claimTransaction'}, {root: true})
            } else {
                dispatch('handleError', {error: e, action: 'claimTransaction'}, {root: true})
            }
        }
    }, 

    async fetchMyTransactionsPaginated({commit, dispatch}, data){
        try{
            let page_url = data.link ? data.link :'/transaction/get_mine_paginated'
            const response = await
            axios.get(page_url)
            commit('SET_MY_TRANSACTIONS', response.data.data)
            commit('SET_MY_TRANSACTIONS_PAGINATION_DETAILS', response.data)
            return true
            
        } catch(e) {
            if(e.response){
                dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyTransactionsPaginated'}, {root: true})
            } else {
                dispatch('handleError', {error: e, action: 'fetchMyTransactionsPaginated'}, {root: true})
            }
        }
    },
    
    async fetchMyTransactions({commit, dispatch}){
        try{
            const response = await
            axios.get('transaction/get_mine')
            console.log(response)
            commit('SET_MY_TRANSACTIONS', response.data)
            return true
            
        } catch(e) {
            if(e.response){
                dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyTransactions'}, {root: true})
            } else {
                dispatch('handleError', {error: e, action: 'fetchMyTransactions'}, {root: true})
            }
        }
    }
}

const mutations = {
    SET_MY_TRANSACTIONS: (state, transactions) => (state.my_transactions = transactions),
    SET_MY_TRANSACTIONS_PAGINATION_DETAILS: (state, transactions_pagination_details) => (state.my_transactions_pagination_details = transactions_pagination_details),
}

export default {
    state,
    getters,
    actions,
    mutations
}