<template>
    <div class="grey lighten-4 wrapper pa-2 mt-1 relative mx-2 rounded fill-height">
        <section class="mb-2 pointer" @click="viewAccount">
            <span class="head pointer uppercase">
                {{ `${account.code}: ${account.title} Account` }}
            </span> 
            <br>
            <span class="uppercase">
                {{ `SELLER: ${account.user.code} : ${account.user.username}` }}  
            </span>
            <br>
            <span class="uppercase">
                {{ `PROFILE: ${account.profile_origin} ( ${account.profile_gender} )` }}
            </span>
            <br>
            <span class="uppercase">
                {{ `RATING: ${account.rating}%` }} 
            </span>
            <br>
            <span class="uppercase">
                {{ `TOTAL ORDERS: ${account.total_orders}`}}
            </span>
            <br>
            <span class="uppercase">
                {{ `PENDING ORDERS: ${account.pending_orders}` }}  
            </span>
            <br>
            <span class="uppercase">
                {{ `COST: ${formatMoney(account.cost)} ( ` }}
                {{ account.negotiable ? 'Negotiable )' : 'Non-negotiable )' }}
            </span>
        </section>
        

        <div class="d-flex justify-end">
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
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: "AccountCard",

    props: [
        'account'
    ],

    computed: {
       ...mapGetters(['getUser'])
    },

    methods: {
        viewAccount() {
            this.$router.push('/m/' + this.account.code)
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
    .head{
        font-size: 1rem;
        font-weight: 800;
    }
</style>

