import store from '../../index'
import router from '../../../router'

const state = {}

const getters = {}

const actions = {
    
  bootAllSockets({dispatch}){
    const events = [
      'BidMade',
      'BidPulled',
      'BidRejected',
      'OtherBidAccepted',
      'MyBidAccepted',
      'BidMessageSent',

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
      window.Echo.private('private_notification_' + store.state.auth.user.id)
      .listen(element, (e) => {
        console.log(e)

        if(element == 'BidMessageSent'){
          let second_stub = e.message.type == 'text' ? 
          "<br> <div class='pa-1 black--text my-2 white rounded'>" + e.message.message + "</div>" : 
          '<v-icon small class="blue--text">mdi-file</v-icon>'
          const alert_message = e.system_message + second_stub
    
          const notification_details = {
            message: alert_message,
            title: e.title
          }
          dispatch('notify', notification_details, { root: true })
        } else {
          dispatch('notify', e, { root: true })
        }

        dispatch('handle' + element, e, { root: true })

      })

    });
  },

  notify({}, notification_details){
    console.log('notification_details')
    console.log(notification_details)
    if(window.Notification){
      console.log('in notifications')
      Notification.requestPermission( permission => {
        let notification = new Notification(notification_details.title, {
          body: notification_details.message, // content for the alert
          // icon: "https://pusher.com/static_logos/320x320.png" // optional image 
          icon: "https://api.kazibin.adilirealestate.com/icon.svg"
        });
        console.log('permission')
        console.log(permission)
        notification.onclick = () => {
          window.open(process.env.VUE_APP_FRONT_END_URL);
        };
      })
    }
  },

  handleBidMessageSent({getters, dispatch}, e){
    let second_stub = e.message.type == 'text' ? 
      "<br> <div class='pa-1 black--text my-2 white rounded'>" + e.message.message + "</div>" : 
      '<v-icon small class="blue--text">mdi-file</v-icon>'

    const alert_message = e.system_message + second_stub

    if((getters.getBidChatHeader.id == e.message.bid_id) && (router.history.current.name == "BidChat")){
      const messages_array = [...getters.getBidMessages]
      messages_array.push(e.message)
      dispatch('setBidMessages', messages_array, { root: true })
    } else if((router.history.current.name == "Dashboard")) {
      
      dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})

      if(e.from_broker){
        dispatch('fetchMyBids', null, { root: true })
      } else {
        dispatch('fetchAllPostedByMe', null, { root: true })
      }
      
    } else if(router.history.current.name == "Bids" && e.from_broker){

      dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})
      const data = {}
      dispatch('fetchMyBidsPaginated', data, {root: true})

    } else {
      dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})
    }
  },

  handleBidMade({getters, dispatch}, e){

    dispatch('fetchAllPostedByMe', null, {root: true}).then(() => {
      if(getters.getTaskChatHeader.id == e.bid.task_id){
        const affected_task = getters.getAllTasksPostedByMe.filter((task) => (
          task.id == e.bid.task_id
        ))

        dispatch('setTaskChatHeader', affected_task[0], {root: true})
      }
    })

    dispatch('openAlert', {message: e.message, code: 'info', endpoint: 'Tasks/Posted'}, {root: true})
  },

  handleBidPulled({getters, dispatch}, e){
    dispatch('openAlert', {message: e.message, code: 'info', endpoint: 'Tasks/Posted'}, {root: true})

    if(getters.getBidChatHeader.id == e.bid_id && (router.history.current.name == "BidChat")){
      const bid = getters.getBidChatHeader
      bid.status = 2
      dispatch('setBidChatHeader', bid, {root: true})
    } else {
      dispatch('fetchAllPostedByMe', null, {root: true})
    }
  },

  handleBidRejected({getters, dispatch}, e){
    dispatch('openAlert', {message: e.message, code: 'info', endpoint: 'Bids'}, {root: true})
    if(getters.getBidChatHeader.id == e.bid_id && (router.history.current.name == "BidChat")){
      const bid = getters.getBidChatHeader
      bid.status = 3
      dispatch('setBidChatHeader', bid, {root: true})
    } else {
      dispatch('fetchMyBids', null, {root: true})
    }
  },

  handleOtherBidAccepted({getters, dispatch}, e){
    console.log(e)
    dispatch('openAlert', {message: e.message, code: 'info', endpoint: 'Bids'}, {root: true})
    if(getters.getBidChatHeader.id == e.bid_id && (router.history.current.name == "BidChat")){
      const bid = getters.getBidChatHeader
      bid.status = 5
      dispatch('setBidChatHeader', bid, {root: true})
    } else {
      dispatch('fetchAllDoneByMe', null, {root: true})
      dispatch('fetchMyBids', null, {root: true})
    }
  },

  handleMyBidAccepted({getters, dispatch}, e){    
    dispatch('openAlert', {message: e.message, code: 'info', endpoint: 'Bids'}, {root: true})
    if(getters.getBidChatHeader.id == e.bid_id && (router.history.current.name == "BidChat")){
      const bid = getters.getBidChatHeader
      bid.status = 4
      dispatch('setBidChatHeader', bid, {root: true})
    } else {
      dispatch('fetchAllDoneByMe', null, {root: true})
      dispatch('fetchMyBids', null, {root: true})
    }
  },
}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
}
