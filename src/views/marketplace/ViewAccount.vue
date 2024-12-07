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
                <v-row class="d-flex mx-4 no-gutters ">
                    <v-col class="col-12" v-if="getCurrentAccountInView.user">
                        <span class="bold-here">
                            {{ `SELLER: ` }} 
                        </span>
                        <span>
                            {{ `${getCurrentAccountInView.user.code}:${getCurrentAccountInView.user.username}` }}
                        </span>
                    </v-col>
                    <v-col class="col-12">
                        <span class="bold-here">
                            {{ `PROFILE: ` }} 
                        </span>
                        <span>
                            {{ `${getCurrentAccountInView.profile_origin} ( ${getCurrentAccountInView.profile_gender} )` }}
                        </span>
                    </v-col>
                    <v-col class="col-12">
                        <span class="bold-here">
                            {{ `RATING: ` }} 
                        </span>
                        <span>
                            {{ `${getCurrentAccountInView.rating}` }} 
                        </span>
                    </v-col>
                    <v-col class="col-12">
                        <span class="bold-here">
                            {{ `TOTAL ORDERS: ` }} 
                        </span>
                        <span>
                        {{ `${getCurrentAccountInView.total_orders}`}}
                        </span>
                    </v-col>
                    <v-col class="col-12">
                        <span class="bold-here">
                            {{ `PENDING ORDERS: ` }} 
                        </span>
                        <span>
                            {{ `${getCurrentAccountInView.pending_orders}` }}  
                        </span>
                    </v-col>
                    <v-col class="col-12">
                        <span class="bold-here">
                            {{ `COST: ` }} 
                        </span>
                        <span>
                            {{ `${formatMoney(getCurrentAccountInView.cost)} ( ` }}
                            {{ getCurrentAccountInView.negotiable ? 'Negotiable )' : 'Non-negotiable )' }}
                        </span>
                    </v-col>
                    <v-col class="col-12">
                        <span class="bold-here">
                            {{ `DESCRIPTION: ` }} 
                        </span>
                        <span>
                            {{ `${getCurrentAccountInView.description}` }}  
                        </span>
                    </v-col>
                    <v-col class="col-12">
                        <span class="bold-here">
                            {{ `SCREENSHOTS: ` }} 
                        </span>
                    </v-col>
                    <v-col class="col-12 mb-2" v-for="(image, i) in getCurrentAccountInView.files" :key="i">
                        <v-img class="" :src="image.url" contain />
                    </v-col>

                    <div class="d-flex justify-end call-button" v-if="getCurrentAccountInView.user">
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
        ...mapGetters(['getCurrentAccountInView', 'getUser'])
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
            let message = `Hello ${this.getCurrentAccountInView.user.username},\n\nI hope this message finds you well. I am interested in the ${this.getCurrentAccountInView.title} writing account advertised on kazibin (${process.env.VUE_APP_FRONT_END_URL}/m/${this.getCurrentAccountInView.code}).  Could you please provide more details about the account?\n\nLooking forward to your response.\n\nBest regards,\n${this.getUser.username}`;

            let encodedMessage = encodeURIComponent(message)

            // Construct the WhatsApp URL with the phone number and message
            let whatsappUrl = `https://wa.me/+254${this.getCurrentAccountInView.user.phone_number}?text=${encodedMessage}`;

            // Open WhatsApp with the pre-filled message
            window.open(whatsappUrl);
        },

        call(){
            const phone_number = '+254' + this.getCurrentAccountInView.user.phone_number
            window.location.href = 'tel:' + phone_number;
        },

        sms(){
            // Encode the message to be URL-safe
            let message = `Hello ${this.getCurrentAccountInView.user.username},\n\nI hope this message finds you well. I am interested in the ${this.getCurrentAccountInView.title} writing account advertised on kazibin (${process.env.VUE_APP_FRONT_END_URL}/m/${this.getCurrentAccountInView.code}).  Could you please provide more details about the account?\n\nLooking forward to your response.\n\nBest regards,\n${this.getUser.username}`;

            let encodedMessage = encodeURIComponent(message)

            // Construct the sms: URI with the phone number and message body
            let smsUri = `sms:+254${this.getCurrentAccountInView.user.phone_number}?body=${encodedMessage}`

            window.location.href = smsUri;
        },

        sendEmail() {
            let encodedSubject = `INTEREST IN THE ${this.getCurrentAccountInView.title.toUpperCase()} ACCOUNT`
            
            // Encode the message to be URL-safe
            let message = `Hello ${this.getCurrentAccountInView.user.username},\n\nI hope this message finds you well. I am interested in the ${this.getCurrentAccountInView.title} writing account advertised on kazibin (${process.env.VUE_APP_FRONT_END_URL}/m/${this.getCurrentAccountInView.code}).  Could you please provide more details about the account?\n\nLooking forward to your response.\n\nBest regards,\n${this.getUser.username}`;

            let encodedBody = encodeURIComponent(message)

            let mailtoUri = `mailto:${this.getCurrentAccountInView.user.email}?subject=${encodedSubject}&body=${encodedBody}`;

            // Open the email client with the pre-filled information
            window.location.href = mailtoUri;
        },

        boot() {
            //check whether the account details are set
            const account_code = this.$router.history.current.params.account_code

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

.bold-here{
    font-weight: 800;
}
</style>

