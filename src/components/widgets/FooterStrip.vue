<template lang="html">
  <div>
    <div class="primary-color white--text px-4 main-wrapper-local">
      <div class="d-flex">
        <div class="half col-6">
          +254 700 000 000 <br>
          SUPPORT@KAZIBIN.COM <br>
          TILL #: 000000

        </div>
        <div class="col-6">
          328 GREENVILLE. <br>
          NAIROBI <br>
          P.O.BOX, 00-0000
        </div>
      </div>
      <div class="d-flex justify-center">
        <a class="link" @click="alert">
          tutorials
        </a>
        <a class="link" @click="alert">
          bug report
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
          <v-icon small class="white--text">
            mdi-copyright
          </v-icon>
            {{year}} 
        <router-link to="/TermsAndConditions" class="text mx-4"> T&C apply </router-link>
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
  border-right: solid 3px white;
}

.main-wrapper-local{
  padding-bottom: 5rem;
  padding-top: 2rem;
}
</style>
