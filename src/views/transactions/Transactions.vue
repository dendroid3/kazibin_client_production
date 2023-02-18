<template>
    <div class="main-wrapper grey lighten-3">
        <v-row class="d-flex grey lighten-2 align-center no-gutters">
            <v-col class="col-8 pl-4 backg"> transactions
            </v-col>
        </v-row> 
        <!-- <transaction-strip :transaction="transaction" v-for="transaction in getMyTransactions" :key="transaction.id" v-if=pagination_links_set /> -->
        <div v-if="getMyTransactions[0] && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md) && pagination_links_set">
          <transaction-strip :transaction="transaction" v-for="transaction in getMyTransactions" :key="transaction.id" />
        </div>

        <div v-if="getMyTransactions[0] && ($vuetify.breakpoint.lg || $vuetify.breakpoint.md) && pagination_links_set">
          <d-transactions-card :transactions="getMyTransactions" />
        </div>

        <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set && getMyTransactions[0]">
          <v-col class="col-1 white--text mt-4 primary-color pointer text-center" v-for="(link, i) in pagination_links" 
          :key="i" 
          :class="{
            'red': link.active,
            'grey': ((getMyTransactionsPaginationDetails.current_page === getMyTransactionsPaginationDetails.last_page) && link.next) ||
                    (getMyTransactionsPaginationDetails.current_page === 1) && link.previous
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

        <v-row class="padder d-flex justify-center" v-if="!getMyTransactions[0] && pagination_links_set" >
        <div class="padded mb-4">
          <v-row class="no-gutters " style="min-width: 80%;">
            <v-col class="col-12 col-md-6 d-flex align-center justify-center">
              <emptyHere />
            </v-col>
            <v-col class="col-12 col-md-6 d-flex align-center text-center">
              <p>
                You have no transactions yet. Your transactions will appear here once you transact. The recorded transactions are: Deposits from Mpesa, Money used to forward your task to our telegram group, money used to bid on tasks.
              </p>
            </v-col>
          </v-row>
        </div>
      </v-row>

        <fetching-items :message="`getting transactions`"  v-if="!pagination_links_set"/>

    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import TransactionStrip from '../../components/dashboard/TransactionStrip.vue';
import FetchingItems from '../../components/widgets/FetchingItems.vue';
import emptyHere from '../../components/svg/emptyHere.vue';
import DTransactionsCard from '../../components/dashboard/desktop/DTransactionsCard.vue';

export default {
    name: 'Transactions',

    components:{TransactionStrip, FetchingItems, emptyHere, DTransactionsCard},

    computed: {
        ...mapGetters(['getMyTransactions', 'getMyTransactionsPaginationDetails', ]),

        pagination_links(){
            if(!this.getMyTransactionsPaginationDetails){return}
          let links = []
          this.getMyTransactionsPaginationDetails.links.forEach(link => {
            link.previous = link.label == "&laquo; Previous"
            link.next = link.label == "Next &raquo;"
            links.push(link)
          });
          return links
      },
    },

    data: () => ({
        pagination_links_set: false
    }),

    methods:{
        ...mapActions(['fetchMyTransactionsPaginated']),

        goToPage(page_link){
      
        this.pagination_links_set = false
        const data = {
            link: page_link
        }
        
        if(!this.filter_model){
            this.fetchMyTransactionsPaginated(data).then((res) => (
            this.pagination_links_set = true
            ))
        } else {
            data.status = this.filter_model
            this.fetchMyTransactionsPaginated(data).then((res) => (
            this.pagination_links_set = true
            ))
        }
        },
    },

    mounted(){
        this.fetchMyTransactionsPaginated({}).then(() => (
            this.pagination_links_set = true
        ))
    }
}
</script>
<style lang="">
    
</style>