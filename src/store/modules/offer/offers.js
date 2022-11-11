import axios from "axios";

const state = {
  my_offers: null,
  offer_chat_header: null,
  offer_messages: null,
  my_offers_pagination_details: null
}

const getters = {
  getMyOffers: (state) => (state.my_offers),
  getOfferChatHeader: (state) => (state.offer_chat_header),
  getOfferMessages: (state) => (state.offer_messages),
  getMyOffersPaginationDetails:(state) => (state.my_offers_pagination_details)
}

const actions = {
  async fetchTaskOffers({commit, dispatch}){
    try{
      const response = await
      axios.get('/offer/get_mine')
      commit('SET_TASK_OFFERS', response.data.offers)
      return true
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchTaskOffers'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchTaskOffers'}, {root: true})
      }
    }
  },

  async fetchMyOffersPaginated({commit, dispatch}, data){
    try{
      let page_url = data.link ? data.link :'/offer/get_mine_paginated'

      const response = await
      axios.post(page_url, data)
      commit('SET_TASK_OFFERS', response.data.data)
      commit('SET_TASK_OFFERS_PAGINATION_DETAILS', response.data)
      return true
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchMyOffersPaginated'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchMyOffersPaginated'}, {root: true})
      }
    }
  },

  setTaskOfferChatHeader({commit}, offer){
    commit('SET_TASK_OFFER_CHAT', offer)
  },

  async fetchTaskOfferMessages({commit, dispatch}, data){
    try{
      const response = await
      axios.post('/offer/get_messages', data)
      commit('SET_OFFER_MESSAGES', response.data.messages)
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchTaskOfferMessages'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchTaskOfferMessages'}, {root: true})
      }
    }
  },

  setOfferMessages({commit}, messages){
    commit('SET_OFFER_MESSAGES', messages)
  },

  async sendTaskOfferMessage({commit, getters, dispatch}, data){
    try{
      const response = await
      axios.post('/offer/send_message', data)
      if(!response.data.files){
        const messages_array = [...getters.getOfferMessages]
        const new_message = response.data.message
        new_message.mine = true
        messages_array.push(new_message)
        commit('PUSH_TASK_OFFER_MESSAGE', messages_array)
      } else {
        const messages_array = [...getters.getOfferMessages]
        response.data.messages.forEach(new_message => {
          new_message.mine = true
          messages_array.push(new_message)
        });
        commit('PUSH_TASK_OFFER_MESSAGE', messages_array)
      }
      return true
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'sendTaskOfferMessage'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'sendTaskOfferMessage'}, {root: true})
      }
      return true
    }
  },

  async acceptOffer({commit,dispatch}, data){
    try{
      const response = await
      axios.post('offer/accept', data)
      
      dispatch('openAlert', {message: response.data.message, code: 'success'}, {root: true})

      return false
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'acceptOffer'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'acceptOffer'}, {root: true})
      }
      return false
    }
  },

  async rejectOffer({commit, dispatch}, data){
    try{
      const response = await
      axios.post('offer/reject', data)
      dispatch('openAlert', {message: response.data.message, code: 'error'}, {root: true})
      return false
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'rejectOffer'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'rejectOffer'}, {root: true})
      }
      return false
    }
  },

  async cancelOffer({commit, dispatch}, data){
    try{
      const response = await
      axios.post('offer/cancel', data)
      dispatch('openAlert', {message: response.data.message, code: 'error'}, {root: true})
      return false
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'cancelOffer'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'cancelOffer'}, {root: true})
      }
      return false
    }
  },

}

const mutations = {
  SET_TASK_OFFERS: (state, offers) => (state.my_offers = offers),
  SET_TASK_OFFER_CHAT: (state, offer) => (
    state.offer_chat_header = offer
    // state.offer_chat_messages = 
  ),
  SET_OFFER_MESSAGES: (state, messages) => (state.offer_messages = messages),
  PUSH_TASK_OFFER_MESSAGE: (state, messages) => (state.offer_messages = messages),
  SET_TASK_OFFERS_PAGINATION_DETAILS: (state, my_offers_pagination_details) => (state.my_offers_pagination_details = my_offers_pagination_details)
}

export default {
  state,
  getters,
  actions,
  mutations
}
