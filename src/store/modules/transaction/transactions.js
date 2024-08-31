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
    async sendRequestToDeposit({dispatch},  data){
        try {
            const response = await
            axios.post('transaction/depositFromMpesa', data)
            dispatch('openAlert', {message: 'Mpesa transaction initiated. Kindly enter your Mpesa PIN to complete the transation.', code: 'success', timeout: 5000}, {root: true})
            return response
        } catch (e) {
            if(e.response){
                console.log('e.res is present')
                console.log(e.response.status)
                dispatch('openAlert', {message: e.response.data.message, code: 'error', timeout: 5000}, {root: true})

            } else {
                dispatch('handleError', {error: e, action: 'sendRequestToDeposit'}, {root: true})
            }
        }
    },

    async intitiateRequestToDeposit({dispatch}, data){
        const confirmation_message = `You do not have enough balance to ${data.action}. Your balance is ${0}, you require KES ${data.required_amount} more. Would you like to deposit?`

        if(!confirm(confirmation_message)){
            return
        }

        const phone_number = prompt("Enter the phone number you want to deposit from:")

        const truncated_phone_number = phone_number.toString().replace(/^0+(?=\d)/, '')

        if(Math.abs(phone_number.length) !== 10) {
            dispatch('openAlert', {message: 'Phone number must be 10 digits.', code: 'error', timeout: 5000}, {root: true})
            return
        }

        const deposit_data = {
            phone_number: '254' + truncated_phone_number,
            amount: data.required_amount
        }

        dispatch('sendRequestToDeposit', deposit_data, {root: true})

        return
    },

    async claimTransaction({dispatch}, data){
        try{
            const response = await
            axios.post('transaction/claim', data)
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