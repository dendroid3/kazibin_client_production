<template>
  <v-app class="app grey lighten-3" style="height:100vh; overflow-y: hidden;">
    <v-toolbar class="primary-color"
      v-if="show_nav_bar"
      :color="`rgb(15,14,56)`"
      flat
      dense
      height="50"
      style="z-index: 1; position: fixed; left: 0; right: 0;"
    >

      <div class="d-flex rounded align-center white pointer pr-2" @click="goHome"> 
        <v-img class="icon" :src="require(`./assets/icon.svg`)" contain />
        <span class="bold">
          kazibin
        </span>
      </div>
      
      <v-spacer></v-spacer>

      <section v-if="getUser">
        <div v-if="!getUser.email">
          <router-link to="/register" class="text mr-4" style="text-decoration: none; color: white;"> register </router-link>
          <router-link to="/login" class="text" style="text-decoration: none; color: white;"> login </router-link>
        </div>

      <v-icon class="white--text ml-2 rounded pa-1" @click="home_drawer = !home_drawer"
      v-if="($vuetify.breakpoint.sm || $vuetify.breakpoint.xs) && getUser.email">
        mdi-menu
      </v-icon>

      <span class="white--text pointer"
        v-bind="attrs"
        v-on="on"
        v-if="($vuetify.breakpoint.md || $vuetify.breakpoint.xl || $vuetify.breakpoint.lg) && logging_out">
          {{'logging out'}}
      </span>
      <v-btn loading text small class="white--text" style="background: rgb(15,14,56);" 
      v-if="($vuetify.breakpoint.md || $vuetify.breakpoint.xl || $vuetify.breakpoint.lg) && logging_out"></v-btn>

      <v-menu 
        v-if="($vuetify.breakpoint.md || $vuetify.breakpoint.xl || $vuetify.breakpoint.lg) && !logging_out"
        transition="slide-y-transition"
        bottom
        open-on-hover>
        <template v-slot:activator="{ on, attrs }">
        <span class="white--text pointer"
          v-bind="attrs"
          v-on="on"
          v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.xl || $vuetify.breakpoint.lg">
            {{getUser.email}}
        </span>
        </template>
        <v-list>
            <v-list-item
            @click="logoutUser"
            class="pointer">
            {{logging_out ? 'logging out..' : 'log out'}}
            </v-list-item>
        </v-list>
        </v-menu>
    </section>

    </v-toolbar>

    <v-navigation-drawer
    v-if="getUser"
    class="grey lighten-2"
    v-model="home_drawer"
    temporary
    clipped 
    right
    fixed
    width="80%"
    >
      <div class="d-flex justify-end">
        <div class="white pa-2 rounded" @click="home_drawer=false" style="position: fixed; top: 0; right: 0; z-index:900;">
          <v-icon class="red--text">
            mdi-close
          </v-icon>
        </div>
      </div>
      <nav-drawer />
    </v-navigation-drawer>
      <alert-box />
    <v-main class="main grey lighten-3">
      <v-container fluid class="pa-0">
        <v-row class="no-gutters"  style="padding-top: 50px;">
          <v-col class="col-md-1 col-lg-1" v-if=" ($vuetify.breakpoint.lg || $vuetify.breakpoint.md) && show_nav_bar" style="height: calc(100vh-50px); overflow-y: hidden;">
            <farleft-sidebar />
          </v-col>
          <v-col class="col-md-4 grey lighten-2  px-4" v-if=" ($vuetify.breakpoint.lg  || $vuetify.breakpoint.md) && show_nav_bar && getUser && show_left_mid_side_bar" style="height: calc(100vh - 50px); overflow-y: hidden;">
            <midleft-sidebar />
          </v-col>
          <v-col style="width: 100; height:100vh; overflow-y: auto; padding-bottom: 0rem;"  class="pa left-border" :class="{
            'pull-up': !show_nav_bar
          }">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import LoaderWidget from './components/widgets/LoaderWidget.vue'
import AlertBox from './components/widgets/AlertBox.vue'
import NavDrawer from './components/widgets/NavDrawer.vue'
import FarleftSidebar from './views/desktop/FarleftSidebar.vue';
import MidleftSidebar from './views/desktop/MidleftSidebar.vue';
import Cookies from 'js-cookie'

export default {
  name: 'App',

  components:{LoaderWidget, AlertBox, NavDrawer, FarleftSidebar, MidleftSidebar},

  computed: {
    ...mapGetters(['isLoading', 'getUser', 'getHideShowMidLeftSidebar']),
    isGuest(){
      return true
    },

    show_left_mid_side_bar(){
      if(!this.getHideShowMidLeftSidebar){
        return false
      } 
      return this.getHideShowMidLeftSidebar
    }

  },

  data(){
    return{
      available: false,
      home_drawer: false,
      show_nav_bar: true,
      logging_out: false
    }
  },

  methods:{
    ...mapActions(['bootAllSockets', 'logout']),
    logoutUser(){
      let confirmation = "You are about to logout, you will be logged out in all other devices. Proceed?"
      if(!confirm(confirmation  )) {return}
      this.logging_out = true
      this.logout().then(() => (
        this.logging_out = false
      ))
    },
    goHome(){
      if(this.getUser){
        this.$router.push('/')
      } else {
        window.location.href="https://kazibin.adilirealestate.com"
      }
    },

    go(code){
      this.$router.push('/' + code)
    },

    showNavBar(){
      if(this.$router.history.current.name == "Login" ){
        return false
      } else if(this.$router.history.current.name == "Register"){
        return false
      } else if(this.$router.history.current.name == "VerifyEmail"){
        return false
      } else if(this.$router.history.current.name == "Verify"){
        return false
      } else if(this.$router.history.current.name == "PasswordResetApplication"){
        return false
      } else if(this.$router.history.current.name == "ResetPassword"){

      }
       else {
        return true
      }
    }
  },
  updated(){
    this.show_nav_bar = this.showNavBar()
  },
  created(){
    this.show_nav_bar = this.showNavBar()
    if(JSON.parse(Cookies.get('KAZIBIN_TOKEN')).auth.token){
      this.bootAllSockets()
    }
  }
};
</script>
<style lang="css">
 @media only screen and (min-width: 960px) {
    .left-border{
      border-left: 1px white solid;
    }
  }
  .pull-up{
    margin-top: -50px;
  }

  .col-block{
    position: relative;
  }
  .col-block::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
 .underline{
    text-decoration: underline;
  }
  a{
    text-decoration: none;
  }

  .bold-tiny{
    font-weight: 900;
    font-size: 0.9rem;
    cursor: pointer;
  }
  html{
    font-family: dosis;
    height: 50vh;
    overflow: auto;
  }
  #app{
    padding: 0;
    margin: 0;
    height: 50vh;
    font-family: dosis;
  }
  .app{
    height: 50vh;
  }
  .icon{
    height: 2rem; 
    width: 2rem;
  }
  .main{
    overflow-x: hidden;
    /* margin-top: 2rem; */
  }
  .title{
    display: flex;
    width: 100%;
    text-justify: center;
    justify-content: center;
    justify-items: center;
  }
  .app-bar{
    z-index: 920;
  }
  .bold{
    font-weight: 800;
    font-size: 1.2rem;
  }
.redlist{
    background-color: rgb(231, 231, 231); 
    border-left: solid 5px red;
  }
  .redtext{
    color: red;
  }
  .purpletext{
    color: purple;
  }
  .greentext{
    color: green;
  }
  .link{
    color: blue;
    text-decoration: underline;
  }
  .purplelist{
    background-color: rgb(231, 231, 231); 
    border-left: solid 5px rgb(161, 1, 161);
  }
  .greenlist{
    background-color: rgb(231, 231, 231); 
    border-left: solid 5px green;
  }
  .main-wrapper{
    padding-bottom: 5rem;
    min-height: calc(100vh - 50px);
  }
  .padder{
    margin: 1rem 2rem;
    padding: 1rem 0;
    animation: tada; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 2s;
    animation-delay: 2s;
    animation-iteration-count: 3;
  }
  .padded{
    background-color: rgb(228, 227, 227);
    padding: 1rem 1rem;
    font-size: 0.8rem;
    border-radius: 3%;
  }

  .full-width{
    width: 100vw;
    overflow-x: hidden;
  }
  .large-width{
    width: 58.3333vw;
    overflow-x: hidden;
  }
  .medium-width{
    width: 83.333vw;
    overflow-x: hidden;
  }
  .top-toolbar{
    padding-bottom: 5rem; 
    position: fixed; 
    top: 50px; 
    right: 0; 
    z-index: 1;
  }

  .bottom-toolbar{
    padding-bottom: 5rem; 
    position: fixed; 
    bottom: 0; 
    right: 0;
  }
  
  .bottom{
    height: 10rem;
  }

  .yellowlist{
    background-color: rgb(231, 231, 231); 
    border-left: solid 5px yellow;
  }
  .blacklist{
    background-color: rgb(231, 231, 231); 
    border-left: solid 5px black;
  }
  .orangelist{
    background-color: rgb(231, 231, 231); 
    border-left: solid 5px orangered;
  }

  .orange--text{
    color: orangered
  }
  
  .full-page{
    position: fixed; 
    top:0; height:100vh;
    width:100vw; 
    z-index: 999;
  }

  .attach{
    position: fixed; 
    bottom: 3.5rem; 
    right: 0.25rem;
  }
  .send{
    position: fixed; 
    bottom: 0.25rem; 
    right: 0.25rem;
  }

  .primary-color{
    background-color: rgb(15,14,56);
  }
  .primary-color-text{
    color: rgb(15,14,56);
  }

  .tomato-text{
    color: tomato;
  }

  .tomato{
    background-color: tomato;
  }

  .pop{
    /* background-color: red; */
    border-radius: 10%;
    animation-name: popper;
    animation-duration: 2s;
    animation-direction: linear;
    animation-iteration-count: 1;
  }

  @keyframes popper {
  0%{ border-radius: 10%; background-color: red; opacity: 0.5;}
  25%{ border-radius: 10%; background-color: green; opacity: 1;}
  50%{ border-radius: 10%; background-color: green; opacity: 0.5;}
  75%{ border-radius: 10%; background-color: green; opacity: 0;}
  100%{ border-radius: 10%; background-color: green; opacity: 0.5;}
  }
  
  @keyframes fixed-1 {
    0%{ }
    25%{ }
    50%{  color: rgb(98, 0, 255);}
    100%{ }
  }

  .tomato{
    background-color: tomato;
  }

  .heading{
    font-size: 1.5rem;
    font-weight: 800;
    padding-left: 0.5rem;
  }

  .subtitle{
    font-size: 1.5rem;
  }

  .submit-button{
    width:70%;
  }

  .pointer{
    cursor: pointer;
  }
  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }
  
  .bottom-toolbar{
    width: 100%;
  }
  .main-wrapper{
  overflow-x: hidden;
  padding-bottom: 5rem;
  }  
  
  .orangeredtext{
    color: orangered;
  }
  /* backg2 */
  .animated_to_right{
    animation-name: animated_to_right_animation;
    animation-duration: 1s;
    background: green;
    animation-direction:linear;
    animation-iteration-count: 1;
    height:0.8rem; 
    width:0.75rem; 
    margin-top: -0.2rem;
  }
  @keyframes animated_to_right_animation {
    0%{background: red;}
    50%{
      height:1rem; 
      width:0.75rem; 
      margin-top: -0.25rem;
    }
    100% {transform: translate(1rem, 0); background: green;}
  }
  .animated_to_left{
    animation-name: animated_to_left_animation;
    animation-duration: 1s;
    background: red;
    animation-direction:linear;
    height:0.8rem; width:0.75rem; margin-top: -0.2rem;
    animation-iteration-count:1;
  }
  @keyframes animated_to_left_animation {
    0%   {background: green;}
    
    50%{
      height:1rem; 
      width:0.75rem; 
      margin-top: -0.25rem;
    }
    100% {transform: translate(-1rem, 0); background: red;}
  }

  
@media only screen and (min-width: 960px) {
  ::-webkit-scrollbar {
    width: 0px;
    background: white;
  }

  ::-webkit-scrollbar:hover {
    width: 0px;
    background: white;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: rgb(15,14,56);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    display: none;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(15,14,56);
    display: block;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }
  td,
  th {
    padding: 0;
  }
  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
  }
  .table > thead > tr > th,
  .table > tbody > tr > th,
  .table > tfoot > tr > th,
  .table > thead > tr > td,
  .table > tbody > tr > td,
  .table > tfoot > tr > td {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
  }
  .table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 2px solid #ddd;
  }
  .table > caption + thead > tr:first-child > th,
  .table > colgroup + thead > tr:first-child > th,
  .table > thead:first-child > tr:first-child > th,
  .table > caption + thead > tr:first-child > td,
  .table > colgroup + thead > tr:first-child > td,
  .table > thead:first-child > tr:first-child > td {
    border-top: 0;
  }
  .table > tbody + tbody {
    border-top: 2px solid #ddd;
  }
  .table .table {
    background-color: #fff;
  }
  
.table-bordered {
  border: 1px solid #ddd;
}
.table-bordered > thead > tr > th,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > tbody > tr > td,
.table-bordered > tfoot > tr > td {
  border: 1px solid #ddd;
}
.table-bordered > thead > tr > th,
.table-bordered > thead > tr > td {
  border-bottom-width: 2px;
}
.table-striped > tbody > tr:nth-child(odd) > td,
.table-striped > tbody > tr:nth-child(odd) > th {
  background-color: #f9f9f9;
}
.table-hover > tbody > tr:hover > td,
.table-hover > tbody > tr:hover > th {
  background-color: #f5f5f5;
}
}

</style>
