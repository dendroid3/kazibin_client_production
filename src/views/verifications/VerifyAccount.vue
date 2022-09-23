<template>
    <div>
        <v-row class="no-gutters">
            <v-col class="col-12 pa-4 d-flex justify-center">
                <span @click="goHome">
                <animated-icon style="height:70px;" />
                </span>
            </v-col>
        </v-row>
        
        <div class="d-flex justify-center">
            <v-form class=" mt-4 mx-2"
            v-model="valid"
            :lazy-validation="lazy"
            ref="form">
                <p class="backg d-flex justify-center heading">
                Verify Yourself
                </p>
                                
                <div class="d-flex justify-center">
                    <v-file-input
                    outlined
                    v-model="front_id"
                    @change="registerFrontID"
                    hint="A scanned or clearly photographed copy of the front part of your Kenyan ID Card"
                    multiple
                    label="Front side of ID"
                    accept="image/*,
                    application/pdf,
                    application/vnd.ms-excel,
                    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                    application/msword"
                    ></v-file-input>
                </div>
                
                <div class="d-flex justify-center">
                    <v-file-input
                    outlined
                    :disabled="!front_id"
                    @change="registerBackID"
                    v-model="back_id"
                    hint="A scanned or clearly photographed copy of the back part of your Kenyan ID Card"
                    multiple
                    label="Back part of ID"
                    accept="image/*,
                    application/pdf,
                    application/vnd.ms-excel,
                    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                    application/msword"
                    required
                    ></v-file-input>
                </div>
                                
                <div class="d-flex justify-center">
                    <v-file-input
                    outlined
                    :disabled="!back_id"
                    @change="registerPassport"
                    v-model="passport"
                    hint="A clear passport sized photo of yourself"
                    multiple
                    label="Passport photo"
                    accept="image/*,
                    application/pdf,
                    application/vnd.ms-excel,
                    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                    application/msword"
                    ></v-file-input>
                </div>

                <div class=" ">
                    <v-text-field 
                    outlined
                    :disabled="!passport"
                    clearable
                    v-model="mpesa_transaction_id"
                    type="name"
                    label="mpesa transaction code"
                    :rules="rules.mpesaTransactionCodeRule"
                    required
                    > </v-text-field>  
                </div>
                <div class=" d-flex lighten-3 align-center justify-center">
                    <v-checkbox
                        :disabled="(!mpesa_transaction_id || !(mpesa_transaction_id.length == 10) )"
                        required
                        v-model="declared"
                        :label="`I, being of sound and disposing mind declare that the information given herein is true.`"
                    ></v-checkbox>
                </div>
                
                <div class="d-flex justify-center">
                    <v-btn 
                    :loading="loading"
                    @click="submit"
                    small 
                    class="rounded success submit-button"
                    :disabled="!declared">
                        submit
                    </v-btn>
                </div>
            </v-form>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
import AnimatedIcon from '../../components/widgets/AnimatedIcon.vue';
export default {
    name: 'VerifyAccount',

    components: {AnimatedIcon},

    computed: {
        ...mapGetters(['getUser'])
    },

    data: () => ({
        loading: false,
        valid: true,
        lazy: false,
        front_id: null,
        back_id: null,
        passport: null,
        declared: null,
        formdata: null,
        mpesa_transaction_id: null,
        rules: {
            mpesaTransactionCodeRule: [
            v => !!v || 'Mpesa transaction code required',
            v => (v.length == 10) || 'The Mpesa code must have 10 characters'
            ],
        }
    }),
    
    methods: {
        ...mapActions(['initialiseVerification']),

        goHome(){
            if(this.getUser){
                this.$router.push('/')
            } else {
                window.location.href="https://kazibin.adilirealestate.com"
            }
        },

        registerFrontID(event){
            var fd = new FormData()
            let files = event.length
            for (let i = 0; i < files; i++) {
                fd.append('front_id', event[i])
            }
            this.formdata = fd;
        },

        registerBackID(event){
            let files = event.length
            for (let i = 0; i < files; i++) {
                this.formdata.append('back_id', event[i])
            }
        },

        registerPassport(event){
            let files = event.length
            for (let i = 0; i < files; i++) {
                this.formdata.append('passport', event[i])
            }
        },

        submit(){
            const confirmation = 'Ensure that the files provided are correct. You wont have a chance to reverse this process.'

            if(!confirm(confirmation)) { return }

            this.loading = true

            this.formdata.append('mpesa_transaction_id', this.mpesa_transaction_id)

            this.initialiseVerification(this.formdata).then(() => (
                this.loading = false
            ))
        }
    }
}
</script>
<style lang="">
    
</style>