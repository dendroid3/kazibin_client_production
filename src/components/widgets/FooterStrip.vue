<template lang="html">
  <div>
    <div class="grey lighten-4 pa-4">
      <div class="d-flex">
        <div class="half col-6">
          +254 797 72 72 53 <br>
          wanjohi@kazib.in <br>
          Paybill: 230945

        </div>
        <div class="col-6">
          DeHUB, DEKUT <br>
          09h street Nyeri <br>
          P.O.Box, 203-10103
        </div>
      </div>
      <div class="d-flex justify-center">
        <a class="link" @click="alert">
          learn more
        </a>
        <a class="link" @click="alert">
          get started
        </a>
        <a class="link" @click="alert">
          about us
        </a>
        <a class="link" @click="alert">
          contact us
        </a>
      </div>
      
      <div class="d-flex justify-center">
        <span class="" >
          made with 
          <v-icon small class="red--text">
            mdi-heart
          </v-icon>
          by
          <a class="white px-1 rounded bold" style="font-size: 0.8rem;" href="http://dehub.dkut.ac.ke">{{`WTNK`}}</a>
        </span>
      </div>
      <div class="d-flex align-center justify-center">
        <span class="mx-4 d-flex align-center" >
          <v-icon small>
            mdi-copyright
          </v-icon>
            {{year}} 
        <a class="mx-4" href="http://wta.nk">T&C apply</a>
        </span>
      </div>
      
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FooterStrip',
  computed:{
    ...mapGetters([]),
    year(){
      return '2022'
    }
  },
  methods: {
    alert(){
      alert('hey')
    }
  }
}
</script>
<style lang="css" scoped>
.link{
  text-decoration: underline;
  margin-left:0.3rem;
  margin-right:0.3rem;
}

.half{
  border-right: solid 1px rgb(15,14,56);
}

  
</style>
