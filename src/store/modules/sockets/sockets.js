import store from '../../index'

const state = {}

const getters = {}

const actions = {
    
  bootAllSockets({dispatch}){
    const events = ['BidMade', 'BidPulled', 'BidRejected', 'BidAccepted', 'MyBidAccepted', 'OfferMade', 
    'OfferAccepted', 'OtherOfferAccepted', 'OfferPulled', 'OfferRejected', 'BidMessageEvent', 'OfferMessageEvent', 
    'TaskMessageEvent', 'TaskMarkedCompleteEvent', 'TaskEarmarkedForRevisionEvent', 'TaskRatedEvent', 'InvoiceCreatedEvent']
    events.forEach(element => {
      
    //   dispatch('openAlert', {message: element, code: 'success'}, {root: true})

      window.Echo.private('private_notification_' + store.state.auth.user.id,)
      .listen(element, (e) => {
        dispatch('handle' + element, e, { root: true })
      })
    });
  },
}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
}
