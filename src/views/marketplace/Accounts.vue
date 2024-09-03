<template>
    <div class="main-wrapper">
        <v-row class="d-flex grey lighten-2 align-center no-gutters">
            <v-col class="col-8 pl-4 backg"> accounts posted
            </v-col>
            <v-col class="col-4 d-flex align-center justify-end px-4">
                <v-icon class="mx-2" v-if="!is_options_open" @click="is_options_open = true">
                  mdi-arrow-down  
                </v-icon>
                <v-icon class="mx-2" v-if="is_options_open" @click="is_options_open = false">
                  mdi-arrow-up  
                </v-icon>
            </v-col>
        </v-row> 
        <v-row class="pa-2 bold no-gutters" v-if="is_options_open">
            <v-col class="mb-1 col-4 px-1">
              <div class="tomato white--text rounded elevation-1 pointer"  @click="filterModel(null)">
                  <div class="d-flex justify-center bold"
                  :class="{
                  'yellow--text': !filter_model
                }">
                    all posted
                  </div>
                  <v-divider inset/>
                  <div class="d-flex justify-end align-center px-1 ">
                    <span> {{ getDashboadDetails.accounts.total }}  </span>
                  </div>
              </div>
            </v-col>
            <v-col class="mb-1 col-4 px-1">
              <div class="tomato white--text rounded elevation-1 pointer"  @click="filterModel(null)">
                  <div class="d-flex justify-center bold"
                  :class="{
                  'yellow--text': !filter_model
                }">
                    on display
                  </div>
                  <v-divider inset/>
                  <div class="d-flex justify-end align-center px-1 ">
                    <span> {{ getDashboadDetails.accounts.on_display }}  </span>
                  </div>
              </div>
            </v-col>
            <v-col class="mb-1 col-4 px-1">
              <div class="tomato white--text rounded elevation-1 pointer"  @click="filterModel(null)">
                  <div class="d-flex justify-center bold"
                  :class="{
                  'yellow--text': !filter_model
                }">
                    off display
                  </div>
                  <v-divider inset/>
                  <div class="d-flex justify-end align-center px-1 ">
                    <span> {{ getDashboadDetails.accounts.off_display }}  </span>
                  </div>
              </div>
            </v-col>
        </v-row>  
        <section>
            <div class="limiting_wrapper" v-if="getMyAccounts.accounts.data[0] && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                <accounts-strip :account="account" v-for="account in getMyAccounts.accounts.data" :key="account.id" />
            </div>
            <div v-if="getMyAccounts.accounts.data[0] && ($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                <d-accounts-card :accounts="getMyAccounts.accounts.data"/>
            </div>
            <!-- <div v-for="account in getMyAccounts.accounts.data" :key="account.id" class="red my-2">
                {{ account.title }}
            </div> -->
        </section>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import DAccountsCard from '../../components/dashboard/desktop/DAccountsCard.vue';
import AccountsStrip from '../../components/dashboard/AccountsStrip.vue';

export default {
    name: "Accounts",

    components:{
        DAccountsCard,
        AccountsStrip
    },

    data() {
        return {
            is_options_open: false,
            filter_model: null
        }
    },

    computed: {
        ...mapGetters(['getMyAccounts', 'getDashboadDetails'])
    },

    methods: {
        ...mapActions(['fetchMyAccounts']),

        filterModel(filter){
            console.log(filter)
        },

        boot() {
            this.fetchMyAccounts()
        }
    },

    mounted() {
        this.fetchMyAccounts()
    }
}
</script>
<style lang="css" scoped>

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
  .limiting_wrapper{
    max-height: calc(100vh - 50px);
    overflow-y: scroll;
    overflow-x: hidden;
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
  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }
   .username{
    font-weight: 900;
    font-size: 1.2rem;
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
  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }
  .backgs{
    background-color: rgb(15,14,56);
  }
  .bold{
    font-weight: 900;
  }
  
  .bold-tiny{
  font-weight: 900;
  font-size: 0.9rem;
}
  .list{
    background-color: rgb(231, 231, 231); 
    border-left: solid 20px red;
  }
  .usn-block{
    position: relative;
  }
  
  .main-wrapper{
    padding-bottom: 5rem;
    overflow-x: hidden;
  }
  .usn-block::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
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
  .yellowtext{
    color: yellow;
  }
</style>