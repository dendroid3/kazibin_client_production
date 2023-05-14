<template lang="html">
  <div class="right-person pa-2 pointer"  @click="view">
    <div class="username">
      {{(user.code) ? user.code + ": " + user.username: null }} 
    </div>
    <div class="username">
      {{broker ? 'Posted :: ' + user.total_tasks : 'Taken :: ' + user.total_tasks}}
    </div>
    <div class="username">
      {{broker ? 'Available :: ' + user.available_tasks : 'Underway :: ' + user.underway_tasks }}
    </div>
    <div class="username">
      {{'Cancelled :: ' + user.cancelled_tasks}}
    </div>
    <div class="username">
      {{broker ? 'Writers :: ' + user.writers : "Brokers :: " + user.brokers}}
    </div>
    <!-- <div class="username">
      Dennis Mwangi | Dennis Mwangi | Dennis Mwangi | Dennis Mwangi | Dennis Mwangi
    </div> -->
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserCard',
  props: [
    'user',
    'writer',
    'broker'
  ],
  methods:{
    ...mapActions(['setViewWriter', 'setViewBroker']),
    view(){
      if(this.broker){
        this.setViewBroker(this.user)
        this.$router.push('/broker/' + this.user.code)
      } else {
        // alert("writer" +this.user.code)
        this.setViewWriter(this.user)
        this.$router.push('/writer/' + this.user.code)
      }
    }
  }
}
</script>
<style lang="css" scoped>
.right-person{
  border-right: solid 1px rgb(15,14,56);
  background-color: #e0e0e0;
  min-height: 5rem;
  height: 100%;
}
.username{
  font-size: 1rem;
  font-weight: 800;
  font-style: uppercase;
}
  
</style>
