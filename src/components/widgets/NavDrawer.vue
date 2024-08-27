<template>
  <div class="mt-4 bold-2"  style="z-index: 999;">
    <v-list
      class=" text-uppercase"
      nav
    >
      <v-list-item-group
        class="row no-gutters"
        active-class="deep-blue--text red--text"
      >
          <div class="d-flex justify-center" style="width: 100%;"  v-if="getUser.username">
            <v-list-item-avatar
              class="elevation-20 tomato"
              tile
              size="120"
            >
            <div class="white--text">
                <span class="d-flex justify-center initials">
                  {{initials}}
                </span>
                <v-divider dark/>
                <span>
                  {{'broker'}}
                </span>
                <v-divider dark/>
                <span class="blue--text white pa-1 bold rounded">
                  {{getUser.credential_verification ? 'verified' : 'unverified'}}
                </span>
              </div>
            </v-list-item-avatar>
          </div>
    
        <v-list-item class="short-line-under" @click="goToSection('Verify')" v-if="!getUser.credential_verification">
          <v-list-item-title>
            {{'Verify AC'}}
          </v-list-item-title>
        </v-list-item>

        
        <v-list-item class="short-line-under" @click="goToSection('MyProfile')">
          <v-list-item-title>
            {{'Profile'}}
          </v-list-item-title>
        </v-list-item>

        <v-list-item class="short-line-under" @click="goToSection('')">
          {{'home'}}
        </v-list-item>

        <v-list-group class="short-line-under"
            no-action
        >
            <template v-slot:activator>
            <v-list-item >
                <v-list-item-title class="">{{'Dashboard'}}</v-list-item-title>
            </v-list-item>
            </template>

            <v-list-item
                v-for="(subbutton, i) in dashboard_links"
                :to="subbutton.page"
                :key="i"
            >
                <v-list-item-title v-text="subbutton.name" />
            </v-list-item>
        </v-list-group>
        
        <v-list-item class="short-line-under" @click="goToSection('Task/Add')">
          {{'Post Task'}}
        </v-list-item>
        
        <v-list-item class="short-line-under" @click="goToSection('Explore/Task')">
          {{'Explore Tasks'}}
        </v-list-item>
        
        <v-list-item class="short-line-under" @click="goToSection('marketplace')">
          {{'Marketplace'}}
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
        
        <v-list-item class="d-flex justify-end" @click="logoutUser">
          <v-btn small class="red white--text" :loading="logging_out">
            logout
          </v-btn>
        </v-list-item>
        
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
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
      logging_out: false,
      available: false,
      dashboard_links:[
        {name: 'main', page: '/Dashboard'},
        {name: 'tasks posted', page: '/Tasks/Posted'},
        {name: 'tasks taken', page: '/Tasks/Taken'},
        {name: 'tasks offered', page:'/Offers'},
        {name: 'bids made', page: '/Bids'},
        {name: 'network', page: '/Network'},
        {name: 'requests', page: '/Requests'},
        {name: 'invoices', page: '/Invoices'},
        {name: 'transactions', page: '/Transactions'}
      ]
    }
  },
  methods:{
    ...mapActions(['logout']),
    logoutUser(){
      let confirmation = "You are about to logout, you will be logged out in all other devices. Proceed?"
      if(!confirm(confirmation  )) {return}
      this.logging_out = true
      this.logout().then(() => (
        this.logging_out = false
      ))
    },
    go(code){
      this.$router.push(code)
    },
    goToSection(element_id){
      this.go('/' + element_id)
    },
  },
  mounted(){
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
    border-bottom: solid 1px white;
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