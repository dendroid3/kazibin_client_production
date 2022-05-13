<template>
  <v-row class="no-gutters">
    <content-tab
      :title="`posted`"
      :count="(getAllTasksPostedByMe.tasks[0]) ? getAllTasksPostedByMe.tasks.length : 0"
      :loading="!posted_fetched"
    />
    <content-tab
      :title="`pending`"
      :count="0"
      :loading="!posted_fetched"
    />
    <content-tab
      :title="`paid`"
      :count="0"
      :loading="!posted_fetched"
    />
    <content-tab
      :title="`taken`"
      :count="(getAllTasksDoneByMe.tasks[0]) ? getAllTasksDoneByMe.tasks.length : 0"
      :loading="!taken_fetched"
    />
    <content-tab
      :title="`offers`"
      :count="0"
      :loading="!offers_fetched"
    />
    <content-tab
      :title="`bids`"
      :count="0"
      :loading="!bids_fetched"
    />
    <content-tab
      :title="`liaisons`"
      :count="0"
      :loading="!liaisons_fetched"
    />
    <content-tab
      :title="`invoices`"
      :count="0"
      :loading="!invoices_fetched"
    />
    <content-tab
      :title="`chats`"
      :count="0"
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
    'chats_fetched'
  ],
  components:{
    ContentTab
  },
  computed:{
    ...mapGetters(['getAllTasksPostedByMe', 'getAllTasksDoneByMe'])
  }
}
</script>
