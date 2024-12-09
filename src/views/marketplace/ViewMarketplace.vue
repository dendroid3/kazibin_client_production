<template>
    <div class="main-wrapper white">
        <div class="col-12 grey lighten-2">
            <span class="heading primary-color-text">
              {{"Accounts Marketplace"}}
            </span> 
        </div>
        <div>
            
        <v-row class="limiting_wrapper no-gutters" v-if="accounts_details_set">
            <v-col class="col-12 col-md-6 mb-2"  v-for="(account, i) in getAccounts" :key="i">
                <account-card :account="account"/>
            </v-col>
            <section v-if="getAccounts.length < 1">
                <v-row class="no-gutters pt-4 mt-4">
                    <v-col class="col-8 offset-2 pa-4">
                      <v-img class="" :src="require(`../../assets/pageNotFound.svg`)" contain />
                    </v-col>
                    <v-col class="col-8 offset-2 px-4 d-flex justify-center text-center tomato-text bold">
                      {{"Ooops! No writing accounts currently available!"}}
                    </v-col>
                    <v-col class="col-8 offset-2 px-4 d-flex justify-center primary-color-text text-center mt-4">
                      {{"We forward all advertised writing accounts real time to our telegram channel. Join it to be notified as soon as there is an available task"}}
                    </v-col>
                    <v-col class="col-8 offset-2 px-4 d-flex justify-center ">
                      <v-btn class="mx-1 white--text" @click="goTelegram" style="background-color: tomato;">Join Channel</v-btn>
                      <v-btn class="mx-1 white--text" @click="go('/Dashboard')" style="background-color: tomato;">Dashboard</v-btn>
                    </v-col>
                </v-row>
            </section>
        </v-row>
        <div v-else>
            <fetching-items :message='`fetching accounts`' />
        </div>
        </div>
        <section>
            <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set && getAccounts[0]">
                <v-col class="col-1 white--text mt-4 primary-color text-center" v-for="(link, i) in pagination_links" 
                :key="i" 
                :class="{
                    'red': link.active,
                    'grey': ((getAccountsPaginationDetails.accounts.current_page === getAccountsPaginationDetails.accounts.last_page) && link.next) ||
                            (getAccountsPaginationDetails.accounts.current_page === 1) && link.previous
                    }" 
                @click="goToPage(link.url)">
                    <span>
                    <span v-if="link.previous">
                    {{"<<"}}
                    </span>
                    <span v-if="!link.previous && !link.next">
                        {{link.label}}
                    </span>
                    <span v-if="(link.next)">
                        {{">>"}}
                    </span>
                    </span>
            </v-col>
            </v-row>

        </section>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import AccountCard from '../../components/marketplace/AccountCard.vue';
import FetchingItems from '../../components/widgets/FetchingItems.vue';
export default {
    name: "Marketplace",

    components: {
        AccountCard,
        FetchingItems
    },

    data() {
        return {
            pagination_links_set: false,
            accounts_details_set: false
        }
    },

    computed: {
        ...mapGetters(['getAccounts', 'getAccountsPaginationDetails']),

        pagination_links(){
          let links = []
          if(this.getAccountsPaginationDetails){
            this.getAccountsPaginationDetails.accounts.links.forEach(link => {
                link.previous = link.label == "&laquo; Previous"
                link.next = link.label == "Next &raquo;"
                links.push(link)
            });
            return links
          } else {
            return null
          }
        
      },
    },

    methods: {
        ...mapActions(['fetchAccountsPaginated']),

        boot(){
            this.fetchAccountsPaginated().then((pagination_details) => {
                if(pagination_details.accounts.last_page > 1){
                    this.pagination_links_set = true
                }
                this.accounts_details_set = true
            }).catch(() => {
                this.accounts_details_set = true
            })
        },

        goToPage(link) {
            this.pagination_links_set = false
            this.accounts_details_set = false

            this.fetchMyAccounts({page: link.split('=')[1]}).then((pagination_details) => {
                if(pagination_details.accounts.last_page > 1){
                    this.pagination_links_set = true
                }
                this.accounts_details_set = true
            })
        }
    },

    mounted() {
        this.boot()
    }
}
</script>
<style lang="css" scoped>
    .backg{
        color: rgb(15,14,56);
        font-size: 2rem;
    }

    .main-wrapper{
        padding-bottom: 0.5rem; 
    }
</style>
