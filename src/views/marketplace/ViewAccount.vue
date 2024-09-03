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
                        {{ `SELLER:  ${getCurrentAccountInView.user.code}:${getCurrentAccountInView.user.username}` }}
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
                    <v-col class="col-12">
                        {{ "SCREENSHOTS" }}
                    </v-col>
                    <v-col class="col-12 mb-2" v-for="(ima, i) in 6" :key="i">
                        <v-img class="" :src="'https://kazibin.nyc3.cdn.digitaloceanspaces.com/Accounts/IJ-4XT/mTjyNxeknREyoul5q3TwZha6THfjvBOj5zWJxb1W.png'" contain />
                    </v-col>

                    <div class="d-flex justify-end call-button">
                        <v-menu 
                        transition="slide-y-transition"
                        bottom
                        open-on-hover>
                        <template v-slot:activator="{ on, attrs }">
                        <span class="white--text pointer"
                          v-bind="attrs"
                          v-on="on">
                          <v-btn small 
                          class="elevation- ml-2 red lighten-2 white--text" 
                          style="font-weight: 900;" 
                          :loading="false">
                              Contact Seller
                          </v-btn>
                        </span>
                        </template>
                        <v-list>
                            <v-list-item
                            class="pointer"
                            @click="call">
                                <v-icon small class="mr-2">
                                    mdi-phone
                                </v-icon>
                                Call
                            </v-list-item>
                            <v-list-item
                            class="pointer"
                            @click="sms">
                                <v-icon small class="mr-2">
                                    mdi-message
                                </v-icon>
                                SMS
                            </v-list-item>
                            <v-list-item
                            class="pointer"
                            @click="sendEmail">
                                <v-icon small class="mr-2">
                                    mdi-mail
                                </v-icon>
                                Email
                            </v-list-item>
                            <v-list-item
                            class="pointer"
                            @click="goToWhatsApp">
                                <v-icon small class="mr-2">
                                    mdi-whatsapp
                                </v-icon>
                                WhatsApp
                            </v-list-item>
                        </v-list>
                        </v-menu>
                    </div>
                </v-row>

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

        goToWhatsApp() {
            // Encode the message to be URL-safe
            let message = `Hello ${this.account.user.username},\n\nI hope this message finds you well. I am interested in the ${this.account.title} writing account advertised on kazibin (${process.env.VUE_APP_FRONT_END_URL}/m/${this.account.code}).  Could you please provide more details about the account?\n\nLooking forward to your response.\n\nBest regards,\n${this.getUser.username}`;

            let encodedMessage = encodeURIComponent(message)

            // Construct the WhatsApp URL with the phone number and message
            let whatsappUrl = `https://wa.me/+254${this.account.user.phone_number}?text=${encodedMessage}`;

            // Open WhatsApp with the pre-filled message
            window.open(whatsappUrl);
        },

        call(){
            const phone_number = '+254' + this.account.user.phone_number
            window.location.href = 'tel:' + phone_number;
        },

        sms(){
            // Encode the message to be URL-safe
            let message = `Hello ${this.account.user.username},\n\nI hope this message finds you well. I am interested in the ${this.account.title} writing account advertised on kazibin (${process.env.VUE_APP_FRONT_END_URL}/m/${this.account.code}).  Could you please provide more details about the account?\n\nLooking forward to your response.\n\nBest regards,\n${this.getUser.username}`;

            let encodedMessage = encodeURIComponent(message)

            // Construct the sms: URI with the phone number and message body
            let smsUri = `sms:+254${this.account.user.phone_number}?body=${encodedMessage}`

            window.location.href = smsUri;
        },

        sendEmail() {
            let encodedSubject = `INTEREST IN THE ${this.account.title.toUpperCase()} ACCOUNT`
            
            // Encode the message to be URL-safe
            let message = `Hello ${this.account.user.username},\n\nI hope this message finds you well. I am interested in the ${this.account.title} writing account advertised on kazibin (${process.env.VUE_APP_FRONT_END_URL}/m/${this.account.code}).  Could you please provide more details about the account?\n\nLooking forward to your response.\n\nBest regards,\n${this.getUser.username}`;

            let encodedBody = encodeURIComponent(message)

            let mailtoUri = `mailto:${this.account.user.email}?subject=${encodedSubject}&body=${encodedBody}`;

            // Open the email client with the pre-filled information
            window.location.href = mailtoUri;
        },

        boot() {
            //check whether the account details are set
            const account_code = this.$router.history.current.params.account_code
            console.log(account_code)

            if(!this.getCurrentAccountInView){
                this.fetchAccount({
                    account_code: account_code
                }).then(() => (
                    this.show_account_details = true
                ))
                return
            }

            if(this.getCurrentAccountInView.code != account_code){
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
    position: relative;
}

.call-button{
    position: fixed;
    bottom: 0.5rem;
    right: 0.5rem;
}
</style>

