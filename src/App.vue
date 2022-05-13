<template>
  <v-app >
    <v-app-bar class="primary-color"
      :color="`rgb(15,14,56)`"
      flat
      sticky
      dense
      app
    >

      <div class="d-flex rounded " @click="goHome"> 
        <v-img class="icon" :src="require(`./assets/icon.svg`)" contain />
      </div>

      <v-spacer></v-spacer>

      <div v-if="!getUser.email">
        <router-link to="/register" class="text mr-4" style="text-decoration: none; color: white;"> register </router-link>
        <router-link to="/login" class="text" style="text-decoration: none; color: white;"> login </router-link>
      </div>
      
      <div v-if="getUser.email">
        <router-link to="/dashboard" 
        class="text" 
        style="text-decoration: none; color: white;" >
           {{getUser.email}}
        </router-link>
      
        <!-- <span class="text white--text" v-if="Home == '/dashboard'" @click="logoutUser"> logout </span> -->
      
        <!-- <v-icon class="green--text pop" small v-if="isDashboardNotification">
          mdi-plus
        </v-icon> -->
      </div>

    </v-app-bar>
    <loader-widget v-if="isLoading"/>
    <!-- <alert-box /> -->
    <v-main class="main ">
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex';
import LoaderWidget from './components/widgets/LoaderWidget.vue'
import AlertBox from './components/widgets/AlertBox.vue'
export default {
  name: 'App',

  components:{LoaderWidget, AlertBox},

  computed: {
    ...mapGetters(['isLoading', 'getUser']),
    isGuest(){
      return true
    }
  },

  methods:{
    goHome(){
      this.$router.push('/')
    }
  },

  mounted(){
  }
//a7d98b2e21a38e553e564fced22647bf
};
</script>
<style lang="css">

  html{
    font-family: dosis;
    overflow: auto;
  }
  #app{
    padding: 0;
    margin: 0;
    font-family: dosis;
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
    width:70vw;
  }
  /* backg2 */
</style>
