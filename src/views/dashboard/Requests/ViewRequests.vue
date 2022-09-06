<template lang="html">
  <div class="main-wrapper grey lighten-3">
    <v-row class="d-flex grey lighten-2 align-center no-gutters">
      <v-col class="col-8 pl-4 backg"> requests
      </v-col>
    </v-row>
    <requests-card />

  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import RequestsCard from './RequestsCard.vue'
export default {
  name: 'ViewRequests',

  components:{RequestsCard},

  computed: {
    ...mapGetters(['getRequestsToAndFromBrokers', 'getRequestsToAndFromWWriters'])
  },

  methods: {
    ...mapActions(['setLiaisonRequestChat']),
    go(request){
      this.setLiaisonRequestChat(request)
      this.$router.push('/Request/Chat')
    }
  }
}
</script>
