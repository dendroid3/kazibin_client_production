<template>
  <v-row class="no-gutters mt-2">
    <content-tab
      :title="`posted`"
      :url="`Tasks/Posted`"
      :count="getDashboadDetails.posted.posted_all"
      :loading="!posted_fetched"
    />
    <content-tab
      :title="`underway`"
      :url="`Tasks/Posted/Underway`"
      :count="getDashboadDetails.posted.posted_underway"
      :loading="!posted_fetched"
    />
  
    <content-tab
      :title="`taken`"
      :url="`Tasks/Taken`"
      :count="getDashboadDetails.taken.taken_all"
      :loading="!taken_fetched"
    />
    <content-tab
      :title="`offers`"
      :url="`Offers`"
      :count="getDashboadDetails.offers.offers_all"
      :loading="!offers_fetched"
    />
    <content-tab
      :title="`bids`"
      :url="`Bids`"
      :count="getDashboadDetails.bids.bids_all"
      :loading="!bids_fetched"
      :isGreen="getDashboadDetails.bids.bids_is_green"
    />
    <content-tab
      :title="`network`"
      :url="`Network`"
      :count="getDashboadDetails.network_count"
      :loading="!liaisons_fetched"
    />
    <content-tab
      :title="`requests`"
      :url="`Requests`"
      :count="getDashboadDetails.requests_count"
      :loading="!requests_fetched"
    />
    <content-tab
      :title="`invoices`"
      :url="`Invoices`"
      :count="getDashboadDetails.invoices.invoices_count"
      :loading="!invoices_fetched"
    />
    <content-tab
      :title="`activity`"
      :count="getLogMessages ? getLogMessages.length : 0"
      :loading="!chats_fetched"
    />
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
import ContentTab from './ContentTab.vue'
export default {
  name: 'TabsStrip',
  props: [
    'posted_fetched',
    'taken_fetched',
    'offers_fetched', 
    'bids_fetched',
    'liaisons_fetched', 
    'invoices_fetched', 
    'chats_fetched',
    'requests_fetched'
  ],
  components:{
    ContentTab
  },
  computed:{
    ...mapGetters([
      'getAllTasksPostedByMe', 'getAllTasksDoneByMe', 'getMyWriters', 'getMyBrokers',
      'getMyBids', 'getMyOffers', 'getDashboadDetails', 'getLogMessages'
    ])
  }
}
</script>
