<template lang="html">
  <div class="mt-4 bold-2"  style="z-index: 999;">
    <v-list
      class=" text-uppercase"
      nav
     
    >
      <v-list-item-group
        class="row no-gutters"
        active-class="deep-blue--text red--text"
      >
          <v-list-item-avatar
            class="elevation-20 tomato"
            tile
            size="80"
          >
          <div class="white--text">
              <span class="d-flex initials">
                {{initials}}
              </span>
              <v-divider dark/>
              <span>
                {{'broker'}}
              </span>
            </div>
          </v-list-item-avatar>
        <!-- <v-list-item class="short-line-under">
          <v-row class="no-gutters d-flex align-center">
            <v-col class="col-9">
          {{'Availability'}}
            </v-col>
            <v-col class="col-3 d-flex">
              <div class="rounded white ml-3" style="height:0.5rem; width: 1.75rem;" v-if="available">
                <div style="" class="rounded animated_to_right"  :class="{
                }">
                </div>
              </div>
              <div class="rounded white ml-3" style="height:0.5rem; width: 1.75rem;" v-if="!available">
                <div style=" margin-left: 1rem;" class="rounded  animated_to_left"  :class="{
                }">
                </div>
              </div>
            </v-col>
          </v-row>
        </v-list-item>
       -->
        <v-list-item class="short-line-under" @click="goToSection('MyProfile')">
          {{'Profile'}}
        </v-list-item>

        <v-list-item class="short-line-under" @click="goToSection('Dashboard')">
          {{'Dashboard'}}
        </v-list-item>
        
        <v-list-item class="short-line-under" @click="goToSection('')">
          {{'home'}}
        </v-list-item>
        
        <v-list-item class="short-line-under" @click="goToSection('Task/Add')">
          {{'Post Task'}}
        </v-list-item>
        
        <v-list-item class="short-line-under" @click="goToSection('Explore/Task')">
          {{'Explore Tasks'}}
        </v-list-item>
        
        <v-list-item class="short-line-under" @click="goToSection('Explore/Writers')">
          {{'Discover Writers'}}
        </v-list-item>
        
        <v-list-item class="short-line-under" @click="goToSection('explore/Brokers')">
          {{'Discover Brokers'}}
        </v-list-item>
        
        <v-list-item class="short-line-under" @click="goToSection('About')">
        {{'About Us'}}
        </v-list-item>
        
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavDrawer',
  computed:{
    ...mapGetters(['getUser']),
    initials(){
      if(this.getUser){
        let str = this.getUser.username
        let matches = str.match( /\b(\w)/g )
        return matches.join('')
      } else  {
        return null
      }
    }
  },
  data(){
    return{
      available: false
    }
  },
  methods:{
    go(code){
      this.$router.push(code)
    },
    goToSection(element_id){
      this.go('/' + element_id)
    },
  },
  mounted(){
    setInterval(() => {
      this.available = !this.available
    }, 1000);
  }
}
</script>
<style lang="css" scoped>
  .short-line-under{
    /* background-color: #e0e0e0; */
    position: relative;
  }
  .short-line-under::after{
    content: '';
    border-bottom: solid 1px rgb(15,14,56);
    position: absolute;
    bottom: 0;
    width: 60%;
    left: 20%;
  } 
  .initials{
    font-size:3rem;
    font-weight: 900;
  }
</style>