<template lang="html">
    <div>

        <div class="pa-2 grey lighten-1 ma-2 rounded" style="min-height: 50vh; font-family: dosis;">
            
            <v-row class="no-gutters">
                <v-col class="col-3">
                    <v-img style="height:3rem; width:3rem;" src="https://api.app.kazibin.com/icon.svg" contain />
                </v-col>
                <v-col class="col-9 d-flex justify-end">
                    <h2 class="pa-1 white rounded" v-if="!fetching" :class="{
                    'red--text': getCurrentViewInvoice.status == 1, 
                    'orangered--text': getCurrentViewInvoice.status == 2, 
                    'green--text': getCurrentViewInvoice.status == 3,
                    }">
                        {{status}}
                    </h2>
                </v-col>
            </v-row>
            
            <div class="no-gutters d-flex justify-end">
                Mpesa Paybill: 333434  
            </div>
            <div class="no-gutters d-flex justify-end">
                Paypal: pay@kazib.in  
            </div>

            
            <section v-if="fetching">

                <div style="margin-top: 50px;" class="center">
                </div>

                <v-row class="no-gutters">
                    <v-col class="col-4 offset-4">
                    <v-progress-linear
                        indeterminate
                        rounded
                        color="blue darken-2"
                        height="5"
                    ></v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="no-gutters">
                    <v-col class="col-12 blue--text d-flex justify-center darken-2">
                    getting invoice
                    </v-col>
                </v-row>
            </section>
            
            <section v-if="!fetching">
            
                <div class="backgr px-2 py-1 rounded mx-3">
                    <div class="bold">{{"Invoice code: " + getCurrentViewInvoice.code}}</div>
                    <div class="bold">{{"Invoice date: " + invoice_date}}</div>
                </div>
                
                <div class="bold px-2 mx-3" v-if="getCurrentInvoiceDetails.recipient == 'writer'">
                    Writer: {{this.getCurrentViewInvoice.writer.user.code + ": " + this.getCurrentViewInvoice.writer.user.username}}
                </div>
                <div class="bold px-2 mx-3" v-else>
                    Broker: {{this.getCurrentViewInvoice.broker.user.code + ": " + this.getCurrentViewInvoice.broker.user.username}}
                </div>
                <div class="white rounded">
                    <v-row class="tiger px-2 no-gutters bold">
                        <v-col class="col-3 d-flex justify-center align-center">
                            {{'date'}}
                        </v-col>
                        <v-col class="col-6 d-flex justify-center align-center">
                            {{'code: topic'}}
                        </v-col>
                        <v-col class="col-3 d-flex justify-center align-center">
                            {{'amount'}}
                        </v-col>
                    </v-row>

                    <v-row class="tiger pl-2 no-gutters" v-for="task in getCurrentViewInvoice.tasks" :key="task.id">
                        <v-col class="col-3 d-flex justify-center align-center">
                            {{ task.created_at | task_date}}
                        </v-col>
                        <v-col class="col-6 d-flex justify-center text-center align-center">
                            {{task.code + ": " + task.topic}}
                        </v-col>
                        <v-col class="col-3 d-flex justify-center align-center">
                            {{task.full_pay}}
                        </v-col>
                    </v-row>


                    <hr v-if="getCurrentViewInvoice.bonuses[0] || getCurrentViewInvoice.fines[0]">

                    <v-row class="tiger pl-2 no-gutters" v-for="bonus in getCurrentViewInvoice.bonuses" :key="bonus.id">
                        <v-col class="col-3 d-flex justify-end align-center bold">
                            {{"bonus"}}
                        </v-col>
                        <v-col class="col-6 d-flex justify-center align-center">
                            {{bonus.description}}
                        </v-col>
                        <v-col class="col-3 d-flex justify-center align-center">
                            {{bonus.amount}}
                        </v-col>
                    </v-row>

                    <v-row class="tiger pl-2 no-gutters" v-for="fine in getCurrentViewInvoice.fines" :key="fine.id">
                        <v-col class="col-3 d-flex justify-end align-center bold">
                            {{"fine"}}
                        </v-col>
                        <v-col class="col-6 d-flex justify-center align-center">
                            {{fine.description}}
                        </v-col>
                        <v-col class="col-3 d-flex justify-center align-center">
                            {{fine.amount}}
                        </v-col>
                    </v-row>

                    
                    
                    <v-row class="tiger pl-2 no-gutters">
                        <v-col class="col-3 d-flex justify-end align-center bold">
                            {{"total"}}
                        </v-col>
                        <v-col class="col-6 d-flex justify-center align-center">
                            {{' ---- '}}
                        </v-col>
                        <v-col class="col-3 d-flex justify-center bold align-center">
                            {{getCurrentViewInvoice.amount}}
                        </v-col>
                    </v-row>
                    
                </div>
            </section>

            
            <div class="d-flex justify-center" v-if="!fetching" id="invoice">
                <v-btn 
                small 
                v-if="getCurrentViewInvoice.status == 1"
                @click="markInvoiceAsPaid"
                class="mx-2 mt-3 success white--text">
                    mark paid
                </v-btn>
                <v-btn 
                small 
                v-if="getCurrentViewInvoice.status == 2 && getCurrentInvoiceDetails.recipient == 'broker'"
                @click="confirmInvoicePaid"
                class="mx-2 mt-3 success white--text">
                    confirm paid
                </v-btn>

                <v-btn 
                small 
                @click="printDownload"
                class="mx-2 mt-3 success white--text">
                    download
                </v-btn>

            </div>
                
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
    name: 'ViewInvoice',

    
    filters:{
        task_date(date){
            return dayjs(date).format('DD/MM/YYYY')
        }
    },

    computed:{
        ...mapGetters(['getCurrentInvoiceDetails', 'getCurrentViewInvoice']),

        invoice_date(){
            return dayjs(this.getCurrentViewInvoice.created_at).format('DD/MM/YYYY')
        },

        status(){
            switch (this.getCurrentViewInvoice.status) {
                case 1:
                    return 'Unpaid'
                    break;

                case 2:
                    return 'Paid (Unconfirmed)'
                    break;
            
                default:
                    return 'Paid'
                    break;
            }
        }
    },

    methods:{
        ...mapActions(['getInvoice', 'markPaid', 'confirmPaid']),

        printDownload () {
            // let w = window.open()
            // let w = 
            // .download
            // w.document.write(this.$refs.invoice.$el.innerHTML)
            
            // w.document.close()
            // w.setTimeout(function () {
                // w.save()
            // }, 1000)
        },

        boot(){
            const data = {
                invoice_id: this.getCurrentInvoiceDetails.id,
                recipient: this.getCurrentInvoiceDetails.recipient
            }

            this.getInvoice(data).then(res => {
                this.fetching = false
            })
        },

        markInvoiceAsPaid(){
            const confirmation = "Make sure that you this invoice has been paid."
            if(!confirm(confirmation)){
                return
            }
            const data = {
                invoice_id: this.getCurrentViewInvoice.id
            }
            this.markPaid(data)
        },

        confirmInvoicePaid(){
            const confirmation = "Proceed if the invice has been paid"

            if(!confirm(confirmation)){
                return
            }
            const data = {
                invoice_id: this.getCurrentViewInvoice.id
            }
            this.confirmPaid(data)
        },
    },

    data(){
        return{
            fetching: true
        }
    },

    mounted(){
        this.boot()
    },
    
    created(){
        dayjs.extend(relativeTime)
    }
}
</script>
<style lang="">
    
</style>