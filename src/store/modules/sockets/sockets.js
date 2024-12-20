import store from '../../index'
import router from '../../../router'

const state = {}

const getters = {}

const actions = {
    
  bootAllSockets({dispatch}){
    console.log("Listening on ")

    const events = [
      'BidMade', //done
      'BidPulled', //done
      'BidRejected', //done
      'OtherBidAccepted', //done
      'MyBidAccepted', //done
      'BidMessageSent',  //done

      'OfferMade', //done
      'OfferAccepted', //done
      'OtherOfferAccepted', //done ?
      'OfferCancelled', //done
      'OfferRejected', //done
      'OfferMessageSent', //done
      
      'TaskMessageSent', //done
      'TaskMarkedComplete', //done 
      'TaskEarmarkedForRevisionEvent', //???
      'TaskRated', 
      'InvoiceCreated', //done

      'MpesaTransactionComplete'
    ]

    if(store.state.auth.user.id){
      events.forEach(event => {
        window.Echo.private('private_notification_' + store.state.auth.user.id)
        .listen(event, (e) => {
          if(event == 'BidMessageSent' || event == 'OfferMessageSent' || event == 'TaskMessageSent'){
            let second_stub = e.message.type == 'text' 
            ? e.message.message 
            :'{file}'
            const alert_message = e.system_message +"\n\n" + second_stub + "\n\n"
            const notification_details = {
              message: alert_message,
              title: e.title,
              id: e.id,
              type: event
            }
            dispatch('notify', notification_details, { root: true })
          } else if(event == 'OfferMade' || event == 'OfferAccepted' || event == 'OfferRejected' || event == 'OfferCancelled') {
            const notification_details = {
              message: e.system_message,
              title: e.title
            }
            dispatch('notify', notification_details, { root: true })
          } else if(event == 'MpesaTransactionComplete') {
            const notification_details = {
              message: e.message,
              title: 'Mpesa Transaction Complete'
            }

            dispatch('notify', notification_details, { root: true })
          } else {
            dispatch('notify', e, { root: true })
          }

          dispatch('handle' + event, e, { root: true })

        })

      });
    }

    
    window.Echo.channel('public_notifications')
    .listen(event, (e) => {
        dispatch('fetchTotalAvailableTasks', null, { root: true })
    })
  },

  notify({}, notification_details){p
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(notification_details.title, {
            body: notification_details.message, 
            // icon: "http://localhost:8000/icon.svg",
            // requireInteraction: true,
            // tag: "vibration-sample",
          });
        });
      }
    })
    // if(window.Notification){
    //   // ServiceWorkerRegistration.
    //   Notification.requestPermission( permission => {
    //     let notification = showNotification(notification_details.title, {
    //       body: notification_details.message, 
    //       icon: "http://localhost:8000/icon.svg",
    //       requireInteraction: true
    //     });
    //     notification.onclick = () => {
    //       if(notification_details.type == 'TaskMessageSent'){
    //         window.open(process.env.VUE_APP_FRONT_END_URL + '/t/' + notification_details.id);
    //       }
    //     };
    //   })


    // }
  },

  handleMpesaTransactionComplete({dispatch}, e){
    dispatch('fetchDashboardDetails', {}, {root: true})
    dispatch('fetchMyTransactions', {}, {root: true})
    dispatch('fetchLogMessages', {}, {root: true})
    dispatch('openAlert', {message: e.message, code: e.code}, {root: true})
  },

  handleBidMessageSent({getters, dispatch}, e){
    let second_stub = e.message.type == 'text' ? 
      "<br> <div class='pa-1 black--text my-2 white rounded'>" + e.message.message + "</div>" : 
      '<v-icon small class="blue--text">mdi-file</v-icon>'

    const alert_message = e.system_message + second_stub

    if((router.history.current.name == "BidChat")){

      if(getters.getBidChatHeader.id == e.message.bid_id){
        const messages_array = [...getters.getBidMessages]
        messages_array.push(e.message)
        dispatch('setBidMessages', messages_array, { root: true })
      } else {
        dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})
      }

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
    dispatch('openAlert', {message: e.message, code: 'info', endpoint: 'Bids'}, {root: true})
    if(getters.getBidChatHeader.id == e.bid_id && (router.history.current.name == "BidChat")){
      const bid = getters.getBidChatHeader
      bid.status = 5
      dispatch('setBidChatHeader', bid, {root: true})
    } else {
      dispatch('fetchMyBids', null, {root: true})
    }
  },

  handleOtherOfferAccepted({getters, dispatch}, e){
    dispatch('openAlert', {message: e.system_message, code: 'info', endpoint: 'Offers'}, {root: true})
    if(getters.getOfferChatHeader.id == e.offer_id && (router.history.current.name == "OfferChat")){
      const offer = getters.getOfferChatHeader
      offer.status = 5
      dispatch('setTaskOfferChatHeader', offer, {root: true})
    } else {
      dispatch('fetchTaskOffers', null, {root: true})
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

  handleTaskMessageSent({getters, dispatch}, e){
    let second_stub = e.message.type == 'text' ? 
      "<br> <div class='pa-1 black--text my-2 white rounded'>" + e.message.message + "</div>" : 
      '<v-icon small class="blue--text">mdi-file</v-icon>'

    const alert_message = e.system_message + second_stub

    if((router.history.current.name == "TaskChat")){

      if(getters.getTaskChatHeader.id == e.message.task_id){
        const messages_array = [...getters.getTaskMessages]
        messages_array.push(e.message)
        dispatch('setTaskMessages', messages_array, { root: true })
      } else {
        dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})
      }

    } else if((router.history.current.name == "Dashboard")) {
      
      dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})

      if(e.from_broker){
        dispatch('fetchAllDoneByMe', null, { root: true })
      } else {
        dispatch('fetchAllPostedByMe', null, { root: true })
      }
      
    } else if(router.history.current.name == "TakenTasks" && e.from_broker){

      dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})
      const data = {}
      dispatch('fetchAllDoneByMePaginated', data, {root: true})

    } else if(router.history.current.name == "PostedTasks" && !e.from_broker){

      dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})
      const data = {}
      dispatch('fetchAllPostedByMePaginated', data, {root: true})

    } else {
      dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})
    }
  },

  handleOfferMessageSent({getters, dispatch}, e){
    let second_stub = e.message.type == 'text' ? 
      "<br> <div class='pa-1 black--text my-2 white rounded'>" + e.message.message + "</div>" : 
      '<v-icon small class="blue--text">mdi-file</v-icon>'

    const alert_message = e.system_message + second_stub

    if((router.history.current.name == "OfferChat")){

      if(getters.getOfferChatHeader.id == e.message.taskoffer_id){
        const messages_array = [...getters.getOfferMessages]
        messages_array.push(e.message)
        dispatch('setOfferMessages', messages_array, { root: true })
      } else {
        dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})
      }

    } else if((router.history.current.name == "Dashboard")) {
      
      dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})

      if(e.from_broker){
        dispatch('fetchTaskOffers', null, { root: true })
      } else {
        dispatch('fetchAllPostedByMe', null, { root: true })
      }
      
    } else if(router.history.current.name == "Offers" && e.from_broker){

      dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})
      const data = {}
      dispatch('fetchMyOffersPaginated', data, {root: true})

    } else if(router.history.current.name == "Posted" && !e.from_broker){

      dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})
      const data = {}
      dispatch('fetchAllPostedByMePaginated', data, {root: true})

    } else {
      dispatch('openAlert', {message: alert_message, code: 'info'}, {root: true})
    }
  },
  
  handleTaskMarkedComplete({getters, dispatch}, e){
    dispatch('fetchDashboardDetails', null, {root: true})

    if((router.history.current.name == "TaskChat")){

      if(getters.getTaskChatHeader.id == e.message.task_id){

        const messages_array = [...getters.getTaskMessages]
        messages_array.push(e.message)
        dispatch('setTaskMessages', messages_array, { root: true })

        let task_header = getters.getTaskChatHeader
        task_header.status = 3
        dispatch('setTaskChatHeader', task_header, {root: true})


      } else {
        dispatch('openAlert', {message: e.system_message, code: 'info'}, {root: true})
      }

    } else if((router.history.current.name == "Dashboard")) {
      
      dispatch('openAlert', {message: e.system_message, code: 'info'}, {root: true})

      if(e.from_broker){
        dispatch('fetchAllDoneByMe', null, { root: true })
      } else {
        dispatch('fetchAllPostedByMe', null, { root: true })
      }
      
    } else if(router.history.current.name == "TakenTasks" && e.from_broker){

      dispatch('openAlert', {message: e.system_message, code: 'info'}, {root: true})
      const data = {}
      dispatch('fetchAllDoneByMePaginated', data, {root: true})

    } else if(router.history.current.name == "PostedTasks" && !e.from_broker){

      dispatch('openAlert', {message: e.system_message, code: 'info'}, {root: true})
      const data = {}
      dispatch('fetchAllPostedByMePaginated', data, {root: true})

    } else {
      dispatch('openAlert', {message: e.system_message, code: 'info'}, {root: true})
    }
  },
  
  handleInvoiceCreated({getters, dispatch}, e){
    dispatch('openAlert', {message: e.system_message, code: 'info'}, {root: true})
    dispatch('fetchDashboardDetails', null, {root: true})
    if((router.history.current.name == "TaskChat")){
      let task_signatures_array = e.tasks_signature.split("_")
      const exists = task_signatures_array.includes(getters.getTaskChatHeader.id)
      if(exists){
        const data = {
          task_id: getters.getTaskChatHeader.id
        }
        dispatch('fetchTaskMessages', data, {root: true})
      }
    } else if((router.history.current.name == "Invoices")){
      dispatch('getInvoicesPaginated', null, {root: true})
    } else {
      dispatch('getInvoices', null, {root: true})
    }
  },

  handleOfferMade({dispatch}, e){
    dispatch('openAlert', {message: e.system_message, code: 'info'}, {root: true})
    dispatch('fetchDashboardDetails', null, {root: true})
    if(router.history.current.name == "Offers"){
      dispatch('fetchMyOffersPaginated', null, {root: true})
    } else {
      dispatch('fetchTaskOffers', null, {root: true})
    }
  },

  handleOfferAccepted({getters, dispatch}, e){
    dispatch('openAlert', {message: e.system_message, code: 'info'}, {root: true})
    dispatch('fetchDashboardDetails', null, {root: true})

    if(router.history.current.name == "Offers"){
      dispatch('fetchMyOffersPaginated', null, {root: true})
    } else if(router.history.current.name == "Dashboard"){
      dispatch('fetchTaskOffers', null, {root: true})
    } else if(router.history.current.name == "OfferChat"){
      if(getters.getOfferChatHeader.id == e.offer_id){
        const offer = getters.getOfferChatHeader
        offer.status = 4

        dispatch('setTaskOfferChatHeader', offer, {root: true})
      }
    }

  },

  handleOfferRejected({getters, dispatch}, e){
    dispatch('openAlert', {message: e.system_message, code: 'info'}, {root: true})
    dispatch('fetchDashboardDetails', null, {root: true})

    if(router.history.current.name == "Offers"){
      dispatch('fetchMyOffersPaginated', null, {root: true})
    } else if(router.history.current.name == "Dashboard"){
      dispatch('fetchTaskOffers', null, {root: true})
    } else if(router.history.current.name == "OfferChat"){
      if(getters.getOfferChatHeader.id == e.offer_id){
        const offer = getters.getOfferChatHeader
        offer.status = 3

        dispatch('setTaskOfferChatHeader', offer, {root: true})
      }
    }

  },

  handleOfferCancelled({getters, dispatch}, e){
    dispatch('openAlert', {message: e.system_message, code: 'info'}, {root: true})
    dispatch('fetchDashboardDetails', null, {root: true})

    if(router.history.current.name == "Offers"){
      dispatch('fetchMyOffersPaginated', null, {root: true})
    } else if(router.history.current.name == "Dashboard"){
      dispatch('fetchTaskOffers', null, {root: true})
    } else if(router.history.current.name == "OfferChat"){
      if(getters.getOfferChatHeader.id == e.offer_id){
        const offer = getters.getOfferChatHeader
        offer.status = 2

        dispatch('setTaskOfferChatHeader', offer, {root: true})
      }
    }

  }
}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
}
