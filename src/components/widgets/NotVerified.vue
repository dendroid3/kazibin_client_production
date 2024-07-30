<template>
    <div class="main-div relative" v-if="showPopUp">
        <v-row class="row">
            <v-col class="col-12 d-flex justify-end">
                <v-icon class="close-button pointer" @click="closeReminderToVerifyAccount(true)">
                    mdi-close
                </v-icon>
            </v-col>
        </v-row>
        <div class="text-center">
            {{ "Unlock the full potential of our app with just one quick step. Verify your account now to enjoy all features and benefits!" }}
        </div>
        <div class="text-center">   
            <v-btn class="success mx-3" small @click="go(`About#why_verify`)">
                Learn More
            </v-btn>
            <v-btn class="success mx-3" small @click="go(`Verify`)">
                verify
            </v-btn>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'NotVerified',

    computed: {
        ...mapGetters(['getUser', 'isReminderToVerifyAccountClosed']),
   
        showPopUp() {
            if(this.getUser.credential_verification){
                return false
            }

            return !this.isReminderToVerifyAccountClosed
        }
    },

    data(){
        return {}
    },

    methods: {
        ...mapActions(['closeReminderToVerifyAccount']),
        
        go(code) {
            this.$router.push(`/${code}`)
        },
    }
}
</script>
<style lang="css" scoped>
    .main-div{
        position: fixed;
        top: 50px;
        right: 0;
        left: 0;
        color: rgb(15,14,56);
        background-color: blanchedalmond;
        z-index: 1;
        padding: 2rem;
        font-size: 1.5rem;
        border-radius: 0.5rem;
    }
    
    .close-button{
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        background: red;
        color: white;
        border-radius: 50%;
    }
</style>
