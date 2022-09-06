import axios from "axios";
import router from '../../../router'
const state = {
    dashboard_details: [],
    broker_metrics: {},
    writer_metrics: {}
}

const getters = {
    getDashboadDetails: (state) => (state.dashboard_details),
    getBrokerMetrics: (state) => (state.broker_metrics),
    getWriterMetrics: (state) => (state.writer_metrics),
}

const actions = {
    async fetchDashboardDetails({commit, dispatch}){
        try{
            const response = await
            axios.get('/profile/get_dashboard_details')
            console.log(response)
            commit('SET_DASHBOARD_DETAILS', response.data[0])
        } catch(e){
            if(e.response){
                dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchDashboardDetails'}, {root: true})
            } else {
                dispatch('handleError', {error: e, action: 'fetchDashboardDetails'}, {root: true})
            }
        }
    },
    
    async changeBio({dispatch}, data){
        try{
            const response = await
            axios.post('/profile/change_my_bio', data)
            console.log(response.data)
            dispatch('updateUserDetails', response.data, {root: true})
            return response.data
        } catch(e){
            if(e.response){
                dispatch('handleError', {error: e, error_code: e.response.status, action: 'changeBio'}, {root: true})
            } else {
                dispatch('handleError', {error: e, action: 'changeBio'}, {root: true})
            }
        }
    },  

    async changeAvailability({dispatch}, data){
        try{
            const response = await
            axios.post('/profile/change_availability', data)
            
            dispatch('updateUserDetails', response.data, {root: true})

            return response.data
        } catch(e){
            if(e.response){
                dispatch('handleError', {error: e, error_code: e.response.status, action: 'changeAvailability'}, {root: true})
            } else {
                dispatch('handleError', {error: e, action: 'changeAvailability'}, {root: true})
            }
        }
    }, 

    async setMyInterests({dispatch}, data){
        try{
            const response = await
            axios.post('/profile/set_my_interests', data)
            return response.data
        } catch(e){
            if(e.response){
                dispatch('handleError', {error: e, error_code: e.response.status, action: 'setMyInterests'}, {root: true})
            } else {
                dispatch('handleError', {error: e, action: 'setMyInterests'}, {root: true})
            }
        }
    },
    
    async fetchBrokerMetrics({commit, dispatch}, data){
        try{
            const response = await
            axios.post('/profile/get_broker_metrics', data)
            console.log(response)
            commit('SET_BROKER_METRICS', response.data[0])
        } catch(e){
            if(e.response){
                dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchBrokerMetrics'}, {root: true})
            } else {
                dispatch('handleError', {error: e, action: 'fetchBrokerMetrics'}, {root: true})
            }
        }
    },
    
    async fetchWriterMetrics({commit, dispatch}, data){
        try{
            const response = await
            axios.post('/profile/get_writer_metrics', data)
            console.log(response)
            commit('SET_WRITER_METRICS', response.data[0])
        } catch(e){
            if(e.response){
                dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchWriterMetrics'}, {root: true})
            } else {
                dispatch('handleError', {error: e, action: 'fetchWriterMetrics'}, {root: true})
            }
        }
    },

    setNewBidsDetails(commit){
        commit('SET_NEW_BID_DETAILS')
    }
}

const mutations = {
    SET_DASHBOARD_DETAILS: (state, details) => (
        state.dashboard_details = details
    ),
    SET_NEW_BID_DETAILS: (state) => (
        state.dashboard_details.bids.bids_all++,
        state.dashboard_details.bids.bids_is_green = true
    ),
    SET_BROKER_METRICS: (state, broker_metrics) => (
        state.broker_metrics = broker_metrics
    ),
    SET_WRITER_METRICS: (state, writer_metrics) => (
        state.writer_metrics = writer_metrics
    ),

 }

export default {
    state,
    getters,
    actions,
    mutations
}