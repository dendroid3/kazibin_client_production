<template>
    <tr class="odd gradeX pa-2 wrapper pointer" :class="{
    greenlist: display == 1, 
    redlist: display == 0
    }">
        <td class="text-center">{{ account.code }}</td>
        <td class="text-center">
            {{ account.title }}
            <br>
            {{ `(${account.type})` }}
        </td>
        <td class="text-center">
            {{ account.profile_origin }}
            <br>
            {{ `(${account.profile_gender})` }}
        </td>
        <td class="text-center">{{ account.pending_orders }}</td>
        <td class="text-center">{{ account.total_orders }}</td>
        <td class="text-center">{{ formatMoney(account.amount_earned) }}</td>
        <td class="text-center">{{ formatMoney(account.cost) }}</td>
        <td class="text-center">{{ account.negotiable ? 'Negotiable' : 'Non-negotiable' }}</td>
        <td class="position-relative">
            <div class="switch-wrapper">
                <div class="switch-container" @click="initiateChangeInDiplay"
                    :class="{
                        'white': (index%2 === 1),
                        'grey lighten-2': (index%2 === 0)
                    }">
                    <div class="slider" :class="{
                        'animate-slider-to-true': display,
                        'animate-slider-to-false': !display
                    }"></div>
                </div>
            </div>
        </td>
        <td class="text-center">
            <div class="d-flex">
                <v-icon class="blue--text" @click="goView">
                    mdi-eye
                </v-icon>
                <v-icon class="red--text" @click="intitializeDeleteAccount">
                    mdi-delete
                </v-icon>
            </div>
        </td>
    </tr>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default{
    name: "DAccountCard",

    props: [
        'account',
        'index'
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
.position-relative {
    position: relative;
    height: 100%;
}

.switch-wrapper {
    position: absolute;
    right: 50%;
    transform: translate(50%, 75%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.switch-container{
    width: 2.5rem;
    height: 0.5rem;
    border-radius: 5px;
    padding-left: 0.125rem;
    position: relative;
}

.slider{
    height: 1rem;
    width: 1rem;
    position: absolute;
    top: -50%;
    border-radius: 50%;
}

/* Animation to move the slider to the right (to true) */
.animate-slider-to-true {
    animation: turnSwitchToTrue 2s forwards;
}

/* Animation to move the slider back to the left (to false) */
.animate-slider-to-false {
    animation: turnSwitchToFalse 2s forwards;
}

/* Keyframe for turning the switch to true (right position) */
@keyframes turnSwitchToTrue {
    0% {
        background-color: red;
        transform: translateX(0); /* Start at the left */
    }
    100% {
        background-color: green;
        transform: translateX(1.355rem); /* Move to the right */
    }
}

/* Keyframe for turning the switch to false (left position) */
@keyframes turnSwitchToFalse {
    0% {
        background-color: green;
        transform: translateX(1.355rem); /* Start from the right */
    }
    100% {
        background-color: red;
        transform: translateX(0); /* Move back to the left */
    }
}
</style>

