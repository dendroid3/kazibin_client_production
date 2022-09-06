<template lang="html">
    <div class="col-12 col-block"
        @click="viewInvoice"
        :class="{
          redlist: invoice.status == 1, 
          purplelist: invoice.status == 2, 
          greenlist: invoice.status == 3,
          yellowlist: invoice.status == 4
        }">
        <div class="bold-2 mr-1 align-center d-flex justify-end">
          <span class="username"  v-if="invoice.writer">
            {{"Writer: " + invoice.writer.user.code + ": " + invoice.writer.user.username}}
          </span>
          <span class="username" v-else>
            {{"Broker: " + invoice.broker.user.code + ": " + invoice.broker.user.username}}
          </span>
          <v-spacer />
          {{date_created}}
        </div>
        <div class="bold-2 mr-1 d-flex justify-end">
            <span class="username">
                {{status}} 
            </span>
            <v-spacer />
            {{totalTasks(invoice.tasks_signature)}} 
            {{totalTasks(invoice.tasks_signature) > 1 ? 'tasks' : 'task'}}
        </div>
        <div class="bold-2 mr-1  d-flex justify-end">
          Amount: {{invoice.amount}}
        </div>
    </div>
</template>
<script>

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapActions } from 'vuex'

export default {
    name: 'InvoiceStrip',

    props: ['invoice'],

    computed:{
        date_created(){
            return dayjs(this.invoice.created_at).format('DD/MM/YYYY')
        },

        status(){
            switch (this.invoice.status) {
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

        ...mapActions(['setCurrentInvoiceId']),
        
        totalTasks(signature){
            return ((signature.split('_').length) - 1)
        },

        viewInvoice(){
            let recipient = 'broker'
            if(this.invoice.writer){
                recipient = 'writer'
            }

            const data = {
                id: this.invoice.id,
                recipient: recipient
            }
            this.setCurrentInvoiceId(data)
            this.$router.push('Invoice/View')
        }

    },

        
    created(){
        dayjs.extend(relativeTime)
    }
}
</script>
<style lang="css" scoped>
    .username{
        font-weight: 900;
        font-size: 1rem;
    }
    
    .col-block{
        position: relative;
    }
    .col-block::after{
        content: '';
        border-bottom: solid 1px white;
        position: absolute;
        bottom: 0;
        width: 80%;
        left: 10%;
    }
</style>