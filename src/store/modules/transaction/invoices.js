import axios from 'axios'
import router from '../../../router'

const state = {
  invoice: {},
  debited_invoices: null,
  credited_invoices: null,
  current_invoice_details: null,
  network_in_deficit: null,
  credited_invoices_pagination_details: null,
  debited_invoices_pagination_details: null
}

const getters = {
  getCurrentViewInvoice: (state) => (state.invoice),
  getDebitedInvoices: (state) => (state.debited_invoices),
  getCreditedInvoices: (state) => (state.credited_invoices),
  getCurrentInvoiceDetails: (state) => (state.current_invoice_details),
  getNetworkInDeficit: (state) => (state.network_in_deficit),
  getCreditedInvoicesPaginatationDetails: (state) => (state.credited_invoices_pagination_details),
  getDebitedInvoicesPaginatationDetails: (state) => (state.debited_invoices_pagination_details)
}

const actions = {
  async createInvoice({dispatch}, data){
      try{
          const response = await
          axios.post('transaction/create_invoice', data)
          dispatch('openAlert', {message: response.data.message, code: 'success'}, {root: true})
          router.push('/dashboard')
          return false
        }catch(e){
          if(e.response){
            dispatch('handleError', {error: e, error_code: e.response.status, action: 'createInvoice'}, {root: true})
          } else {
            dispatch('handleError', {error: e, action: 'createInvoice'}, {root: true})
          }
          return false
        }
  },

  async getInvoice({dispatch, commit}, data){
      try{
          const response = await
          axios.post('transaction/get_invoice', data)
          commit('SET_CURRENT_VIEW_INVOICE', response.data[0].invoice)
          return false
        }catch(e){
          if(e.response){
            dispatch('handleError', {error: e, error_code: e.response.status, action: 'getInvoice'}, {root: true})
          } else {
            dispatch('handleError', {error: e, action: 'getInvoice'}, {root: true})
          }
          return false
        }
  },

  async getInvoices({commit, dispatch}){
      try{
          const response = await
          axios.get('transaction/get_invoices')
          commit('SET_DEBITED_INVOICES', response.data[0].debited_invoices)
          commit('SET_CREDITED_INVOICES', response.data[0].credited_invoices)
          // commit('SET_CURRENT_VIEW_INVOICE', response.data[0].invoice)
          return false
        }catch(e){
          if(e.response){
            dispatch('handleError', {error: e, error_code: e.response.status, action: 'getInvoices'}, {root: true})
          } else {
            dispatch('handleError', {error: e, action: 'getInvoices'}, {root: true})
          }
          return false
        }
  },

  async getInvoicesPaginated({commit, dispatch}, data){
    try{
      let page_url = data.link ? data.link :'/transaction/get_invoices_paginated'

      const response = await
      axios.post(page_url, data)
      if(data.credited){
          commit('SET_CREDITED_INVOICES', response.data.data)
          commit('SET_CREDITED_INVOICES_PAGINATIAON_DETAILS', response.data)
      } else {
          commit('SET_DEBITED_INVOICES', response.data.data)
          commit('SET_DEBITED_INVOICES_PAGINATIAON_DETAILS', response.data)
      }
      return false
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'getInvoicesPaginated'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'getInvoicesPaginated'}, {root: true})
      }
      return false
    }
},

  async markPaid({commit, dispatch}, data){
      try{
          const response = await
          axios.post('transaction/mark_paid', data)
          dispatch('openAlert', {message: response.data.message, code: 'success'}, {root: true})
          dispatch('toogleTaskChatViewInvoice', false, {root: true})
          
          router.push('/dashboard')
          return false
        }catch(e){
          if(e.response){
            dispatch('handleError', {error: e, error_code: e.response.status, action: 'markPaid'}, {root: true})
          } else {
            dispatch('handleError', {error: e, action: 'markPaid'}, {root: true})
          }
          return false
        }
  },
  
  async confirmPaid({commit, dispatch}, data){
    try{
        const response = await
        axios.post('transaction/confirm_paid', data)
        dispatch('openAlert', {message: response.data.message, code: 'success'}, {root: true})
        dispatch('toogleTaskChatViewInvoice', false, {root: true})
        router.push('/dashboard')
        return false
      }catch(e){
        if(e.response){
          dispatch('handleError', {error: e, error_code: e.response.status, action: 'confirmPaid'}, {root: true})
        } else {
          dispatch('handleError', {error: e, action: 'confirmPaid'}, {root: true})
        }
        return false
      }
},  

async fetchAllDoneFromBrokerToCreateInvoice({dispatch}, data){
  try{
      const response = await
      axios.post('transaction/get_all_done_by_me_from_from_broker_for_creating_invoice', data)
      return response.data
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAllDoneFromBrokerToCreateInvoice'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchAllDoneFromBrokerToCreateInvoice'}, {root: true})
      }
      return false
    }
},

async fetchAllDoneByWriterToCreateInvoice({dispatch}, data){
  try{
      const response = await
      axios.post('transaction/get_all_done_by_writer_for_creating_invoice', data)
      return response.data
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchAllDoneByWriterToCreateInvoice'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchAllDoneByWriterToCreateInvoice'}, {root: true})
      }
      return false
    }
},

  async fetchNetworkThatAreInDeficit({commit}){
    try{
      const response = await
      axios.get('transaction/get_network_in_deficit')
      commit('SET_NETWORK_IN_DEFICIT', response.data)
      return false
    }catch(e){
      if(e.response){
        dispatch('handleError', {error: e, error_code: e.response.status, action: 'fetchNetworkThatAreInDeficit'}, {root: true})
      } else {
        dispatch('handleError', {error: e, action: 'fetchNetworkThatAreInDeficit'}, {root: true})
      }
      return false
    }
  },

  setCurrentInvoiceId({commit}, details){
    commit('CURRENT_INVOICE_DETAILS', details)
  }
}

const mutations = {
  CURRENT_INVOICE_DETAILS: (state, details) => (state.current_invoice_details = details), 
  SET_CURRENT_VIEW_INVOICE: (state, invoice) => (
    state.invoice = invoice
  ),
  SET_DEBITED_INVOICES: (state, debited_invoices) => (
    state.debited_invoices = debited_invoices
  ),
  SET_CREDITED_INVOICES: (state, credited_invoices) => (
    state.credited_invoices = credited_invoices
  ),
  SET_NETWORK_IN_DEFICIT: (state, network_in_deficit) => (
    state.network_in_deficit = network_in_deficit
  ),
  SET_CREDITED_INVOICES_PAGINATIAON_DETAILS: (state, credited_invoices_pagination_details) => (
    state.credited_invoices_pagination_details = credited_invoices_pagination_details
  ),
  SET_DEBITED_INVOICES_PAGINATIAON_DETAILS: (state, debited_invoices_pagination_details) => (
    state.debited_invoices_pagination_details = debited_invoices_pagination_details
  )
}

export default {
    state,
    getters,
    actions,
    mutations
}
