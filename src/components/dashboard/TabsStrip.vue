<template>
  <div>
    <v-row class="d-flex grey lighten-2 pl-2 pt-4 no-gutters" >
        <v-col class="col-8 primary-color-text title d-flex justify-start pointer" @click="goPage()"> 
          {{'overview'}}
        </v-col>
        <v-col class="col-4 d-flex justify-end px-4">
          <v-icon class="mx-2" v-show="!is_open" @click="is_open = true">
              mdi-arrow-down  
            </v-icon>
            <v-icon class="mx-2" v-show="is_open" @click="is_open = false">
              mdi-arrow-up  
            </v-icon>
        </v-col>
      </v-row>
    <v-row class="no-gutters mt-2">
      <content-tab
        v-show="is_open"
        :title="`posted`"
        :url="`tasks/posted`"
        :count="getDashboadDetails.posted.posted_all"
        :loading="!posted_fetched"
      />
    
      <content-tab
        v-show="is_open"
        :title="`taken`"
        :url="`tasks/taken`"
        :count="getDashboadDetails.taken.taken_all"
        :loading="!taken_fetched"
      />

      <content-tab
        v-show="is_open"
        :title="`offers`"
        :url="`offers`"
        :count="getDashboadDetails.offers.offers_all"
        :loading="!offers_fetched"
      />

      <content-tab
        v-show="is_open"
        :title="`bids`"
        :url="`bids`"
        :count="getDashboadDetails.bids.bids_all"
        :loading="!bids_fetched"
        :isGreen="getDashboadDetails.bids.bids_is_green"
      />
    
          <content-tab
        v-show="is_open"
        :title="`network`"
        :url="`network`"
        :count="getDashboadDetails.network_count"
        :loading="!liaisons_fetched"
      />

      <content-tab
        v-show="is_open"
        :title="`requests`"
        :url="`requests`"
        :count="getDashboadDetails.requests_count"
        :loading="!invoices_fetched"
      />
      <content-tab
        v-show="is_open"
        :title="`managed`"
        :url="`managed`"
        :count="getDashboadDetails.posted.posted_all"
        :loading="!posted_fetched"
      />    

      <content-tab
        v-show="is_open"
        :title="`marketplace`"
        :url="`marketplace/mine`"
        :count="getDashboadDetails.accounts.total"
        :loading="!accounts_fetched"
      />

      <content-tab
        v-show="is_open"
        :title="`services`"
        :url="`Accounts`"
        :count="getDashboadDetails.accounts.total"
        :loading="!accounts_fetched"
      />

      <content-tab
        v-show="is_open"
        :title="`invoices`"
        :url="`invoices`"
        :count="getDashboadDetails.invoices.invoices_count"
        :loading="!invoices_fetched"
      />
      
      <content-tab
        v-show="is_open"
        :title="`transactions`"
        :url="`Transactions`"
        :count="getDashboadDetails.transactions.count"
        :loading="!chats_fetched"
      />
      
      <content-tab
        v-show="is_open"
        :title="`activity`"
        :count="getLogMessages.length ? getLogMessages.length : 0"
        :loading="!chats_fetched"
      />
    </v-row>
  </div>
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
    'requests_fetched',
    'transactions_fetched',
    'accounts_fetched'
  ],
  components:{
    ContentTab
  },
  computed:{
    ...mapGetters([
      'getAllTasksPostedByMe', 'getAllTasksDoneByMe', 'getMyWriters', 'getMyBrokers',
      'getMyBids', 'getMyOffers', 'getDashboadDetails', 'getLogMessages'
    ])
  },
  data: () => {
    return {
      is_open: true
    }
  }
}
</script>
