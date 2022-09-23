import axios from 'axios'
import router from '../../../router'

const state = {
  my_bids: null,
  bid_chat_header: null,
  bid_messages: null,
  current_bid_task: null,
  my_bids_pagination_details: null
}

const getters = {
  getMyBids: (state) => (state.my_bids),
  getBidChatHeader: (state) => (state.bid_chat_header),
  getBidMessages: (state) => (state.bid_messages),
  getCurrentBidTask: (state) => (state.current_bid_task),
  getMyBidsPaginationDetails: (state) => (state.my_bids_pagination_details)
}

const actions = {
  async createBid({dispatch,commit, getters}, data){
    try{
      const balance = getters.getDashboadDetails.transactions.balance
      console.log(balance)

      if(data.bid_cost > balance){
        dispatch('openAlert', {message: 'You do not have enough balance to send this bid, kindly top up and try again.', code: 'error'}, {root: true})
        return false
      }

      const response = await
      axios.post('/bid/create', data)
      
      dispatch('openAlert', {message: response.data.message, code: 'success'}, {root: true})
      dispatch('setNewBidsDetails', null, {root: true})
      dispatch('fetchDashboardDetails', null, {root: true})
      router.push('/Bids')
      return true
    } catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'createBid'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'createBid'}, {root: true})
      }
      return false
    }
  },

  async fetchMyBids({commit, dispatch}){
    try{
      const response = await
      axios.get('/bid/get_mine')
      commit('SET_MY_BIDS', response.data.bids)
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyBids'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchMyBids'}, {root: true})
      }
    }
  },

  async fetchMyBidsPaginated({commit, dispatch}, data){
    try{
      let page_url = data.link ? data.link :'/bid/get_mine_paginated'
      const response = await
      axios.post(page_url, data)
      commit('SET_MY_BIDS', response.data.data)
      commit('SET_MY_BIDS_PAGINATION_DETAILS', response.data)
    } catch (e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyBidsPaginated'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchMyBidsPaginated'}, {root: true})
      }
    }
  },

  async sendBidMessage({commit, getters, dispatch}, data){
    try{
      const response = await
      axios.post('/bid/send_message', data)
      
      if(!response.data.files){
        const messages_array = [...getters.getBidMessages]
        const new_message = response.data.message
        new_message.mine = true
        messages_array.push(new_message)
        commit('SET_BID_MESSAGES', messages_array)
      } else {
        const messages_array = [...getters.getBidMessages]
        response.data.messages.forEach(new_message => {
          new_message.mine = true
          messages_array.push(new_message)
        });
        commit('SET_BID_MESSAGES', messages_array)
      }
      return true
    }catch(e){
      console.log(e)
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'sendBidMessage'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'sendBidMessage'}, {root: true})
      }
      return true
    }
  },

  async fetchMessages({commit, dispatch}, data){
    try{
      const response = await 
      axios.post('/bid/get_messages', data)
      commit('SET_BID_MESSAGES', response.data.messages)
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'bid_fetchMessages'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'bid_fetchMessages'}, {root: true})
      }
    }
  },

  async acceptBid({commit, dispatch}, data){
    try{
      const response = await
      axios.post('/bid/accept', data)
      if(response.data.status == 200){
        dispatch('openAlert', {message: response.data.message, code: 'success'}, {root: true})
      }
      router.push('/Tasks/Posted')
      return true
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'acceptBid'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'acceptBid'}, {root: true})
      }
    }
  },

  async rejectBid({commit, dispatch}, data){
    try{
      const response = await
      axios.post('/bid/reject', data)
      dispatch('openAlert', {message: response.data.message, code: 'error'}, {root: true})
      router.push('/Tasks/Posted')
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'rejectBid'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'rejectBid'}, {root: true})
      }
    }
  },

  async pullBid({commit, dispatch}, data){
    try{
      const response = await
      axios.post('/bid/pull', data)
      dispatch('openAlert', {message: response.data.message, code: 'error'}, {root: true})
      dispatch('fetchDashboardDetails', null, {root: true})
      router.push('/Bids')
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'pullBid'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'pullBid'}, {root: true})
      }
    }
  },

  setBidChatHeader({commit}, bid){
    commit('SET_BID_CHAT_HEADER', bid)
  },

  setCurrentBidTask({commit}, task){
    commit('SET_CURRENT_BID_TASK', task)
  }
}

const mutations = {
  SET_MY_BIDS: (state, bids) => (state.my_bids = bids),
  SET_BID_CHAT_HEADER: (state, bid) => (state.bid_chat_header = bid),
  SET_BID_MESSAGES: (state, messages) => (state.bid_messages = messages),
  SET_CURRENT_BID_TASK: (state, task) => (state.current_bid_task = task),
  SET_MY_BIDS_PAGINATION_DETAILS: (state, my_bids_pagination_details) => (state.my_bids_pagination_details = my_bids_pagination_details)
}

export default {
  state,
  getters,
  actions,
  mutations
}
