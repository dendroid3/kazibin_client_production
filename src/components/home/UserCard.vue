<template lang="html">
  <div class="right pa-2"  @click="view">
    <div class="username">
      {{(user.code) ? user.code : 'JH0P-5F65FG' }} 
    </div>
    <div class="username">
      {{ user.username}} 
    </div>
    <div class="username">
      {{writer ? 'Offered :: 18 ' : null}}
    </div>
    <div class="username">
      {{broker ? 'Posted :' : 'Taken :'}}: 9
    </div>
    <div class="username">
      {{broker ? 'Cancelled :: 1 ' : null}}
    </div>
    <div class="username">
      Rating :: 4
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
    ...mapActions(['setViewWriter']),
    view(){
      if(this.broker){
        alert("broker" + this.user.id)
        // setViewWriter
      } else {
        alert("writer" +this.user.id)
        this.setViewWriter(this.user)
        this.$router.push('/Writer/' + this.user.id)
      }
    }
  }
}
</script>
<style lang="css" scoped>
.right{
  border-right: solid 1px rgb(15,14,56);
  background-color: #e0e0e0;
  min-height: 5rem;
}
.username{
  font-size: 1rem;
  font-weight: 800;
  font-style: uppercase;
}
  
</style>
