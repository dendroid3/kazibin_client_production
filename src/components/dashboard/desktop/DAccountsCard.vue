<template>
    <div class="pa-2">
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr class="grey white--text">
                    <th>Code</th>
                    <th>Name</th>
                    <th>Profile</th>
                    <th>Pending Orders</th>
                    <th>Total Orders</th>
                    <th>Cost</th>
                    <th>Terms</th>
                    <th>Display</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" :key="account.id" class="odd gradeX pa-2 wrapper pointer" :class="{
                greenlist: account.display == 1, 
                redlist: account.display == 0
                }">
                    <td class="text-center">{{ account.code }}</td>
                    <td class="text-center">{{ account.title }}</td>
                    <td class="text-center">{{ `${account.profile_origin} (${account.profile_gender})` }}</td>
                    <td class="text-center">{{ account.pending_orders }}</td>
                    <td class="text-center">{{ account.total_orders }}</td>
                    <td class="text-center">{{ formatMoney(account.cost) }}</td>
                    <td class="text-center">{{ account.negotiable ? 'Negotiable' : 'Non-negotiable' }}</td>
                    <td class="position-relative">
                        <div class="switch-wrapper">
                            <v-switch
                            @change="initiateChangeInDiplay"
                            v-model="account.display"
                            class="pa-0 ma-0"
                            small
                            inset
                            ></v-switch>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default{
    name: "DAccountsCard",

    props: [
        'accounts'
    ],

    computed: {
        ...mapGetters([''])
    },

    methods: {
        ...mapActions(['intitiateRequestToDeposit']),

        initiateChangeInDiplay() {
            const confirmation = '';
            if(code){
                confirmation = 'Is this account no longer available for purchase?\nYou are about to remove this account from display.\nContinue?'
            } else {
                confirmation = 'You are about to put this account back on display. This will const you 50KES. Once you do this acction, the advert will be forwarded to our WhatsApp and Telegram channels and be visible on the website.\nContinue?'
            
                if(this.getDashboadDetails.transactions.balance < process.env.VUE_APP_ACCOUNT_DISPLAY_COST) {
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
        },

        formatMoney (cost) {
            let money_format = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'KES',
            });

            return money_format.format(cost)
        }
    }
}
</script>
<style lang="css" scoped>
.position-relative {
    position: relative;
    height: 100%;
}

.switch-wrapper {
    position: absolute;
    right: 50%;
    transform: translate(65%, 0%);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

