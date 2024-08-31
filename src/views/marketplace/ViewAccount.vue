<template>
   <div>
        <v-toolbar 
            class="pb-4 grey lighten-3 mb-4 top-toolbar"
            text
            :class="{
            'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
            'medium-width':  $vuetify.breakpoint.md,
            'large-width':  $vuetify.breakpoint.lg,
            }"
        >
            <div style="width:100%;">
               
                {{ getCurrentAccountInView }}
            </div>
        </v-toolbar>
  
   </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default{
    name: "ViewAccount",

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
@media only screen and (min-width: 1264px) {
    .top-toolbar{
        padding-bottom: 5rem; 
        position: fixed; 
        top: 50px; 
        right: 0; 
        z-index: 1;
    }
}
</style>

