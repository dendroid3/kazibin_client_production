<template>
    <div class="pa-2 wrapper pointer" :class="{
    redlist: display == 0, 
    greenlist: display == 1, 
    }"
    @click="goView">
        <section>
            <span class="head pointer uppercase">
                {{ `${account.code}: ${account.title} Account` }}
            </span>
            <br>
            <br>
            <span class="uppercase">
                {{ `PROFILE: ${account.profile_origin} ( ${account.profile_gender} )` }}
            </span>
            <br>
            <span class="uppercase">
                {{ `PENDING ORDERS: ${account.pending_orders}` }}  
            </span>
            <br>
            <span class="uppercase">
                {{ `TOTAL ORDERS: ${account.total_orders}`}}
            </span>
            <br>
            <span class="uppercase">
                {{ `TOTAL EARNED: ${formatMoney(account.amount_earned)}`}}
            </span>
            <br>
            <span class="uppercase">
                {{ `RATING: ${account.rating}%` }} 
            </span>
            <br>
            <span class="uppercase">
                {{ `COST: ${formatMoney(account.cost)} ( ` }}
                {{ account.negotiable ? 'Negotiable )' : 'Non-negotiable )' }}
            </span>
            <v-btn block class="green white--text" @click="initiateChangeInDiplay">
                {{ display ? 'Remove from Display' : 'Add To Display' }}
            </v-btn>
            <v-btn block class="mt-1 red white--text" @click="intitializeDeleteAccount">
                {{ 'Delete' }}
            </v-btn>
        </section>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "AccountsStrip",

    props: [
        'account'
    ],

    data() {
        return {
            display: true
        }
    },

    computed: {
        ...mapGetters(['getDashboadDetails'])
    },
    
    methods: {
        ...mapActions(['intitiateRequestToDeposit', 'updateAccount', 'deleteAccount', 'setCurrentAccountInView']),

        async initiateChangeInDiplay() {
            let confirmation = '';

            if(this.display){
                confirmation = 'Is this account no longer available for purchase?\nYou are about to remove this account from display.\nContinue?'
            } else {
                confirmation = `You are about to put this account back on display. This will cost you ${process.env.VUE_APP_ACCOUNT_DISPLAY_COST} KES. Once you do this acction, the advert will be forwarded to our WhatsApp and Telegram channels and be visible on the website.\nContinue?`
            
                // if(this.getDashboadDetails.transactions.balance < process.env.VUE_APP_ACCOUNT_DISPLAY_COST) {
                if(this.getDashboadDetails.transactions.balance < -100000) {
                    const required_amount = process.env.VUE_APP_ACCOUNT_DISPLAY_COST - this.getDashboadDetails.transactions.balance;
                    const intitiate_request_to_deposit_data = {
                    action: "put writing account on display",
                    required_amount: required_amount
                    }
                    this.intitiateRequestToDeposit(intitiate_request_to_deposit_data)
                    return
                }
            }

            if(!confirm(confirmation)) { return }

            const new_account_details = this.account
            new_account_details.display = !new_account_details.display
           
            const response_code = await this.updateAccount(new_account_details)

            if(response_code === 200){
                this.display = !this.display
            }
        },

        intitializeDeleteAccount() {
            const confirmation = `You are about to permarnently delete account, ${this.account.code}: ${this.account.title}`

            if(!confirm(confirmation)) {return}
            this.deleteAccount({id: this.account.id})

        },

        formatMoney (cost) {
            let money_format = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'KES',
            });

            return money_format.format(cost)
        },

        goView() {
            this.setCurrentAccountInView(this.account)
            this.$router.push(`/m/${this.account.code}`)
        }
    },
    mounted() {
        this.display = this.account.display
    }
}
</script>
<style lang="css" scoped>
 .head{
    font-size: 1rem;
    font-weight: 800;
  }
 .head::after{
    font-size: 1rem;
    font-weight: 800;
  }
  .wrapper{
    position: relative;
  }
  .wrapper::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
</style>
