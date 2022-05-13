<template lang="html">
  <div>
    I am view requests,
    <div v-for="(request, i) in getRequestsFromBrokers" :key="i" @click="go">
      {{request}}
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'View',
  computed: {
    ...mapGetters(['getRequestsFromBrokers'])
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
