<template>
    <div class="main-wrapper">
        <v-row class="d-flex grey lighten-2 align-center no-gutters">
            <v-col class="col-8 pl-4 backg"> accounts in marketplace
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
              <div class="tomato white--text rounded elevation-1 pointer"  @click="filterModel('on')">
                  <div class="d-flex justify-center bold"
                  :class="{
                  'yellow--text': filter_model == 'on'
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
              <div class="tomato white--text rounded elevation-1 pointer"  @click="filterModel('off')">
                  <div class="d-flex justify-center bold"
                  :class="{
                  'yellow--text': filter_model === 'off'
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
        <section v-if="accounts_fetched">
            <div class="limiting_wrapper" v-if="getMyAccounts.accounts.data[0] && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                <accounts-strip :account="account" v-for="account in getMyAccounts.accounts.data" :key="account.id" />
            </div>
            <div v-if="getMyAccounts.accounts.data[0] && ($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                <d-accounts-card :accounts="getMyAccounts.accounts.data"/>
            </div>

            <v-row class="padder"  v-if="!getMyAccounts.accounts.data[0]">
              <div class="padded mb-4 d-flex justify-center">
                <v-row class="no-gutters d-flex align-center">
                  <v-col class="col-12 col-md-6">
                    <emptyHere />
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    You have not advertised any writing account at the moment
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid commodi vel perferendis velit necessitatibus totam enim possimus magni. Assumenda nesciunt culpa velit commodi, debitis facere illum est, architecto inventore illo, error minus quas. Odio distinctio laudantium autem facere, repellendus consequatur earum voluptates officia possimus sapiente quae ad, neque explicabo labore!
                  </v-col>
                </v-row>
              </div>
            </v-row>


        </section>
        <section v-if="!accounts_fetched">
          <fetching-items :message="`Fetching Accounts`" />
        </section>

        <section>
          <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set && getMyAccounts.accounts.data[0]">
            <v-col class="col-1 white--text mt-4 primary-color text-center pointer" v-for="(link, i) in pagination_links" 
            :key="i" 
            :class="{
                'red': link.active,
                'grey': ((getMyAccounts.accounts.current_page === getMyAccounts.accounts.last_page) && link.next) ||
                        (getMyAccounts.accounts.current_page === 1) && link.previous
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
import DAccountsCard from '../../components/dashboard/desktop/DAccountsCard.vue';
import AccountsStrip from '../../components/dashboard/AccountsStrip.vue';
import FetchingItems from '../../components/widgets/FetchingItems.vue';
import emptyHere from '../../components/svg/emptyHere.vue';

export default {
    name: "Accounts",

    components:{
        DAccountsCard,
        AccountsStrip,
        FetchingItems,
        emptyHere
    },

    data() {
        return {
            is_options_open: false,
            filter_model: null,
            accounts_fetched: false,
            pagination_links_set: false
        }
    },

    computed: {
        ...mapGetters(['getMyAccounts', 'getDashboadDetails']),

        pagination_links(){
            let links = []
            this.getMyAccounts.accounts.links.forEach(link => {
              link.previous = link.label == "&laquo; Previous"
              link.next = link.label == "Next &raquo;"
              links.push(link)
            });
            return links
        },
    },

    methods: {
        ...mapActions(['fetchMyAccounts']),

        filterModel(filter){
            this.filter_model = filter

            switch (filter) {
              case 'on':
                this.filter_code = true
                this.fetchFilered()
                break;

              case 'off':
                this.filter_code = false
                this.fetchFilered()
                break;
            
              default:
                this.boot()
                break;
            }
        },
        
        goToPage(link) {
            this.pagination_links_set = false
            this.accounts_fetched = false

            const data = {
              page: link.split('=')[1]
            }
            if(this.filter_model){
              data.filter_code = this.filter_code
            }
            this.fetchMyAccounts(data).then((pagination_details) => {
                if(pagination_details.accounts.last_page > 1){
                    this.pagination_links_set = true
                }
              this.accounts_fetched = true
            })
        },

        fetchFilered() {
          this.accounts_fetched = false
          this.pagination_links_set = false

          const data = {
            filter_code: this.filter_code,
            is_filtered: true
          }
          this.fetchMyAccounts(data).then((pagination_details) => {
            if(pagination_details.accounts.last_page > 1){
                  this.pagination_links_set = true
            } 
            this.accounts_fetched = true
          })
        },

        boot() {
            this.fetchMyAccounts({}).then((pagination_details) => {
              if(pagination_details.accounts.last_page > 1){
                    this.pagination_links_set = true
              } 
              this.accounts_fetched = true
            })
        }
    },

    mounted() {
        this.boot()
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