<template>
    <div class="pa-2">
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr class="grey white--text">
                    <th>Invoice Date</th>
                    <th>Invoice Code</th>
                    <th>{{ debited ? "Broker" : "Writer" }}</th>
                    <th>Total Tasks</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="invoice in invoices" :key="invoice.id" class="odd gradeX pa-2 wrapper pointer" @click="viewInvoice(invoice)" :class="{
                    redlist: invoice.status == 1, 
                    purplelist: invoice.status == 2, 
                    greenlist: invoice.status == 3,
                    yellowlist: invoice.status == 4
                }">
                    <td class="text-center">
                        {{ invoice.created_at | date_created }} 
                    </td>
                    <td class="text-center">{{ invoice.code }}</td>
                    <td class="text-center">
                        {{ debited ? invoice.broker.user.code + ": " + invoice.broker.user.username: invoice.writer.user.code  + ": " + invoice.writer.user.username}}
                    </td>
                    <td class="text-center">{{ invoice.tasks_signature | total_tasks }}</td>
                    <td class="text-center">{{ invoice.amount }}</td>
                    <td class="text-center"> {{ invoice.status | status_name }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapActions } from 'vuex'

export default {
    name: 'DInvoiceCard',

    props: ['invoices', 'debited'],

    mounted(){
        console.log(this.invoices);
    },

    filters: {
        date_created(date){
            return dayjs(date).format('DD/MM/YYYY')
        },
        status_name(status){
            switch (status) {
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
        },
        total_tasks(signature){
            return ((signature.split('_').length) - 1)
        },
    },

    methods: {
        ...mapActions(['setCurrentInvoiceId']),
        viewInvoice(invoice){
            let recipient = 'broker'
            if(!this.debited){
                recipient = 'writer'
            }

            const data = {
                id: invoice.id,
                recipient: recipient
            }
            this.setCurrentInvoiceId(data)
            this.$router.push('/Invoice/View')
        }
    },
       
    created(){
        dayjs.extend(relativeTime)
    }
}
</script>
<style lang="">
    
</style>