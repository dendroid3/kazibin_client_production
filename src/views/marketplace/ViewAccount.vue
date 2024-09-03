<template>
   <div class="limiting_wrapper">
        <div v-if="show_account_details">
            <v-toolbar 
                class="pb-4 grey lighten-3 mb-4 toolbar"
                text
                :class="{
                'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
                'medium-width':  $vuetify.breakpoint.md,
                'large-width':  $vuetify.breakpoint.lg,
                }"
            >
                <div class="d-flex bold pointer">
                    <v-toolbar-title>{{ `${getCurrentAccountInView.code}: ${getCurrentAccountInView.title} Account` }}</v-toolbar-title>
                </div>
            </v-toolbar>

            <section>
                <v-row class="d-flex mx-4 no-gutters bold">
                    <v-col class="col-12">
                        {{ `Seller:  ${getCurrentAccountInView.user.code}:${getCurrentAccountInView.user.username}` }}
                    </v-col>
                    <v-col class="col-12">
                        {{ `PROFILE: ${getCurrentAccountInView.profile_origin} ( ${getCurrentAccountInView.profile_gender} )` }}
                    </v-col>
                    <v-col class="col-12">
                        {{ `RATING: ${getCurrentAccountInView.rating}%` }} 
                    </v-col>
                    <v-col class="col-12">
                        {{ `TOTAL ORDERS: ${getCurrentAccountInView.total_orders}`}}
                    </v-col>
                    <v-col class="col-12">
                        {{ `PENDING ORDERS: ${getCurrentAccountInView.pending_orders}` }}  
                    </v-col>
                    <v-col class="col-12">
                        {{ `COST: ${formatMoney(getCurrentAccountInView.cost)} ( ` }}
                        {{ getCurrentAccountInView.negotiable ? 'Negotiable )' : 'Non-negotiable )' }}
                    </v-col>
                </v-row>
                Images go here
            </section>
        </div>
        <div v-else>
            <fetching-items :message="`Fetching account`"/>
        </div>
        
  
   </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import FetchingItems from '../../components/widgets/FetchingItems.vue';

export default{
    name: "ViewAccount",

    components: {
        FetchingItems
    },

    data() {
        return {
            show_account_details: false
        }
    },

    computed: {
        ...mapGetters(['getCurrentAccountInView'])
    },

    methods: {
        ...mapActions(['fetchAccount']),
        
        formatMoney (cost) {
            let money_format = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'KES',
            });
            return money_format.format(cost)
        },

        boot() {
            //check whether the account details are set
            const account_code = this.$router.history.current.params.account_code
            console.log(account_code)

            if(!this.getCurrentAccountInView){
                alert("Nothing in view")

                this.fetchAccount({
                    account_code: account_code
                }).then(() => (
                    this.show_account_details = true
                ))
                return
            }

            if(this.getCurrentAccountInView.code != account_code){
                alert("Different code")
                this.fetchAccount({
                    account_code: account_code
                }).then(() => (
                    this.show_account_details = true
                ))
                return
            }

            this.show_account_details = true
        }
    },

    mounted() {
        this.boot()
    }
}
</script>
<style>
.toolbar {
    overflow-y: hidden;
}

.limiting_wrapper{
    height: calc(100vh - 50px);
    overflow-y: scroll;
    overflow-x: hidden;
}
</style>

