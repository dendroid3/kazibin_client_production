import store from '../../index'

const state = {}

const getters = {}

const actions = {
    
  bootAllSockets({dispatch}){
    console.log('booting all sockets')

    const events = [
      'BidMade',
      'BidPulled',
      'BidRejected',
      'BidAccepted',
      'MyBidAccepted',
      'OfferMade',

      'OfferAccepted',
      'OtherOfferAccepted',
      'OfferPulled',
      'OfferRejected',
      'BidMessageEvent',
      'OfferMessageEvent',
      
      'TaskMessageEvent',
      'TaskMarkedCompleteEvent',
      'TaskEarmarkedForRevisionEvent',
      'TaskRatedEvent',
      'InvoiceCreatedEvent'
    ]
    events.forEach(element => {
      console.log('listening on ' + element)
      
      // dispatch('openAlert', {message: element}, {root: true})

      window.Echo.private('private_notification_' + store.state.auth.user.id,)
      .listen(element, (e) => {
        dispatch('handle' + element, e.system_message, { root: true })
        console.log()
        console.log(e)
      })
    });
  },

  handleBidMade({dispatch}, message){
      dispatch('openAlert', {message: message, code: 'success'}, {root: true})
  }
}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
}
